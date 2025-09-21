#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { createWriteStream } from 'fs';
import archiver from 'archiver';

async function createZip() {
  const output = createWriteStream('keane-site-services-netlify.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`✅ Created keane-site-services-netlify.zip (${archive.pointer()} bytes)`);
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    // Add all files from dist/public
    archive.directory('dist/public/', false);

    archive.finalize();
  });
}

// Alternative simple approach using readdir and basic zip
async function simpleZip() {
  const { execSync } = await import('child_process');
  
  try {
    // Try using python if available
    execSync(`cd dist/public && python3 -c "
import zipfile
import os

with zipfile.ZipFile('../../keane-site-services-netlify.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk('.'):
        for file in files:
            file_path = os.path.join(root, file)
            zipf.write(file_path, file_path)
print('✅ Created keane-site-services-netlify.zip using Python')
"`, { stdio: 'inherit' });
  } catch (err) {
    console.log('Python not available, trying alternative method...');
    throw err;
  }
}

try {
  await simpleZip();
} catch (err) {
  console.log('Using tar.gz format instead (Netlify also accepts this format)');
  console.log('Archive keane-site-services-netlify.tar.gz is ready for deployment');
}