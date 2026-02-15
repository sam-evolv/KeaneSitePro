import ServicePage from '@/components/ServicePage'

export default function SiteClearOuts() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Site Clear-Outs",
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
    "serviceType": "Site clearance",
    "description": "Professional site clear-outs with fast mobilisation, safe execution, and compliant waste handling.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <ServicePage
      title="Site Clear-Outs"
      description="Fast, compliant site preparation with responsible waste handling and professional execution."
      breadcrumb="Site Clear-Outs"
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
                  We deliver end-to-end site clear-outs, mobilising quickly and working safely to prepare your site for next-stage works. 
                  Our team handles vegetation, debris, and non-hazardous waste with full documentation available on request.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">What's Included</h3>
                <ul className="list-disc pl-6 text-muted-foreground text-lg space-y-2 mb-8">
                  <li>Complete vegetation and debris removal</li>
                  <li>Waste segregation and responsible disposal</li>
                  <li>Haulage coordination and logistics</li>
                  <li>Site preparation and final tidy</li>
                  <li>Compliance documentation and certification</li>
                  <li>Health and safety risk assessments</li>
                </ul>

                <h3 className="text-2xl font-bold text-foreground mb-4">Our Process</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Site Assessment</h4>
                      <p className="text-muted-foreground">Comprehensive evaluation and access planning</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Clear-Out Execution</h4>
                      <p className="text-muted-foreground">Safe removal and on-site segregation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Disposal & Documentation</h4>
                      <p className="text-muted-foreground">Licensed disposal with full certification</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Handover</h4>
                      <p className="text-muted-foreground">Final inspection and project sign-off</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">Compliance & Safety</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Keane Site Services operates with comprehensive insurance, detailed method statements, and rigorous risk assessments. 
                  We maintain a safety-first approach on every project, ensuring all work is completed to the highest professional standards 
                  while meeting all relevant environmental and health & safety regulations.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-4">Typical Use Cases</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Pre-construction site preparation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Residential development plots</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Commercial site enabling works</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Industrial facility preparation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-4">Related Services</h3>
                  <div className="space-y-3">
                    <a href="/services/ground-preparation" className="block text-primary hover:text-primary/80 transition-colors">
                      → Ground Preparation
                    </a>
                    <a href="/services/delapodation-work" className="block text-primary hover:text-primary/80 transition-colors">
                      → Delapodation Work
                    </a>
                    <a href="/services/haulage-support" className="block text-primary hover:text-primary/80 transition-colors">
                      → Haulage Support
                    </a>
                    <a href="/services/construction" className="block text-primary hover:text-primary/80 transition-colors">
                      → Construction Services
                    </a>
                  </div>
                </div>

                <div className="bg-primary p-6 rounded-2xl text-white">
                  <h3 className="text-xl font-bold mb-4">Need a Quote?</h3>
                  <p className="mb-4">Get a personalised quote for your site clear-out project.</p>
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