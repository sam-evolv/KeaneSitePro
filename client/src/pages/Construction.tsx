import ServicePage from '@/components/ServicePage'

export default function Construction() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Construction Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Keane Site Services",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IE"
      },
      "telephone": "+353876460921",
      "email": "mark@keanesiteservices.ie"
    },
    "areaServed": "IE",
    "serviceType": "Commercial construction",
    "description": "Commercial construction services for warehouses, industrial units, and commercial developments.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <ServicePage
      title="Construction Services"
      description="Commercial construction services for warehouses, industrial units, and commercial developments."
      breadcrumb="Construction Services"
      jsonLd={jsonLd}
    >
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-foreground mb-6">Overview</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Keane Site Services provides professional construction services for the commercial sector. From warehouse builds
                  and industrial units to general commercial developments, we deliver quality construction with reliable project management
                  and a commitment to safe, compliant work practices.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">What's Included</h3>
                <ul className="list-disc pl-6 text-muted-foreground text-lg space-y-2 mb-8">
                  <li>Commercial building construction</li>
                  <li>Warehouse and industrial unit builds</li>
                  <li>Structural steelwork and concrete works</li>
                  <li>Project management and coordination</li>
                  <li>Health and safety compliance</li>
                  <li>Quality assurance and documentation</li>
                </ul>

                <h3 className="text-2xl font-bold text-foreground mb-4">Construction Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Commercial Builds</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>Warehouse construction</li>
                      <li>Industrial unit builds</li>
                      <li>Retail and office developments</li>
                      <li>Agricultural buildings</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Supporting Works</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>Foundations and groundworks</li>
                      <li>Structural frameworks</li>
                      <li>Cladding and roofing</li>
                      <li>External works and drainage</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">Our Process</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Initial Consultation</h4>
                      <p className="text-muted-foreground">Understanding your project requirements and objectives</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Planning & Scheduling</h4>
                      <p className="text-muted-foreground">Detailed project planning and resource allocation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Construction Phase</h4>
                      <p className="text-muted-foreground">Professional build execution with ongoing quality control</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Handover</h4>
                      <p className="text-muted-foreground">Final inspection, snagging, and project sign-off</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">Compliance & Safety</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  All construction work is carried out in accordance with current building regulations and health & safety legislation.
                  Keane Site Services is fully insured and maintains rigorous safety standards on every project. We provide all necessary
                  documentation, certifications, and compliance records throughout the build process.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-4">Project Types</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Warehouses and storage facilities</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Industrial and commercial units</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Retail and office buildings</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Agricultural and farm buildings</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-4">Related Services</h3>
                  <div className="space-y-3">
                    <a href="/services/ground-preparation" className="block text-primary hover:text-primary/80 transition-colors">
                      → Ground Preparation
                    </a>
                    <a href="/services/site-clear-outs" className="block text-primary hover:text-primary/80 transition-colors">
                      → Site Clear-Outs
                    </a>
                    <a href="/services/haulage-support" className="block text-primary hover:text-primary/80 transition-colors">
                      → Haulage Support
                    </a>
                  </div>
                </div>

                <div className="bg-primary p-6 rounded-2xl text-white">
                  <h3 className="text-xl font-bold mb-4">Need a Quote?</h3>
                  <p className="mb-4">Get a personalised quote for your construction project.</p>
                  <a
                    href="#contact"
                    className="btn btn--ghost btn--pill"
                  >
                    Request a Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServicePage>
  )
}