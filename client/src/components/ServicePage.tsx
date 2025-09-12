import { useState, useEffect, useRef } from 'react'
import { Link } from 'wouter'
import { Menu, X, Phone, Mail, MapPin, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { useHeaderScrolled } from '@/hooks/use-header-scrolled'
import logoAsset from '../assets/logo.png'
import logoLightAsset from '../assets/logo-light.png'
import footerLogoAsset from '../assets/footer-logo.png'

const logoSrc = logoAsset
const logoLightSrc = logoLightAsset
const footerLogoSrc = footerLogoAsset

interface ServicePageProps {
  title: string
  description: string
  children: React.ReactNode
  breadcrumb?: string
  jsonLd?: object
}

export default function ServicePage({ title, description, children, breadcrumb, jsonLd }: ServicePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const sentinelRef = useHeaderScrolled()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: title,
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const { toast } = useToast()

  // Header scroll detection is now handled by useHeaderScrolled hook

  // Set page title and meta description
  useEffect(() => {
    document.title = `${title} | Keane Site Services`
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', description)

    // Add JSON-LD structured data
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
      
      return () => {
        document.head.removeChild(script)
      }
    }
  }, [title, description, jsonLd])

  // Add page--services class to body and ensure page starts at top
  useEffect(() => {
    document.body.classList.add('page--services');
    
    // Always land at the top on navigation (no mid-page anchors)
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    
    // Immediately scroll to top
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch {
      window.scrollTo(0, 0);
    }
    
    // Defensive: strip accidental hash fragments
    if (location.hash && !location.hash.startsWith('#top')) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    
    return () => {
      document.body.classList.remove('page--services');
    };
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const netlifyFormData = new FormData()
      netlifyFormData.append('form-name', 'service-contact')
      Object.entries(formData).forEach(([key, value]) => {
        netlifyFormData.append(key, value)
      })

      const response = await fetch('/', {
        method: 'POST',
        body: netlifyFormData,
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", phone: "", service: title, message: "" })
        toast({
          title: "Message sent!",
          description: "We'll get back to you soon.",
        })
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header ref={headerRef} className="site-header">
        <div className="wrap">
          {/* Logo */}
          <Link href="/" className="brand" aria-label="Keane Site Services">
            <img className="logo logo--primary" src={logoSrc} alt="Keane Site Services" width="439" height="106" decoding="async" fetchPriority="high" />
            <img className="logo logo--scrolled" src={logoLightSrc} alt="" aria-hidden="true" width="439" height="106" decoding="async" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-primary transition-colors duration-200 font-medium">
                Home
              </Link>
              <Link href="/#services" className="text-white hover:text-primary transition-colors duration-200 font-medium">
                Services
              </Link>
              <Link href="/#about" className="text-white hover:text-primary transition-colors duration-200 font-medium">
                About
              </Link>
              <Link href="/#contact" className="text-white hover:text-primary transition-colors duration-200 font-medium">
                Contact
              </Link>
              <Button className="btn btn--primary btn--pill" asChild>
                <Link href="/#contact">Request a Quote</Link>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-charcoal bg-opacity-95 backdrop-blur-lg z-50">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <Link href="/">
                  <img 
                    src={logoLightSrc} 
                    alt="Keane Site Services" 
                    className="h-24 w-auto header-logo cursor-pointer"
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <nav className="flex-1 flex flex-col justify-center space-y-8 px-4">
                <Link href="/" className="text-white text-xl font-semibold hover:text-primary transition-colors text-left">
                  Home
                </Link>
                <Link href="/#services" className="text-white text-xl font-semibold hover:text-primary transition-colors text-left">
                  Services
                </Link>
                <Link href="/#about" className="text-white text-xl font-semibold hover:text-primary transition-colors text-left">
                  About
                </Link>
                <Link href="/#contact" className="text-white text-xl font-semibold hover:text-primary transition-colors text-left">
                  Contact
                </Link>
                <div className="pt-8">
                  <Button className="btn btn--primary btn--pill w-full" asChild>
                    <Link href="/#contact">Request a Quote</Link>
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Scroll detection sentinel - positioned at top to start transparent */}
      <div 
        ref={sentinelRef} 
        className="h-2 w-full pointer-events-none opacity-0"
        aria-hidden="true"
      />

      {/* Service Hero (polished) */}
      <section className="svc-hero svc-hero--compact" aria-labelledby="svc-title">
        <div className="container">
          <nav className="svc-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span>
            <Link href="/#services">Services</Link><span aria-hidden="true">/</span>
            <span className="current">{breadcrumb || title}</span>
          </nav>

          <Link className="svc-back" href="/#services" aria-label="Back to services">
            <span className="svc-back__icon" aria-hidden="true"></span>
            Back to Services
          </Link>

          <header className="svc-headline">
            <h1 id="svc-title" className="svc-title">{title}</h1>
            <p className="svc-sub">
              {description}
            </p>
          </header>

          <div className="svc-divider" aria-hidden="true"></div>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-background">
        {children}
        
        {/* CTA Section */}
        <section className="py-16 bg-charcoal text-white">
          <div className="container text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote for your {title.toLowerCase()} needs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Button className="btn btn--ghost btn--pill" asChild>
                <a href="tel:+353876460921">Call Now</a>
              </Button>
              <Button 
                className="btn btn--primary btn--pill"
                onClick={() => scrollToSection('contact')}
              >
                Request a Quote
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-16 lg:py-24 bg-[hsl(210,17%,97%)]">
          <div className="container" style={{maxWidth: '800px'}}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Request a Quote
              </h2>
              <p className="text-xl text-muted-foreground">
                Get in touch for a personalized quote for your {title.toLowerCase()} project.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <form 
                name="service-contact" 
                method="POST" 
                data-netlify="true" 
                netlify-honeypot="bot-field" 
                className="space-y-6" 
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="form-name" value="service-contact" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">Full Name *</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">Phone Number</Label>
                    <Input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">Email Address *</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label htmlFor="service" className="block text-sm font-semibold text-foreground mb-2">Service Required</Label>
                  <select 
                    id="service" 
                    name="service" 
                    required
                    value={formData.service}
                    onChange={(e) => handleFormChange('service', e.target.value)}
                    className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                  >
                    <option value="">Select a service</option>
                    <option value="Site Clear-Outs">Site Clear-Outs</option>
                    <option value="Waste Removal">Waste Removal</option>
                    <option value="Ground Preparation">Ground Preparation</option>
                    <option value="Haulage Support">Haulage Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">Project Details</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    placeholder={`Tell us about your ${title.toLowerCase()} requirements, timeline, and site details...`}
                    value={formData.message}
                    onChange={(e) => handleFormChange('message', e.target.value)}
                    className="w-full resize-y"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="btn btn--primary btn--pill w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                </Button>
                
                {submitSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[hsl(0,0%,10%)] py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-primary transition-colors text-sm cursor-pointer" data-testid="footer-link-home">Home</Link></li>
                <li><Link href="/#services" className="text-gray-400 hover:text-primary transition-colors text-sm cursor-pointer" data-testid="footer-link-services">Services</Link></li>
                <li><Link href="/#about" className="text-gray-400 hover:text-primary transition-colors text-sm cursor-pointer" data-testid="footer-link-about">About</Link></li>
                <li><Link href="/#contact" className="text-gray-400 hover:text-primary transition-colors text-sm cursor-pointer" data-testid="footer-link-contact">Contact</Link></li>
              </ul>
            </div>
            
            {/* Centered Large Logo */}
            <div className="flex justify-center">
              <Link 
                href="/"
                className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[hsl(0,0%,10%)] rounded-lg cursor-pointer inline-block"
                data-testid="footer-logo-button"
                aria-label="Go to top of page"
              >
                <img 
                  src={footerLogoSrc} 
                  alt="Keane Site Services" 
                  className="h-64 w-auto logo-hover"
                  data-testid="footer-logo"
                />
              </Link>
            </div>
            
            {/* Contact Info */}
            <div className="text-center md:text-right">
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>
                  Phone: <a 
                    href="tel:+353876460921" 
                    className="text-primary hover:text-primary/80 transition-colors"
                    data-testid="footer-phone-link"
                  >
                    +353 87 646 0921
                  </a>
                </div>
                <div>
                  Email: <a 
                    href="mailto:info@keanesiteservices.com" 
                    className="text-primary hover:text-primary/80 transition-colors"
                    data-testid="footer-email-link"
                  >
                    info@keanesiteservices.com
                  </a>
                </div>
                <div>Service Area: Ireland</div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Keane Site Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}