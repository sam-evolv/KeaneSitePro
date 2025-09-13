import ServicePage from '@/components/ServicePage'

export default function WasteRemoval() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Waste Removal",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Keane Site Services",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IE"
      },
      "telephone": "+353876460921",
      "email": "info@keanesiteservices.com"
    },
    "areaServed": "IE",
    "serviceType": "Waste management",
    "description": "Licensed collection and responsible disposal with documentation on request.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <ServicePage
      title="Waste Removal"
      description="Licensed collection and responsible disposal with full documentation and compliance certification."
      breadcrumb="Waste Removal"
      jsonLd={jsonLd}
    >
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-foreground mb-6">Overview</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Our licensed waste removal service ensures responsible handling and disposal of construction and site waste. 
                  We provide complete documentation for audit trails and regulatory compliance, with certified disposal at approved facilities.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">What's Included</h3>
                <ul className="list-disc pl-6 text-muted-foreground text-lg space-y-2 mb-8">
                  <li>Licensed waste collection and transport</li>
                  <li>Proper waste classification and segregation</li>
                  <li>Disposal at approved facilities</li>
                  <li>Complete waste transfer documentation</li>
                  <li>Regulatory compliance certification</li>
                  <li>Environmental impact reporting</li>
                </ul>

                <h3 className="text-2xl font-bold text-foreground mb-4">Waste Types We Handle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Construction Waste</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Concrete and masonry</li>
                      <li>• Wood and timber</li>
                      <li>• Metal and steel</li>
                      <li>• Plasterboard and insulation</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Site Waste</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Vegetation and green waste</li>
                      <li>• Soil and aggregates</li>
                      <li>• Mixed construction debris</li>
                      <li>• Packaging materials</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">Our Process</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Waste Assessment</h4>
                      <p className="text-muted-foreground">Classification and volume estimation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Collection Planning</h4>
                      <p className="text-muted-foreground">Schedule coordination and logistics</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Safe Removal</h4>
                      <p className="text-muted-foreground">Professional collection and transport</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Disposal & Documentation</h4>
                      <p className="text-muted-foreground">Licensed disposal with full certification</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">Compliance & Certification</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  All waste removal operations are conducted under appropriate waste management licenses with full traceability. 
                  We provide comprehensive documentation including waste transfer notes, disposal certificates, and environmental compliance reports 
                  to ensure your project meets all regulatory requirements.
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
                      <span>Construction site cleanup</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Renovation waste removal</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Demolition debris clearance</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Commercial waste management</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-4">Related Services</h3>
                  <div className="space-y-3">
                    <a href="/services/site-clear-outs" className="block text-primary hover:text-primary/80 transition-colors">
                      → Site Clear-Outs
                    </a>
                    <a href="/services/ground-preparation" className="block text-primary hover:text-primary/80 transition-colors">
                      → Ground Preparation
                    </a>
                    <a href="/services/haulage-support" className="block text-primary hover:text-primary/80 transition-colors">
                      → Haulage Support
                    </a>
                  </div>
                </div>

                <div className="bg-primary p-6 rounded-2xl text-white">
                  <h3 className="text-xl font-bold mb-4">Need a Quote?</h3>
                  <p className="mb-4">Get a personalized quote for your waste removal needs.</p>
                  <a 
                    href="#contact" 
                    className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Request Quote
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