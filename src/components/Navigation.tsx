import { useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import heybLogo from "figma:asset/e0e68f1c544810d61fdfca1264a2cb79408d1ee9.png";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { label: "Home", page: "home" },
    { label: "About", page: "about" },
    { label: "How It Works", page: "how-it-works" },
    { label: "Services", page: "services" },
    { label: "For Providers", page: "providers" },
    { label: "For Clients", page: "clients" },
    { label: "Blog", page: "blog" },
    { label: "Support", page: "support" },
  ];

  const handleLogoClick = () => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    // Clear existing timeout
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    // Check if 3 taps reached
    if (newTapCount >= 3) {
      onNavigate("blog-login");
      setTapCount(0);
      return;
    }

    // Reset tap count after 5 seconds
    tapTimeoutRef.current = setTimeout(() => {
      setTapCount(0);
    }, 5000);

    // Navigate to home on first tap
    if (newTapCount === 1) {
      onNavigate("home");
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/20 shadow-lg" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            aria-label="HeyB Home - Click 3 times within 5 seconds for admin access"
          >
            <img 
              src={heybLogo} 
              alt="HeyB Logo" 
              className="h-16 md:h-20 w-auto object-contain group-hover:scale-110 transition-all duration-300 drop-shadow-lg"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1" role="menubar">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                role="menuitem"
                aria-current={currentPage === item.page ? "page" : undefined}
                className={`px-4 py-2.5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  currentPage === item.page
                    ? "text-primary bg-gradient-to-r from-primary/20 to-primary/10 shadow-md"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5 hover:scale-105"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary/10 px-6 py-2.5 transition-all duration-300 hover:scale-105"
              aria-label="Sign in to your account"
            >
              Sign In
            </Button>
            <Button 
              className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 px-6 py-2.5 shadow-lg hover:shadow-xl hover:scale-105"
              aria-label="Get started with HeyB"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-border" role="menu">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  role="menuitem"
                  aria-current={currentPage === item.page ? "page" : undefined}
                  className={`px-4 py-2 text-left rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    currentPage === item.page
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 flex flex-col space-y-2 px-4">
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary"
                  aria-label="Sign in to your account"
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary"
                  aria-label="Get started with HeyB"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}