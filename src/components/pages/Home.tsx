import {
  Search,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Wrench,
  Paintbrush,
  Car,
  Laptop,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { TypingEffect } from "../TypingEffect";
import { useState } from "react";
import { toast } from "sonner";
import Autoplay from "embla-carousel-autoplay";
import { Helmet } from "react-helmet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for "${searchQuery}"...`, {
        description: "We're finding the best providers for your needs!",
      });
      // In a real app, this would navigate to search results
      onNavigate("services");
    } else {
      toast.error("Please enter a service to search for");
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!waitlistEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(waitlistEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Note: The provided URL is a published HTML view. You'll need to create a Google Apps Script
      // web app that accepts POST requests and writes to your Google Sheet.
      // Replace this URL with your actual Google Apps Script web app endpoint.
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbyUVNnpO7C3Stivxin25hGiSPpYCNsffADCBdC8Z1Wz-hlX1oobEJ9Ey7AOLTEF6Mia/exec";

      const formData = new FormData();
      formData.append("email", waitlistEmail);
      formData.append("timestamp", new Date().toISOString());

      // Try a normal POST first. Many Apps Script web apps block CORS and
      // cause the fetch to throw. If that happens, fall back to a
      // `no-cors` POST so the browser at least sends the request (response
      // will be opaque). Note: `no-cors` cannot be inspected; prefer fixing
      // the Apps Script to allow CORS for reliable behavior.
      try {
        const response = await fetch(scriptURL, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          toast.success("Successfully joined the waitlist!", {
            description: "We'll notify you when HeyB launches!",
          });
          setSavedEmail(waitlistEmail);
          setWaitlistEmail("");
          setShowSuccessModal(true);
        } else {
          // If server responded but not OK, attempt a no-cors fallback.
          console.warn(
            "Waitlist POST returned non-ok status:",
            response.status
          );
          try {
            await fetch(scriptURL, {
              method: "POST",
              body: new URLSearchParams({
                email: waitlistEmail,
                timestamp: new Date().toISOString(),
              }),
              mode: "no-cors",
            });
            toast.success("Successfully joined the waitlist!", {
              description: "We'll notify you when HeyB launches!",
            });
            setSavedEmail(waitlistEmail);
            setWaitlistEmail("");
            setShowSuccessModal(true);
          } catch (fallbackErr) {
            toast.error("Failed to join waitlist", {
              description: "Please try again later or contact support.",
            });
            console.error("Fallback no-cors submission failed:", fallbackErr);
          }
        }
      } catch (err) {
        // Likely a CORS/network error — try the no-cors fallback so the
        // browser will still send the request. This may succeed even when
        // CORS blocks the normal fetch, but the response cannot be inspected.
        console.warn("Primary POST failed, attempting no-cors fallback:", err);
        try {
          await fetch(scriptURL, {
            method: "POST",
            body: new URLSearchParams({
              email: waitlistEmail,
              timestamp: new Date().toISOString(),
            }),
            mode: "no-cors",
          });
          toast.success("Successfully joined the waitlist!", {
            description: "We'll notify you when HeyB launches!",
          });
          setSavedEmail(waitlistEmail);
          setWaitlistEmail("");
          setShowSuccessModal(true);
        } catch (fallbackErr) {
          toast.error("Something went wrong", {
            description: "Please try again later or contact support.",
          });
          console.error(
            "Waitlist submission error (fallback failed):",
            fallbackErr
          );
        }
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again later or contact support.",
      });
      console.error("Waitlist submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { icon: Wrench, name: "Home Maintenance", color: "text-primary" },
    { icon: Car, name: "Auto Repair", color: "text-secondary" },
    { icon: Sparkles, name: "Beauty Services", color: "text-accent" },
    { icon: Laptop, name: "Tech Support", color: "text-primary" },
    {
      icon: Paintbrush,
      name: "Professional Services",
      color: "text-secondary",
    },
    { icon: Users, name: "Event Services", color: "text-accent" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Providers",
      description:
        "All service providers are thoroughly vetted and verified for your peace of mind.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description:
        "Get multiple quotes within hours and hire the right professional for your job.",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description:
        "Read reviews, compare ratings, and choose professionals with proven track records.",
      color: "bg-accent/20 text-accent-foreground",
    },
  ];

  const testimonials = [
    {
      name: "Chioma Adeleke",
      role: "Homeowner, Lagos",
      text: "HeyB made it so easy to find a reliable plumber. I got 5 quotes within 2 hours and hired the perfect person for my job!",
      rating: 5,
      initials: "CA",
      color: "from-purple-500 to-purple-700",
    },
    {
      name: "Tunde Okafor",
      role: "Small Business Owner",
      text: "As a service provider, HeyB has transformed my business. I now get consistent work and my calendar is always full!",
      rating: 5,
      initials: "TO",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Amara Johnson",
      role: "Salon Owner, Abuja",
      text: "The verification process gave me credibility. Now clients trust me before we even meet. Best platform for service professionals!",
      rating: 5,
      initials: "AJ",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Ibrahim Hassan",
      role: "Car Owner, Port Harcourt",
      text: "Found an amazing auto mechanic through HeyB. Professional, affordable, and did excellent work. Highly recommend!",
      rating: 5,
      initials: "IH",
      color: "from-blue-500 to-purple-600",
    },
    {
      name: "Funmi Adebayo",
      role: "Event Planner, Ibadan",
      text: "I regularly hire caterers, photographers, and decorators through HeyB. The quality is always top-notch!",
      rating: 5,
      initials: "FA",
      color: "from-pink-500 to-rose-600",
    },
    {
      name: "Emeka Nwosu",
      role: "Tech Support Provider",
      text: "Being verified on HeyB opened so many doors for my IT business. Clients find me easily and trust my expertise.",
      rating: 5,
      initials: "EN",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Blessing Okoro",
      role: "Property Manager, Enugu",
      text: "Managing multiple properties is easier with HeyB. I can quickly find cleaners, electricians, and painters whenever needed.",
      rating: 5,
      initials: "BO",
      color: "from-indigo-500 to-blue-600",
    },
    {
      name: "David Okonkwo",
      role: "Carpenter, Calabar",
      text: "HeyB helped me grow from a one-man operation to having a full team. The platform brings me consistent high-value jobs.",
      rating: 5,
      initials: "DO",
      color: "from-teal-500 to-cyan-600",
    },
  ];

  const stats = [
    { value: "50,000+", label: "Verified Providers" },
    { value: "200,000+", label: "Jobs Completed" },
    { value: "15+", label: "Service Categories" },
    { value: "4.8/5", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 sm:py-20 lg:py-28 overflow-hidden">
        {/* Floating Background Shapes */}
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="floating-shape floating-shape-3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 animate-slide-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-['Poppins'] mb-6 sm:mb-8 text-primary px-4 min-h-[5rem]">
              <TypingEffect text="Find. Hire. Get It Done." speed={100} />
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 px-4 leading-relaxed">
              Connect with verified local service providers across Nigeria and
              Africa. From home maintenance to professional services, find
              trusted experts in minutes.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="glass rounded-2xl shadow-2xl p-3 flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto hover-glow"
            >
              <div className="flex-1 flex items-center px-4 sm:border-r border-border/30">
                <Search className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                <Input
                  placeholder="What service do you need?"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:text-muted-foreground/60"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 px-8 sm:px-10 py-6 w-full sm:w-auto shadow-lg"
              >
                Search Services
              </Button>
            </form>

            {/* Quick Service Links */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 px-4 animate-scale-in">
              {services.map((service, index) => (
                <button
                  key={service.name}
                  className="flex items-center space-x-2 px-4 sm:px-5 py-3 glass rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/30 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <service.icon
                    className={`w-5 h-5 ${service.color} group-hover:scale-110 transition-transform`}
                  />
                  <span className="text-sm">{service.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Poppins'] text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-accent/5 to-primary/5 relative overflow-hidden">
        <div className="floating-shape floating-shape-2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6 text-primary">
              Why Choose HeyB?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're building trust and transparency in Africa's service
              marketplace
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-10 hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/30 bg-white/80 backdrop-blur-sm group hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-['Poppins'] mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative overflow-hidden">
        <div className="floating-shape floating-shape-1"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6 text-primary">
              How It Works
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get your job done in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 lg:gap-6">
            {[
              {
                step: "1",
                title: "Post Your Job",
                desc: "Tell us what you need done",
                color: "bg-gradient-to-br from-primary to-primary/80",
              },
              {
                step: "2",
                title: "Compare Quotes",
                desc: "Get multiple quotes from verified pros",
                color: "bg-gradient-to-br from-secondary to-secondary/80",
              },
              {
                step: "3",
                title: "Hire the Best",
                desc: "Choose based on reviews and price",
                color: "bg-gradient-to-br from-accent to-accent/80",
              },
              {
                step: "4",
                title: "Pay Securely",
                desc: "Complete payment through our platform",
                color: "bg-gradient-to-br from-primary to-secondary",
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative group">
                <div
                  className={`w-20 h-20 rounded-full ${item.color} text-white flex items-center justify-center mx-auto mb-6 text-3xl font-bold font-['Poppins'] shadow-xl group-hover:scale-110 transition-transform duration-300`}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-['Poppins'] mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed px-2">
                  {item.desc}
                </p>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-10 -right-3 text-muted-foreground/20 w-10 h-10" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              onClick={() => onNavigate("how-it-works")}
              size="lg"
              className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 px-10 py-7 shadow-2xl hover:shadow-primary/50"
            >
              Learn More <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
        <div className="floating-shape floating-shape-3"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6 text-primary">
              What Our Users Say
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Real experiences from real people across Africa
            </p>
          </div>

          {/* Carousel for all screens */}
          <div className="max-w-5xl mx-auto">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="p-8 h-full bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 group">
                      <div className="flex mb-5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-6 h-6 fill-accent text-accent group-hover:scale-110 transition-transform"
                            style={{ transitionDelay: `${i * 0.05}s` }}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-8 italic leading-relaxed">
                        \"{testimonial.text}\"
                      </p>
                      <div className="flex items-center">
                        <div
                          className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center mr-4 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all shadow-lg`}
                        >
                          <span className="text-white font-bold text-lg">
                            {testimonial.initials}
                          </span>
                        </div>
                        <div>
                          <div className="font-['Poppins']">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-8">
                <CarouselPrevious className="relative left-0 translate-x-0 translate-y-0 bg-primary text-white hover:bg-primary/90 border-0" />
                <CarouselNext className="relative right-0 translate-x-0 translate-y-0 bg-primary text-white hover:bg-primary/90 border-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-secondary to-accent text-white relative overflow-hidden animate-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold font-['Poppins'] mb-8">
            Join the Waitlist
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
            Be the first to know when HeyB launches. Get exclusive early access
            to connect with verified service providers across Africa!
          </p>

          {/* Waitlist Form */}
          <div className="flex justify-center">
            <form
              onSubmit={handleWaitlistSubmit}
              className="glass rounded-2xl shadow-2xl p-3 flex flex-col sm:flex-row gap-3 max-w-3xl w-full hover-glow"
            >
              <div className="flex-1 flex items-center px-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:text-muted-foreground/60 text-foreground"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  disabled={isSubmitting}
                  aria-label="Email address for waitlist"
                />
              </div>
              <Button
                type="submit"
                className="bg-white text-primary hover:bg-white/90 px-8 sm:px-10 py-6 w-full sm:w-auto shadow-lg hover:scale-105 transition-transform"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
          </div>
        </div>
      </section>
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogHeader className="sr-only">
          <DialogTitle>Joined Waitlist</DialogTitle>
          <DialogDescription>
            Confirmation that you've joined the HeyB waitlist.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="flex flex-col items-center text-center gap-4 py-2">
            <CheckCircle className="w-14 h-14 text-emerald-500" />
            <h3 className="text-2xl font-bold">Joined Waitlist</h3>
            <p className="text-muted-foreground">
              Thanks! We'll notify ASAP{" "}
              <span className="font-medium">{savedEmail}</span> when HeyB
              launches.
            </p>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
