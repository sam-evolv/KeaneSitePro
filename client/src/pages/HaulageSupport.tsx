import ServicePage from '@/components/ServicePage'

export default function HaulageSupport() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Haulage Support",
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
    "serviceType": "Logistics support",
    "description": "Coordinated logistics and plant movement to keep projects on schedule.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <ServicePage
      title="Haulage Support"
      description="Coordinated logistics and plant movement to keep projects on schedule."
      breadcrumb="Haulage Support"
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
                  Professional haulage and logistics support to keep your construction projects moving efficiently. 
                  We provide coordinated transport solutions, plant movement, and material logistics to ensure 
                  your project stays on schedule and within budget.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">What's Included</h3>
                <ul className="list-disc pl-6 text-muted-foreground text-lg space-y-2 mb-8">
                  <li>Construction plant transportation</li>
                  <li>Material delivery coordination</li>
                  <li>Waste haulage and disposal logistics</li>
                  <li>Equipment positioning and removal</li>
                  <li>Route planning and permits</li>
                  <li>Scheduling and timeline coordination</li>
                </ul>

                <h3 className="text-2xl font-bold text-foreground mb-4">Haulage Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Plant & Equipment</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>Excavator transportation</li>
                      <li>Machinery positioning</li>
                      <li>Heavy plant movement</li>
                      <li>Equipment collection</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Materials & Waste</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>Aggregate delivery</li>
                      <li>Construction material transport</li>
                      <li>Waste removal logistics</li>
                      <li>Bulk material handling</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">Our Process</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Requirements Assessment</h4>
                      <p className="text-muted-foreground">Understanding your logistics needs and timeline</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Route Planning</h4>
                      <p className="text-muted-foreground">Optimal routing and permit coordination</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Coordinated Transport</h4>
                      <p className="text-muted-foreground">Professional transportation execution</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Delivery Confirmation</h4>
                      <p className="text-muted-foreground">Safe delivery and documentation</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">Professional Standards</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  All haulage operations are conducted with appropriate licensing, insurance, and safety protocols. 
                  We coordinate with local authorities for necessary permits and ensure all transport activities 
                  comply with road traffic regulations and health & safety requirements. Our experienced drivers 
                  and logistics coordinators ensure reliable, punctual service for your project needs.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-4">Transport Types</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Low-loader transport</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Tipper truck services</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Flatbed transportation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Specialist heavy haulage</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-4">Related Services</h3>
                  <div className="space-y-3">
                    <a href="/services/site-clear-outs" className="block text-primary hover:text-primary/80 transition-colors">
                      → Site Clear-Outs
                    </a>
                    <a href="/services/delapodation-work" className="block text-primary hover:text-primary/80 transition-colors">
                      → Delapodation Work
                    </a>
                    <a href="/services/ground-preparation" className="block text-primary hover:text-primary/80 transition-colors">
                      → Ground Preparation
                    </a>
                    <a href="/services/construction" className="block text-primary hover:text-primary/80 transition-colors">
                      → Construction Services
                    </a>
                  </div>
                </div>

                <div className="bg-primary p-6 rounded-2xl text-white">
                  <h3 className="text-xl font-bold mb-4">Need a Quote?</h3>
                  <p className="mb-4">Get a personalised quote for your haulage requirements.</p>
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