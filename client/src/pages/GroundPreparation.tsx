import ServicePage from '@/components/ServicePage'

export default function GroundPreparation() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ground Preparation",
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
    "serviceType": "Site preparation",
    "description": "Accurate grading, debris removal, and readiness for next-stage works.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <ServicePage
      title="Ground Preparation"
      description="Accurate grading, debris removal, and readiness for next-stage works."
      breadcrumb="Ground Preparation"
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
                  Professional ground preparation services ensuring your site is ready for construction. We provide accurate grading, 
                  proper drainage consideration, and comprehensive site readiness to meet engineering specifications and project timelines.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">What's Included</h3>
                <ul className="list-disc pl-6 text-muted-foreground text-lg space-y-2 mb-8">
                  <li>Site survey and level assessment</li>
                  <li>Accurate grading and earthworks</li>
                  <li>Debris and obstacle removal</li>
                  <li>Drainage consideration and planning</li>
                  <li>Compaction testing and certification</li>
                  <li>Final inspection and handover</li>
                </ul>

                <h3 className="text-2xl font-bold text-foreground mb-4">Ground Preparation Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Earthworks</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Cut and fill operations</li>
                      <li>• Site leveling and grading</li>
                      <li>• Slope stabilization</li>
                      <li>• Excavation works</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Site Readiness</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Access road preparation</li>
                      <li>• Foundation area preparation</li>
                      <li>• Utility trenching</li>
                      <li>• Surface compaction</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">Our Process</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Site Survey</h4>
                      <p className="text-muted-foreground">Comprehensive assessment and planning</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Preparation Works</h4>
                      <p className="text-muted-foreground">Clearing, grading, and earthworks</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Quality Control</h4>
                      <p className="text-muted-foreground">Testing and compliance verification</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Project Handover</h4>
                      <p className="text-muted-foreground">Final inspection and certification</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">Quality Standards</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  All ground preparation work is completed to engineering specifications with proper testing and certification. 
                  We ensure compliance with building regulations and provide detailed documentation for construction teams, 
                  including compaction tests, level surveys, and material certificates where required.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-4">Applications</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Foundation preparation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Road and pathway construction</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Drainage installation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Landscaping preparation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-4">Related Services</h3>
                  <div className="space-y-3">
                    <a href="/services/site-clear-outs" className="block text-primary hover:text-primary/80 transition-colors">
                      → Site Clear-Outs
                    </a>
                    <a href="/services/waste-removal" className="block text-primary hover:text-primary/80 transition-colors">
                      → Waste Removal
                    </a>
                    <a href="/services/haulage-support" className="block text-primary hover:text-primary/80 transition-colors">
                      → Haulage Support
                    </a>
                  </div>
                </div>

                <div className="bg-primary p-6 rounded-2xl text-white">
                  <h3 className="text-xl font-bold mb-4">Need a Quote?</h3>
                  <p className="mb-4">Get a personalized quote for your ground preparation project.</p>
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