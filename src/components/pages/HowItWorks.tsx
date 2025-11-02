import { FileText, Users, CheckCircle, CreditCard, Shield, Star, MessageCircle, Search } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface HowItWorksProps {
  onNavigate: (page: string) => void;
}

export function HowItWorks({ onNavigate }: HowItWorksProps) {
  const clientSteps = [
    {
      icon: FileText,
      title: "Post Your Job",
      description: "Describe what you need done, when you need it, and your budget. Be as detailed as possible for accurate quotes.",
      color: "primary",
    },
    {
      icon: Users,
      title: "Compare Quotes",
      description: "Receive multiple quotes from verified providers within hours. Review their profiles, ratings, and past work.",
      color: "secondary",
    },
    {
      icon: CheckCircle,
      title: "Hire the Best",
      description: "Choose the provider that best fits your needs based on price, availability, and reviews.",
      color: "accent",
    },
    {
      icon: CreditCard,
      title: "Pay Securely",
      description: "Complete payment through our secure platform. Release payment only when you're satisfied with the work.",
      color: "primary",
    },
  ];

  const providerSteps = [
    {
      icon: FileText,
      title: "Create Your Profile",
      description: "Sign up and create a detailed profile showcasing your skills, experience, and service areas.",
      color: "primary",
    },
    {
      icon: Shield,
      title: "Get Verified",
      description: "Complete our verification process to build trust with clients. Submit required documents and credentials.",
      color: "secondary",
    },
    {
      icon: Search,
      title: "Find Jobs",
      description: "Browse available jobs in your area and service category. Submit competitive quotes to win work.",
      color: "accent",
    },
    {
      icon: Star,
      title: "Build Your Reputation",
      description: "Deliver quality service, earn great reviews, and grow your business with consistent work.",
      color: "primary",
    },
  ];

  const safetyFeatures = [
    {
      icon: Shield,
      title: "Provider Verification",
      description: "All providers undergo background checks and skill verification before joining the platform.",
    },
    {
      icon: Star,
      title: "Review System",
      description: "Transparent ratings and reviews help you make informed decisions about who to hire.",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Payments are held securely and only released when both parties are satisfied.",
    },
    {
      icon: MessageCircle,
      title: "In-App Communication",
      description: "All communication happens through the platform for your safety and record-keeping.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6">
            How HeyB Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Getting your job done or finding work is simple with HeyB. Follow these easy steps to get started.
          </p>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="client">For Clients</TabsTrigger>
              <TabsTrigger value="provider">For Providers</TabsTrigger>
            </TabsList>

            <TabsContent value="client" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-['Poppins'] mb-4">
                  Post → Compare → Hire → Pay Securely
                </h2>
                <p className="text-lg text-muted-foreground">
                  Four simple steps to get your job done
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {clientSteps.map((step, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-${step.color}/10 text-${step.color} flex items-center justify-center flex-shrink-0`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <span className={`w-6 h-6 rounded-full bg-${step.color} text-white flex items-center justify-center text-sm font-bold mr-2`}>
                            {index + 1}
                          </span>
                          <h3 className="text-xl font-['Poppins']">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button
                  onClick={() => onNavigate("clients")}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  Start Posting Jobs
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="provider" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-['Poppins'] mb-4">
                  Sign Up → Verify → Find Jobs → Earn
                </h2>
                <p className="text-lg text-muted-foreground">
                  Build your business with HeyB
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {providerSteps.map((step, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-${step.color}/10 text-${step.color} flex items-center justify-center flex-shrink-0`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <span className={`w-6 h-6 rounded-full bg-${step.color} text-white flex items-center justify-center text-sm font-bold mr-2`}>
                            {index + 1}
                          </span>
                          <h3 className="text-xl font-['Poppins']">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button
                  onClick={() => onNavigate("providers")}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  Become a Provider
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Safety & Trust */}
      <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-4">
              Your Safety is Our Priority
            </h2>
            <p className="text-xl text-muted-foreground">
              Multiple layers of security to protect both clients and providers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-white flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-['Poppins'] mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-4">
              The Complete Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              From posting a job to completion
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gradient-to-b from-primary via-secondary to-accent transform -translate-x-1/2 hidden md:block"></div>

            {[
              {
                title: "Job Posted",
                description: "Client describes their service need with details and budget",
              },
              {
                title: "Providers Notified",
                description: "Verified professionals in the area receive job notifications",
              },
              {
                title: "Quotes Submitted",
                description: "Providers review the job and submit competitive quotes",
              },
              {
                title: "Provider Selected",
                description: "Client reviews quotes and selects the best provider",
              },
              {
                title: "Work Begins",
                description: "Provider completes the job according to agreed terms",
              },
              {
                title: "Job Completed",
                description: "Client reviews work and releases payment",
              },
              {
                title: "Reviews Exchanged",
                description: "Both parties leave reviews to build trust in the community",
              },
            ].map((step, index) => (
              <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <Card className="p-6 inline-block hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-['Poppins'] mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </Card>
                </div>
                <div className="hidden md:block w-8 h-8 rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-white flex items-center justify-center z-10 flex-shrink-0">
                  <span className="font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-6">
            Ready to Experience the HeyB Difference?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands who trust HeyB for their service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate("clients")}
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              I Need a Service
            </Button>
            <Button
              onClick={() => onNavigate("providers")}
              size="lg"
              variant="outline"
              className="border-white text-primary hover:bg-white/10"
            >
              I'm a Service Provider
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
