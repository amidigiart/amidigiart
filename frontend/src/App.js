import { useState, useEffect, useRef } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Navigation links
const navLinks = [
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "FAQs", path: "/faqs" },
  { name: "Authors", path: "/authors" },
  { name: "Events", path: "/events" },
  { name: "Shop", path: "/shop" },
  { name: "Patterns", path: "/patterns" },
  { name: "Themes", path: "/themes" },
];

// Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      if (cursorRef.current && cursorRingRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        
        // Add slight delay for outer ring
        setTimeout(() => {
          cursorRingRef.current.style.left = `${e.clientX}px`;
          cursorRingRef.current.style.top = `${e.clientY}px`;
        }, 100);
      }
    });

    return () => {
      document.removeEventListener("mousemove", () => {});
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={cursorRef}></div>
      <div className="cursor-ring" ref={cursorRingRef}></div>
    </>
  );
};

// Header Component
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="header glass-effect">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="logo"
        >
          <h1 className="text-2xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-primary to-dreamland-purple">
            Digital<span className="text-accent">Dreamland</span>
          </h1>
          <span className="trademark text-xs font-light">amidigiart™</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="flex space-x-8"
          >
            {navLinks.map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="nav-item"
              >
                <a href={link.path} className="nav-link">
                  {link.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-button"
          >
            <div className={`hamburger ${isOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-nav glass-effect md:hidden"
          >
            <ul className="py-4 px-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="nav-item"
                >
                  <a href={link.path} className="nav-link block py-2">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  const heroRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-particle", {
        y: "random(-100, 100)",
        x: "random(-100, 100)",
        opacity: "random(0.3, 0.8)",
        duration: "random(15, 30)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={heroRef} className="hero relative overflow-hidden">
      <div className="hero-particles">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="hero-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              opacity: Math.random() * 0.5 + 0.3,
              backgroundColor: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`,
              borderRadius: "50%",
              filter: "blur(8px)"
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-content"
          >
            <h4 className="uppercase tracking-wider text-sm font-semibold mb-3 text-accent-light">Welcome to</h4>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 gradient-text">
              Digital<br />Dreamland
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg">
              Where imagination becomes digital reality. Explore our stunning collection of fantasy and digital art creations.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
              >
                Explore Gallery
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-image relative"
          >
            <div className="image-container rounded-2xl overflow-hidden shadow-glow animate-float">
              <img
                src="https://images.unsplash.com/photo-1593073637686-cc056c151c1e"
                alt="Digital Art Creation"
                className="w-full h-auto rounded-2xl object-cover"
              />
              <div className="image-overlay"></div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="badge-card left-badge glass-effect"
            >
              <span className="text-dreamland-cyan">700+</span>
              <span>Artworks</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="badge-card right-badge glass-effect"
            >
              <span className="text-accent">12k+</span>
              <span>Happy Clients</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-dot"></div>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const featuresRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      });
    }, featuresRef);
    
    return () => ctx.revert();
  }, []);
  
  const features = [
    {
      title: "Stunning Fantasy Worlds",
      description: "Immerse yourself in breathtaking digital landscapes that transport you to otherworldly realms.",
      icon: "✨"
    },
    {
      title: "Unique Digital Art",
      description: "Discover one-of-a-kind creations that blend technical skill with boundless imagination.",
      icon: "🎨"
    },
    {
      title: "Customized Creations",
      description: "Commission personalized digital artwork tailored to your specific vision and requirements.",
      icon: "⚡"
    },
    {
      title: "Community Events",
      description: "Join our vibrant community of digital artists and enthusiasts in regular online events.",
      icon: "🌟"
    }
  ];
  
  return (
    <section ref={featuresRef} className="features py-20 bg-neutral-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Discover the <span className="text-primary">Magic</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-subtitle"
          >
            Explore our world of digital art and fantasy creations
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="landscape-showcase relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1491466424936-e304919aada7"
              alt="Fantasy Digital Landscape"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/80 to-transparent flex items-end">
              <div className="p-8">
                <h3 className="text-2xl font-display text-white mb-2">Ethereal Landscapes</h3>
                <p className="text-neutral-light/80 max-w-xl">
                  Our digital landscapes capture the essence of dreams, creating immersive environments that ignite the imagination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section className="about py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-image"
          >
            <div className="image-container rounded-2xl overflow-hidden shadow-lg relative">
              <img
                src="https://images.unsplash.com/photo-1555212697-194d092e3b8f"
                alt="Digital Art Workspace"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-primary/10"></div>
            </div>
            
            <div className="experience-badge glass-effect">
              <span className="font-display text-3xl font-bold text-primary">5+</span>
              <span>Years of Experience</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-content"
          >
            <h4 className="uppercase tracking-wider text-sm font-semibold mb-3 text-accent">About Us</h4>
            <h2 className="section-title mb-6">The Story Behind <span className="text-primary">Digital Dreamland</span></h2>
            <p className="mb-6">
              Digital Dreamland was founded with a passion for bringing fantasy to life through digital art. Our team of talented artists combines technical expertise with boundless creativity to craft stunning visual experiences.
            </p>
            <p className="mb-8">
              Each creation is a journey into imagination, meticulously crafted to transport viewers to extraordinary realms. We believe in the power of digital art to inspire, evoke emotion, and create connections.
            </p>
            
            <div className="stats-grid grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="stat-card">
                <span className="stat-number">700+</span>
                <span className="stat-label">Artworks</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">150+</span>
                <span className="stat-label">Artists</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">12k+</span>
                <span className="stat-label">Clients</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Testimonial Section Component
const TestimonialSection = () => {
  const testimonials = [
    {
      text: "Digital Dreamland transformed my concept into a breathtaking visual masterpiece. The attention to detail and creative execution exceeded all my expectations.",
      author: "Sophia Chen",
      role: "Art Director"
    },
    {
      text: "The artwork I commissioned captured exactly what I envisioned but couldn't articulate. The team's ability to translate ideas into visual reality is truly remarkable.",
      author: "Marcus Johnson",
      role: "Game Designer"
    },
    {
      text: "Working with Digital Dreamland was an incredible experience. Their artists have a unique ability to create digital worlds that feel alive and immersive.",
      author: "Elena Rodriguez",
      role: "Author"
    }
  ];
  
  const [active, setActive] = useState(0);
  
  return (
    <section className="testimonials py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4"
          alt="Abstract Digital Art"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Client <span className="text-primary">Testimonials</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-subtitle"
          >
            Hear what our clients have to say about their experience
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="testimonial-slider">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="testimonial-card glass-effect"
              >
                <div className="quote-icon">❝</div>
                <p className="testimonial-text">
                  {testimonials[active].text}
                </p>
                <div className="testimonial-author">
                  <h4>{testimonials[active].author}</h4>
                  <p>{testimonials[active].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="testimonial-nav flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`testimonial-dot ${active === index ? "active" : ""}`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
  return (
    <section className="cta py-20 bg-gradient-to-r from-primary to-dreamland-purple text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-display font-bold mb-4"
            >
              Ready to Bring Your Vision to Life?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-8 text-white/90"
            >
              Let us transform your ideas into stunning digital realities. Connect with our team today to start your journey.
            </motion.p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-light"
            >
              Get Started
            </motion.button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="cta-form glass-effect-dark p-8 rounded-2xl"
          >
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="form-group">
                <input type="text" placeholder="Your Name" className="form-input" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" className="form-input" />
              </div>
              <div className="form-group">
                <textarea placeholder="Tell us about your project" className="form-input" rows="4"></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-accent w-full"
              >
                Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer bg-neutral-dark text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="footer-brand">
            <h2 className="text-2xl font-display font-bold mb-4">
              Digital<span className="text-accent">Dreamland</span>
            </h2>
            <p className="mb-6 text-neutral-light/70">
              Where imagination becomes digital reality.
            </p>
            <div className="social-links flex space-x-4">
              <a href="#" className="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="https://tiktok.com/@amidigiart" className="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path><path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M15 8v8a4 4 0 0 1-4 4"></path><line x1="15" x2="15" y1="4" y2="12"></line></svg>
              </a>
              <a href="#" className="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-links">
            <h3 className="text-lg font-bold mb-4">More Links</h3>
            <ul className="space-y-2">
              {navLinks.slice(4).map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-newsletter">
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="mb-4 text-neutral-light/70">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
              />
              <button className="newsletter-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom mt-12 pt-8 border-t border-neutral-light/10 text-center text-neutral-light/50 text-sm">
          <p>
            © {new Date().getFullYear()} Digital Dreamland | amidigiart™ | All rights reserved | Designed with WordPress
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Home Component
const Home = () => {
  useEffect(() => {
    // Initialize scroll animations
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => section.classList.add('in-view')
      });
    });
  }, []);

  return (
    <div className="home">
      <CustomCursor />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
