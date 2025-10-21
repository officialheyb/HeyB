import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { SiSubstack } from "react-icons/si";
import heybLogo from "figma:asset/e0e68f1c544810d61fdfca1264a2cb79408d1ee9.png";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-t border-border/50 relative overflow-hidden" role="contentinfo">
      <div className="floating-shape floating-shape-1"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center mb-4 justify-center sm:justify-start">
              <img 
                src={heybLogo} 
                alt="HeyB Logo" 
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              Find. Hire. Get It Done. <br />
              Your trusted service marketplace across Africa.
            </p>
            <div className="flex space-x-3 justify-center sm:justify-start" role="list" aria-label="Social media links">
              <a 
                href="https://www.facebook.com/share/15taQEweUA/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:scale-110 hover:shadow-lg"
                aria-label="Visit HeyB on Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="https://x.com/heyB_global?t=4ZNvEoUY1duJVxICiS0n9g&s=09" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 hover:scale-110 hover:shadow-lg"
                aria-label="Visit HeyB on X (formerly Twitter)"
              >
                <FaXTwitter className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="https://www.instagram.com/heyb_global/profilecard/?igsh=ZXRtOWY2c25nbGFl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-accent/20 text-accent-foreground hover:bg-accent hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 hover:scale-110 hover:shadow-lg"
                aria-label="Visit HeyB on Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="https://substack.com/@heybglobal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:scale-110 hover:shadow-lg"
                aria-label="Visit HeyB on Substack"
              >
                <SiSubstack className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-['Poppins'] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", page: "about" },
                { label: "How It Works", page: "how-it-works" },
                { label: "Service Categories", page: "services" },
                { label: "Blog & Resources", page: "blog" },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* For Users */}
          <div className="text-center sm:text-left">
            <h4 className="font-['Poppins'] mb-4">For Users</h4>
            <ul className="space-y-2">
              {[
                { label: "For Providers", page: "providers" },
                { label: "For Clients", page: "clients" },
                { label: "Support & FAQs", page: "support" },
                { label: "Privacy Policy", page: "privacy" },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="font-['Poppins'] mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-muted-foreground justify-center sm:justify-start">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Lagos, Nigeria</span>
              </li>
              <li className="flex items-start space-x-2 text-muted-foreground justify-center sm:justify-start">
                <Phone className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+2349133826633" className="hover:text-primary transition-colors">09133826633</a>
                  <a href="tel:+2347084517082" className="hover:text-primary transition-colors">07084517082</a>
                </div>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground justify-center sm:justify-start">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:officialheyb@gmail.com" className="hover:text-primary transition-colors break-all">
                  officialheyb@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © 2025 HeyB. All rights reserved. Building trust in Africa's service marketplace.
            </p>
            <div className="flex space-x-6 text-sm">
              <button
                onClick={() => onNavigate("privacy")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate("privacy")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}