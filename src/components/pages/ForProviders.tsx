import { DollarSign, Calendar, TrendingUp, Shield, Star, Users, CheckCircle, ArrowRight, Briefcase, Target } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface ForProvidersProps {
  onNavigate: (page: string) => void;
}

export function ForProviders({ onNavigate }: ForProvidersProps) {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn More Income",
      description: "Access consistent work opportunities and set your own rates. Top providers earn ₦500,000+ monthly.",
      color: "primary",
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Work when you want. Choose jobs that fit your availability and location preferences.",
      color: "secondary",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Build your reputation with reviews and ratings. Get discovered by thousands of potential clients.",
      color: "accent",
    },
    {
      icon: Shield,
      title: "Protected Payments",
      description: "Secure payment processing ensures you get paid for every completed job. No more chasing payments.",
      color: "primary",
    },
    {
      icon: Star,
      title: "Build Your Brand",
      description: "Showcase your skills, portfolio, and customer reviews to stand out from the competition.",
      color: "secondary",
    },
    {
      icon: Users,
      title: "Support Network",
      description: "Join a community of professionals. Access training, resources, and dedicated support.",
      color: "accent",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Sign Up & Create Profile",
      description: "Fill in your details, add your skills, experience, and service areas. Upload photos of your work.",
    },
    {
      number: "2",
      title: "Get Verified",
      description: "Submit required documents for verification. We check credentials, experience, and references.",
    },
    {
      number: "3",
      title: "Browse & Quote",
      description: "Browse available jobs in your area. Submit competitive quotes and win work.",
    },
    {
      number: "4",
      title: "Deliver & Earn",
      description: "Complete jobs, receive payments securely, and build your reputation with great reviews.",
    },
  ];

  const testimonials = [
    {
      name: "Emmanuel Okonkwo",
      role: "Electrician, Lagos",
      text: "HeyB changed my business completely. I went from struggling to find clients to having a full schedule every week. The verification badge gives clients confidence.",
      initials: "EO",
      gradient: "from-purple-500 to-purple-700",
    },
    {
      name: "Blessing Adeyemi",
      role: "Hair Stylist, Abuja",
      text: "As a female entrepreneur, HeyB gave me the platform to showcase my skills safely. I've tripled my income in just 6 months!",
      initials: "BA",
      gradient: "from-pink-500 to-rose-600",
    },
  ];

  const requirements = [
    "Valid ID card (National ID, Driver's License, or Passport)",
    "Proof of relevant skills or certifications (where applicable)",
    "Professional references or portfolio",
    "Active phone number and email address",
    "Bank account for receiving payments",
    "Professional attitude and commitment to quality service",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6">
                Turn Your Skills Into Income
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join 50,000+ verified service providers earning steady income on HeyB. Get access to thousands of job opportunities across Nigeria.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <CheckCircle className="mr-2" />
                  Sign Up as Provider
                </Button>
                <Button onClick={() => onNavigate("how-it-works")} size="lg" variant="outline">
                  How It Works <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-8">
                <div>
                  <div className="text-3xl font-bold font-['Poppins'] text-primary">₦500K+</div>
                  <div className="text-sm text-muted-foreground">Avg. Top Provider Monthly</div>
                </div>
                <div>
                  <div className="text-3xl font-bold font-['Poppins'] text-secondary">4.8/5</div>
                  <div className="text-sm text-muted-foreground">Provider Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary via-secondary to-accent p-12 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <DollarSign className="w-20 h-20 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <Calendar className="w-20 h-20 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <TrendingUp className="w-20 h-20 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <Shield className="w-20 h-20 text-white" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-accent via-primary to-secondary rounded-3xl -z-10 opacity-50 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-4">
              Why Join HeyB?
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to grow your service business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/20">
                <div className={`w-12 h-12 rounded-lg bg-${benefit.color}/10 text-${benefit.color} flex items-center justify-center mb-4`}>
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-['Poppins'] mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-4">
              Get Started in 4 Easy Steps
            </h2>
            <p className="text-xl text-muted-foreground">
              From sign-up to your first job in days
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold font-['Poppins']">
                  {step.number}
                </div>
                <h3 className="text-lg font-['Poppins'] mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-4">
              What You'll Need
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple requirements to get verified
            </p>
          </div>

          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{req}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              Real providers, real results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white mr-4 flex-shrink-0`}>
                    <span className="font-bold text-xl">{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="font-['Poppins']">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-['Poppins'] mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of verified providers building successful businesses on HeyB
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            <CheckCircle className="mr-2" />
            Create Provider Account
          </Button>
          <p className="mt-4 text-white/80 text-sm">No signup fees. Get verified in 24-48 hours.</p>
        </div>
      </section>
    </div>
  );
}
