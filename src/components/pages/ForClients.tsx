import { Search, Users, Shield, DollarSign, Clock, Star, CheckCircle, FileText, MessageCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface ForClientsProps {
  onNavigate: (page: string) => void;
}

export function ForClients({ onNavigate }: ForClientsProps) {
  const benefits = [
    {
      icon: Users,
      title: "Access Verified Professionals",
      description: "All our service providers are thoroughly vetted, background-checked, and skills-verified.",
      color: "primary",
    },
    {
      icon: DollarSign,
      title: "Compare Quotes",
      description: "Get multiple competitive quotes and choose the best option for your budget and needs.",
      color: "secondary",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Post once and let providers come to you. No more endless searching and calling around.",
      color: "accent",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Pay securely through our platform. Release payment only when you're fully satisfied.",
      color: "primary",
    },
    {
      icon: Star,
      title: "Quality Guarantee",
      description: "Read verified reviews and ratings to ensure you hire the best professional for your job.",
      color: "secondary",
    },
    {
      icon: MessageCircle,
      title: "Easy Communication",
      description: "Message providers directly, discuss details, and manage everything in one place.",
      color: "accent",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Post Your Job",
      description: "Describe what you need, your budget, and when you need it done.",
      icon: FileText,
    },
    {
      step: "2",
      title: "Receive Quotes",
      description: "Get multiple quotes from verified providers within hours.",
      icon: Users,
    },
    {
      step: "3",
      title: "Compare & Choose",
      description: "Review profiles, ratings, and prices to select the perfect provider.",
      icon: Search,
    },
    {
      step: "4",
      title: "Get It Done",
      description: "The provider completes your job, you review, and release payment.",
      icon: CheckCircle,
    },
  ];

  const tips = [
    {
      title: "Be Specific",
      description: "Provide detailed descriptions of what you need. Include photos if helpful.",
    },
    {
      title: "Set a Realistic Budget",
      description: "Research average costs for your service to set a fair budget range.",
    },
    {
      title: "Check Reviews",
      description: "Read provider reviews and ratings carefully before making your decision.",
    },
    {
      title: "Communicate Clearly",
      description: "Ask questions and confirm all details before hiring to avoid misunderstandings.",
    },
    {
      title: "Provide Feedback",
      description: "Leave honest reviews to help other clients and reward great service.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6">
              Find Trusted Service Providers in Minutes
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Post your job, compare quotes from verified professionals, and get it done right. It's that simple.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Post Your First Job Free
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-4">
              Why Clients Love HeyB
            </h2>
            <p className="text-xl text-muted-foreground">
              The smarter way to hire service professionals
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

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Four simple steps to getting your job done
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold font-['Poppins']">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-lg bg-white shadow-md flex items-center justify-center mx-auto mb-4 -mt-10 relative z-10">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-['Poppins'] mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => onNavigate("how-it-works")} size="lg" variant="outline">
              Learn More About The Process
            </Button>
          </div>
        </div>
      </section>

      {/* Job Post Example */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-6">
                Post a Job in Under 2 Minutes
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our simple job posting form makes it easy to describe what you need. The more details you provide, the better quotes you'll receive.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-['Poppins'] mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    What Gets Included:
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>• Service category selection</li>
                    <li>• Detailed job description</li>
                    <li>• Your budget range</li>
                    <li>• Preferred timeline</li>
                    <li>• Photos (optional but recommended)</li>
                    <li>• Your location</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-['Poppins'] mb-3 flex items-center">
                    <Shield className="w-5 h-5 text-secondary mr-2" />
                    Your Information is Safe:
                  </h3>
                  <p className="text-muted-foreground ml-7">
                    We never share your contact details with providers until you choose to hire them. All communication happens through our secure platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Sample Form */}
            <Card className="p-8 shadow-xl">
              <h3 className="text-xl font-['Poppins'] mb-6">Sample Job Post</h3>
              <div className="space-y-4">
                <div>
                  <Label>Service Needed</Label>
                  <Input placeholder="e.g., Plumbing - Leaking Tap Repair" className="mt-1" disabled />
                </div>
                <div>
                  <Label>Job Description</Label>
                  <Textarea
                    placeholder="Describe what needs to be done..."
                    className="mt-1 h-24"
                    disabled
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Budget Range</Label>
                    <Input placeholder="₦5,000 - ₦10,000" className="mt-1" disabled />
                  </div>
                  <div>
                    <Label>Timeline</Label>
                    <Input placeholder="This week" className="mt-1" disabled />
                  </div>
                </div>
                <div>
                  <Label>Location</Label>
                  <Input placeholder="Your area" className="mt-1" disabled />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  Post Job & Get Quotes
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-4">
              Tips for Getting the Best Results
            </h2>
            <p className="text-xl text-muted-foreground">
              Make the most of your HeyB experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tips.map((tip, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center mb-3 text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="font-['Poppins'] mb-2">{tip.title}</h3>
                <p className="text-muted-foreground text-sm">{tip.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "200K+", label: "Jobs Posted" },
              { value: "2 hours", label: "Avg. Response Time" },
              { value: "4.8/5", label: "Client Satisfaction" },
              { value: "95%", label: "Job Completion Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold font-['Poppins'] text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-['Poppins'] mb-6">
            Ready to Get Your Job Done?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Post your job for free and start receiving quotes in minutes
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Post a Job Now
          </Button>
          <p className="mt-4 text-white/80 text-sm">Free to post. No credit card required.</p>
        </div>
      </section>
    </div>
  );
}
