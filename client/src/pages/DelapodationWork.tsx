import ServicePage from '@/components/ServicePage'

export default function DelapodationWork() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Delapodation Work",
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
    "serviceType": "Delapodation work",
    "description": "Professional delapodation and demolition services with documentation on request.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <ServicePage
      title="Delapodation Work"
      description="Professional delapodation and demolition services with documentation on request."
      breadcrumb="Delapodation Work"
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
                  Our professional delapodation service provides systematic dismantling and demolition work with safe execution. 
                  We provide complete documentation for audit trails and regulatory compliance, with proper handling of all materials.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">What's Included</h3>
                <ul className="list-disc pl-6 text-muted-foreground text-lg space-y-2 mb-8">
                  <li>Systematic dismantling and demolition</li>
                  <li>Safe removal of building components</li>
                  <li>Proper segregation and disposal</li>
                  <li>Complete documentation and certification</li>
                  <li>Regulatory compliance assurance</li>
                  <li>Environmental impact reporting</li>
                </ul>

                <h3 className="text-2xl font-bold text-foreground mb-4">Delapodation Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Structural Dismantling</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>Building framework removal</li>
                      <li>Wall and partition dismantling</li>
                      <li>Roofing component removal</li>
                      <li>Foundation breaking and removal</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Selective Demolition</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>Interior fit-out removal</li>
                      <li>Mechanical and electrical dismantling</li>
                      <li>Hazardous material handling</li>
                      <li>Salvage and reclamation work</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">Our Process</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Site Assessment</h4>
                      <p className="text-muted-foreground">Structural analysis and planning</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Dismantling Planning</h4>
                      <p className="text-muted-foreground">Method statements and sequencing</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Safe Execution</h4>
                      <p className="text-muted-foreground">Controlled dismantling and removal</p>
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
                  All delapodation operations are conducted under appropriate licenses with full traceability. 
                  We provide comprehensive documentation including method statements, completion certificates, and environmental compliance reports 
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
                      <span>Interior delapodation work</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Demolition debris clearance</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Commercial delapodation projects</span>
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
                  <p className="mb-4">Get a personalised quote for your delapodation work needs.</p>
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