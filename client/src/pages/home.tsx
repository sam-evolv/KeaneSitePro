import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Menu, 
  X, 
  Play, 
  Pause,
  Phone,
  Mail,
  MapPin,
  Clock,
  Zap,
  Shield,
  Settings,
  BookOpen,
  Building,
  Truck,
  TrendingUp,
  ArrowUpDown
} from "lucide-react";
import logoAsset from "../assets/logo.png";
import logoLightAsset from "../assets/logo-light.png";
import aboutLogoAsset from "../assets/about-logo.png";
import footerLogoAsset from "../assets/footer-logo.png";
import videoAsset from "../assets/hero.mp4";
import posterAsset from "../assets/poster.jpg";

const videoSrc = videoAsset;
const logoSrc = logoAsset;
const logoLightSrc = logoLightAsset;
const aboutLogoSrc = aboutLogoAsset;
const footerLogoSrc = footerLogoAsset;
const posterSrc = posterAsset;

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isAboutLogoVisible, setIsAboutLogoVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const aboutLogoRef = useRef<HTMLImageElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const valuePropsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Toggle "scrolled" class on header
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      if (headerRef.current) {
        if (scrolled) {
          headerRef.current.classList.add('scrolled');
        } else {
          headerRef.current.classList.remove('scrolled');
        }
      }
      setIsHeaderScrolled(scrolled);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Premium scroll animations for all sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setVisibleSections(prev => new Set([...Array.from(prev), sectionId]));
            }
            if (entry.target === aboutLogoRef.current) {
              setIsAboutLogoVisible(true);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all sections
    const refs = [aboutLogoRef, servicesRef, valuePropsRef, contactRef];
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Handle video setup with diagnostics and reduced motion
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Add video event listeners for diagnostics
    const handleError = () => console.warn('Hero video error:', video.error);
    const handleStalled = () => console.warn('Hero video stalled');
    const handleWaiting = () => console.log('Hero video waiting/buffering');
    const handleLoadedData = () => console.log('Hero video loadeddata OK');

    video.addEventListener('error', handleError);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('loadeddata', handleLoadedData);

    // Force inline autoplay properties for iOS
    video.muted = true;
    video.playsInline = true;

    // Handle reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyReducedMotion = () => {
      if (prefersReduced.matches) {
        video.pause();
        video.removeAttribute('autoplay');
        setIsVideoPlaying(false);
      }
    };
    
    applyReducedMotion();
    prefersReduced.addEventListener('change', applyReducedMotion);

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('loadeddata', handleLoadedData);
      prefersReduced.removeEventListener('change', applyReducedMotion);
    };
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 80;
      const targetPosition = section.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.name || !formData.email) {
        throw new Error("Please fill in all required fields");
      }

      // Create form data for Netlify
      const netlifyFormData = new FormData();
      netlifyFormData.append('form-name', 'contact');
      Object.entries(formData).forEach(([key, value]) => {
        netlifyFormData.append(key, value);
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(netlifyFormData as any).toString()
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you soon."
        });
        
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or call us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const services = [
    {
      icon: Building,
      title: "Site Clear-Outs",
      description: "Full site clearance with efficient waste handling and safe, compliant execution.",
      route: "/services/site-clear-outs"
    },
    {
      icon: Truck,
      title: "Waste Removal", 
      description: "Licensed collection and responsible disposal with documentation on request.",
      route: "/services/waste-removal"
    },
    {
      icon: TrendingUp,
      title: "Ground Preparation",
      description: "Accurate grading, debris removal, and readiness for next-stage works.",
      route: "/services/ground-preparation"
    },
    {
      icon: ArrowUpDown,
      title: "Haulage Support",
      description: "Coordinated logistics and plant movement to keep projects on schedule.",
      route: "/services/haulage-support"
    }
  ];

  const valueProps = [
    {
      icon: Zap,
      title: "Efficiency",
      description: "Rapid scheduling and tight, well-run operations."
    },
    {
      icon: Shield,
      title: "Compliance & Safety",
      description: "Fully insured, licensed, and safety-first on every job."
    },
    {
      icon: Settings,
      title: "Professional Equipment", 
      description: "Modern plant maintained to high standards."
    },
    {
      icon: BookOpen,
      title: "Trusted Expertise",
      description: "Experienced team delivering reliable outcomes."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Skip Link Accessibility */}
      <a className="skip-link" href="#main">Skip to content</a>
      
      {/* Header */}
      <header ref={headerRef} className="site-header">
        <div className="wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <div className="brand flex-shrink-0">
              <img 
                src={isHeaderScrolled ? logoLightSrc : logoSrc} 
                alt="Keane Site Services" 
                className="h-24 w-auto header-logo cursor-pointer transition-all duration-500"
                onClick={() => scrollToSection('home')}
                data-testid="header-logo"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-white hover:text-primary transition-colors duration-200 font-medium"
                data-testid="nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-white hover:text-primary transition-colors duration-200 font-medium"
                data-testid="nav-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-white hover:text-primary transition-colors duration-200 font-medium"
                data-testid="nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-white hover:text-primary transition-colors duration-200 font-medium"
                data-testid="nav-contact"
              >
                Contact
              </button>
              <Button 
                className="btn btn--primary btn--pill" 
                onClick={() => scrollToSection('contact')}
                data-testid="button-request-quote-header"
              >
                Request a Quote
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white p-2"
              onClick={() => setIsMenuOpen(true)}
              data-testid="button-mobile-menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-charcoal bg-opacity-95 backdrop-blur-lg z-50">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="relative flex items-center justify-center h-24 w-32">
                  <img 
                    src={logoLightSrc} 
                    alt="Keane Site Services" 
                    className="absolute h-24 w-auto header-logo cursor-pointer"
                    style={{ maxWidth: '128px' }}
                    onClick={() => scrollToSection('home')}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white p-2"
                  onClick={() => setIsMenuOpen(false)}
                  data-testid="button-mobile-menu-close"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <nav className="flex flex-col flex-1 px-4 py-8 space-y-6">
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="text-white text-xl font-semibold hover:text-primary transition-colors text-left"
                  data-testid="nav-mobile-home"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-white text-xl font-semibold hover:text-primary transition-colors text-left"
                  data-testid="nav-mobile-services"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-white text-xl font-semibold hover:text-primary transition-colors text-left"
                  data-testid="nav-mobile-about"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-white text-xl font-semibold hover:text-primary transition-colors text-left"
                  data-testid="nav-mobile-contact"
                >
                  Contact
                </button>
                <div className="pt-8">
                  <Button 
                    className="btn btn--primary btn--pill w-full" 
                    onClick={() => scrollToSection('contact')}
                    data-testid="button-request-quote-mobile"
                  >
                    Request a Quote
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="main" className="hero">
        {/* Video Media */}
        <div className="hero__media">
          <video 
            ref={videoRef}
            id="heroVideo"
            className="hero-video" 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="metadata"
            poster={posterSrc}
            data-testid="hero-video"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
        
        {/* Hero Overlay */}
        <div className="hero__overlay"></div>
        
        {/* Video Controls */}
        <Button
          variant="ghost"
          size="icon"
          id="toggleVideo"
          className="absolute top-24 right-4 z-10 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/70"
          onClick={toggleVideo}
          aria-pressed={!isVideoPlaying}
          aria-label={isVideoPlaying ? "Pause background video" : "Play background video"}
          data-testid="button-video-toggle"
        >
          {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        
        {/* Hero Content */}
        <div className="hero__content fade-in">
          {/* Logo */}
          <img 
            src={logoSrc} 
            alt="" 
            className="h-60 lg:h-72 mx-auto mb-6 hero-logo"
          />
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Professional Site<br/>
            <span className="text-primary">Clear-Outs</span> &<br/>
            Groundworks
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Fast, compliant, and cost-effective site preparation.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button 
              className="btn btn--primary btn--pill" 
              onClick={() => scrollToSection('contact')}
              data-testid="button-request-quote-hero"
            >
              Request a Quote
            </Button>
            <Button 
              className="btn btn--ghost btn--pill" 
              asChild
              data-testid="button-call-now-hero"
            >
              <a href="tel:+353876460921">Call Now</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" data-section="services" className="py-16 lg:py-24 bg-[hsl(210,17%,97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-700 ease-out transform ${
            visibleSections.has('services') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}>
            <div className="section-divider mx-auto mb-6"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional site preparation services delivered with precision and expertise.
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`service-card p-8 transition-all duration-700 ease-out transform ${
                  visibleSections.has('services') 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                data-testid={`service-card-${index}`}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  href={service.route}
                  className="text-primary font-semibold hover:text-primary/80 transition-colors inline-block"
                  data-testid={`service-learn-more-${index}`}
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Keane Section */}
      <section ref={valuePropsRef} data-section="value-props" className="py-16 lg:py-24 bg-[hsl(0,0%,10%)] relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0,0%,10%)] via-[hsl(0,0%,7%)] to-[hsl(0,0%,10%)] opacity-90"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-700 ease-out transform ${
            visibleSections.has('value-props') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}>
            <div className="section-divider mx-auto mb-6"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Why Choose Keane
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Professional excellence backed by experience, equipment, and unwavering commitment to quality.
            </p>
          </div>
          
          {/* Value Props Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div 
                key={index} 
                className={`text-center transition-all duration-700 ease-out transform ${
                  visibleSections.has('value-props') 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                data-testid={`value-prop-${index}`}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center">
                  <prop.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{prop.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Logo Side */}
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <img 
                ref={aboutLogoRef}
                src={aboutLogoSrc} 
                alt="Keane Site Services Logo" 
                className={`w-80 h-80 logo-hover transition-all duration-1000 ease-out transform ${
                  isAboutLogoVisible 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-75 translate-y-8'
                }`}
                data-testid="about-logo"
              />
            </div>
            
            {/* Content Side */}
            <div className="order-1 lg:order-2">
              <div className="section-divider mb-6"></div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8 tracking-tight">
                About <span className="text-primary">Keane Site Services</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Keane Site Services provides professional site clear-outs and related groundworks. With the right equipment and years of expertise, we deliver reliable results on time, every time.
                </p>
                <p>
                  Our commitment to excellence extends beyond just getting the job done. We prioritize safety, environmental compliance, and transparent communication throughout every project phase.
                </p>
                <p>
                  From small residential clearances to large commercial developments, our experienced team and modern equipment fleet ensure your site is prepared to the highest professional standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band Section */}
      <section className="py-16 bg-primary relative overflow-hidden">
        {/* Metallic accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-600 opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
            Get Your Site Cleared by the Experts
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Ready to start your project? Contact us today for a free consultation and quote.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button 
              className="btn btn--ghost btn--pill w-full sm:w-auto" 
              asChild
              data-testid="button-call-now-cta"
            >
              <a href="tel:+353876460921">Call Now</a>
            </Button>
            <Button 
              className="btn btn--primary btn--pill w-full sm:w-auto" 
              onClick={() => scrollToSection('contact')}
              data-testid="button-request-quote-cta"
            >
              Request a Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" data-section="contact" className="py-16 lg:py-24 bg-[hsl(210,17%,97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-700 ease-out transform ${
            visibleSections.has('contact') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}>
            <div className="section-divider mx-auto mb-6"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to discuss your project? Contact us today for a free consultation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className={`space-y-8 transition-all duration-700 ease-out transform ${
              visibleSections.has('contact') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4" data-testid="contact-phone">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Phone</div>
                      <a href="tel:+353876460921" className="text-primary hover:underline">+353 87 646 0921</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4" data-testid="contact-email">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <a href="mailto:info@keanesiteservices.com" className="text-primary hover:underline">info@keanesiteservices.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4" data-testid="contact-location">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Service Area</div>
                      <div className="text-muted-foreground">Ireland</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Business Hours */}
              <div data-testid="business-hours">
                <h4 className="text-lg font-semibold text-foreground mb-4">Business Hours</h4>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>7:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>8:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Emergency Only</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className={`bg-white p-8 rounded-2xl shadow-lg transition-all duration-700 ease-out transform ${
              visibleSections.has('contact') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}>
              <h3 className="text-2xl font-bold text-foreground mb-6">Request a Quote</h3>
              
              {/* Netlify Form */}
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true" 
                netlify-honeypot="bot-field" 
                className="space-y-6" 
                onSubmit={handleSubmit}
                data-testid="contact-form"
              >
                {/* Honeypot field */}
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="form-name" value="contact" />
                
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
                      data-testid="input-name"
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
                      data-testid="input-phone"
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
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="service" className="block text-sm font-semibold text-foreground mb-2">Service Required</Label>
                  <Select value={formData.service} onValueChange={(value) => handleFormChange('service', value)}>
                    <SelectTrigger className="w-full" data-testid="select-service">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="site-clearouts">Site Clear-Outs</SelectItem>
                      <SelectItem value="waste-removal">Waste Removal</SelectItem>
                      <SelectItem value="ground-preparation">Ground Preparation</SelectItem>
                      <SelectItem value="haulage-support">Haulage Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">Project Details</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    placeholder="Tell us about your project requirements..."
                    value={formData.message}
                    onChange={(e) => handleFormChange('message', e.target.value)}
                    className="w-full resize-y"
                    data-testid="textarea-message"
                  />
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="btn btn--primary btn--pill w-full" 
                  disabled={isSubmitting}
                  data-testid="button-submit-form"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                
                {/* Success Message */}
                {submitSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg" data-testid="success-message">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(0,0%,10%)] py-12" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-primary transition-colors text-sm">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-primary transition-colors text-sm">Services</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-primary transition-colors text-sm">About</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-primary transition-colors text-sm">Contact</button></li>
              </ul>
            </div>
            
            {/* Centered Large Logo */}
            <div className="flex justify-center">
              <img 
                src={footerLogoSrc} 
                alt="Keane Site Services" 
                className="h-64 w-auto logo-hover"
                data-testid="footer-logo"
              />
            </div>
            
            {/* Contact Info */}
            <div className="text-center md:text-right">
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Phone: +353 87 646 0921</div>
                <div>Email: info@keanesiteservices.com</div>
                <div>Service Area: Ireland</div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Keane Site Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
