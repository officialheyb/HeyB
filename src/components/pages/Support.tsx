import { MessageCircle, Mail, Phone, HelpCircle, ChevronDown } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

export function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    toast.info("Sending your message...");

    try {
      // Create FormData for Web3Forms
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "00479584-edf0-450a-90fc-5dabf973418a");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", `[${formData.category}] ${formData.subject}`);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("from_name", formData.name);
      formDataToSend.append("redirect", "false");

      // Submit to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you within 24 hours."
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          category: "General Inquiry",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message", {
          description: "Please try again or contact us directly at officialheyb@gmail.com"
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please try again or contact us directly at officialheyb@gmail.com"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I create an account on HeyB?",
          a: "Click on 'Get Started' or 'Sign Up' button on the homepage. Choose whether you're a client or service provider, fill in your basic details, and verify your email address. It's that simple!",
        },
        {
          q: "Is HeyB free to use?",
          a: "Yes! Creating an account and posting jobs is completely free for clients. Providers can also sign up for free. We only charge a small service fee when a job is successfully completed.",
        },
        {
          q: "Which cities does HeyB operate in?",
          a: "HeyB currently operates in major Nigerian cities including Lagos, Abuja, Port Harcourt, Ibadan, and Kano. We're expanding to more cities and countries across Africa soon.",
        },
      ],
    },
    {
      category: "For Clients",
      questions: [
        {
          q: "How do I post a job?",
          a: "After logging in, click 'Post a Job', select your service category, describe what you need, set your budget, and submit. You'll start receiving quotes from verified providers within hours.",
        },
        {
          q: "How many quotes will I receive?",
          a: "Typically, you'll receive 3-10 quotes depending on your location and service type. Popular services in major cities often get more quotes.",
        },
        {
          q: "How do I pay for services?",
          a: "Once you accept a quote, you can pay securely through our platform using bank transfer, card, or mobile money. Payment is held securely and released to the provider once you confirm the job is complete.",
        },
        {
          q: "What if I'm not satisfied with the work?",
          a: "If you're not satisfied, contact the provider first to resolve the issue. If unresolved, contact our support team within 48 hours of job completion. We'll mediate and help find a fair resolution.",
        },
      ],
    },
    {
      category: "For Providers",
      questions: [
        {
          q: "How do I get verified?",
          a: "After creating your provider account, submit your ID, relevant certifications, and professional references. Our team reviews applications within 24-48 hours. Once verified, you can start bidding on jobs.",
        },
        {
          q: "How much does it cost to become a provider?",
          a: "There's no upfront cost to sign up as a provider. We only charge a small service fee (10-15%) when you successfully complete a job and receive payment.",
        },
        {
          q: "How do I receive payments?",
          a: "Payments are processed through our secure platform and transferred directly to your registered bank account within 2-5 business days after job completion and client approval.",
        },
        {
          q: "Can I choose which jobs to quote on?",
          a: "Absolutely! You browse available jobs in your service categories and location, and only submit quotes for jobs you're interested in and qualified for.",
        },
      ],
    },
    {
      category: "Safety & Security",
      questions: [
        {
          q: "How do you verify service providers?",
          a: "We conduct thorough background checks including ID verification, skill certification review, reference checks, and review of past work. Only qualified professionals pass our verification process.",
        },
        {
          q: "Is my payment information secure?",
          a: "Yes! We use bank-level encryption and never store your full payment details. All transactions are processed through secure, PCI-compliant payment gateways.",
        },
        {
          q: "What if something goes wrong during a job?",
          a: "Contact our support team immediately through the app or website. We provide mediation services and will work to resolve any issues fairly. In rare cases of disputes, we may withhold payment until resolution.",
        },
      ],
    },
    {
      category: "Account & Billing",
      questions: [
        {
          q: "How do I update my profile?",
          a: "Log into your account, go to Settings or Profile, and update your information. Changes to verification details may require re-verification.",
        },
        {
          q: "What are the service fees?",
          a: "For clients, posting jobs is free. For providers, we charge 10-15% of the job value as a service fee, which covers platform maintenance, payment processing, and customer support.",
        },
        {
          q: "Can I delete my account?",
          a: "Yes, you can request account deletion from your account settings. Note that this action is permanent and you'll lose all your history, reviews, and ratings.",
        },
      ],
    },
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      color: "primary",
      availability: "Mon-Sat, 8am-8pm WAT",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      action: "officialheyb@gmail.com",
      color: "secondary",
      availability: "24/7",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      action: "09133826633 / 07084517082",
      color: "accent",
      availability: "Mon-Fri, 9am-6pm WAT",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6">
            How Can We Help You?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support team
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Input
              placeholder="Search for help..."
              className="pl-12 py-6 text-lg"
            />
            <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose your preferred way to reach us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 rounded-full bg-${method.color}/10 text-${method.color} flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-['Poppins'] mb-2">{method.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
                <p className="font-medium mb-2">{method.action}</p>
                <p className="text-xs text-muted-foreground">{method.availability}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((category, catIndex) => (
              <div key={catIndex}>
                <h3 className="text-xl font-['Poppins'] mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center mr-3 text-sm">
                    {catIndex + 1}
                  </div>
                  {category.category}
                </h3>
                <Card className="overflow-hidden">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${catIndex}-${faqIndex}`}>
                        <AccordionTrigger className="px-6 hover:bg-muted/50">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-4">
              Still Need Help?
            </h2>
            <p className="text-xl text-muted-foreground">
              Send us a message and we'll get back to you soon
            </p>
          </div>

          <Card className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="Your name" 
                    className="mt-2" 
                    value={formData.name} 
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="your@email.com" 
                    className="mt-2" 
                    value={formData.email} 
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  className="w-full mt-2 px-3 py-2 border border-border rounded-md bg-background"
                  value={formData.category} 
                  onChange={handleChange}
                >
                  <option>General Inquiry</option>
                  <option>Account Issues</option>
                  <option>Payment Problem</option>
                  <option>Technical Support</option>
                  <option>Report a Provider</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject"
                  placeholder="Brief description" 
                  className="mt-2" 
                  value={formData.subject} 
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your question or issue..."
                  className="mt-2 min-h-[150px]"
                  value={formData.message} 
                  onChange={handleChange}
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-['Poppins'] mb-2">Visit Our Blog</h3>
              <p className="text-white/80 mb-4">Tips, guides, and industry insights</p>
              <Button variant="outline" className="border-white text-white hover:bg-dark/10">
                Read Blog
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-['Poppins'] mb-2">How It Works</h3>
              <p className="text-white/80 mb-4">Learn about our platform</p>
              <Button variant="outline" className="border-white text-white hover:bg-primary/10">
                Learn More
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-['Poppins'] mb-2">Safety Center</h3>
              <p className="text-white/80 mb-4">Stay safe on HeyB</p>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Safety Tips
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}