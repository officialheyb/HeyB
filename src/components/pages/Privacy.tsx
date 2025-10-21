import { Shield, Lock, Eye, FileText, Users, AlertCircle } from "lucide-react";
import { Card } from "../ui/card";

export function Privacy() {
  const sections = [
    {
      icon: FileText,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you create an account, we collect your name, email address, phone number, and location. Service providers also provide professional credentials and identification documents for verification purposes.",
        },
        {
          subtitle: "Usage Information",
          text: "We collect information about how you use HeyB, including job posts, quotes, messages, reviews, and transaction history. This helps us improve our services and provide better matches.",
        },
        {
          subtitle: "Device Information",
          text: "We may collect information about the devices you use to access HeyB, including IP address, browser type, and operating system.",
        },
      ],
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Provide Our Services",
          text: "We use your information to connect clients with service providers, process payments, facilitate communication, and manage accounts.",
        },
        {
          subtitle: "Improve Platform",
          text: "We analyze usage patterns to enhance user experience, develop new features, and optimize our matching algorithms.",
        },
        {
          subtitle: "Communication",
          text: "We send you service-related notifications, updates about your jobs or quotes, and marketing communications (which you can opt out of at any time).",
        },
        {
          subtitle: "Safety & Security",
          text: "We use your information to verify identities, prevent fraud, enforce our terms of service, and maintain a safe marketplace.",
        },
      ],
    },
    {
      icon: Eye,
      title: "Information Sharing",
      content: [
        {
          subtitle: "With Service Providers/Clients",
          text: "When you post a job or submit a quote, relevant information is shared with the other party to facilitate the transaction. We never share contact details until both parties agree to work together.",
        },
        {
          subtitle: "Service Partners",
          text: "We work with trusted third-party service providers for payment processing, data analytics, and customer support. These partners only access information necessary to perform their services.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information when required by law, to protect our rights, or in response to valid legal requests from authorities.",
        },
        {
          subtitle: "Business Transfers",
          text: "If HeyB is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Data Security",
      content: [
        {
          subtitle: "Protection Measures",
          text: "We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information.",
        },
        {
          subtitle: "Payment Security",
          text: "All payment transactions are processed through PCI-compliant payment gateways. We never store complete payment card information on our servers.",
        },
        {
          subtitle: "Access Controls",
          text: "Access to personal information is restricted to authorized employees who need it to perform their jobs. All employees are bound by confidentiality obligations.",
        },
      ],
    },
    {
      icon: Users,
      title: "Your Rights & Choices",
      content: [
        {
          subtitle: "Access & Update",
          text: "You can access and update your personal information at any time through your account settings. You have the right to request a copy of all data we hold about you.",
        },
        {
          subtitle: "Delete Account",
          text: "You can request deletion of your account and associated data at any time. Note that some information may be retained for legal or business purposes.",
        },
        {
          subtitle: "Marketing Opt-Out",
          text: "You can unsubscribe from marketing emails at any time by clicking the unsubscribe link in our emails or updating your communication preferences.",
        },
        {
          subtitle: "Data Portability",
          text: "You have the right to request a copy of your data in a portable format to transfer to another service.",
        },
      ],
    },
    {
      icon: AlertCircle,
      title: "Important Information",
      content: [
        {
          subtitle: "Children's Privacy",
          text: "HeyB is not intended for use by individuals under 18 years of age. We do not knowingly collect information from children.",
        },
        {
          subtitle: "Third-Party Links",
          text: "Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.",
        },
        {
          subtitle: "Changes to This Policy",
          text: "We may update this privacy policy from time to time. We will notify you of significant changes via email or through the platform.",
        },
        {
          subtitle: "Data Retention",
          text: "We retain your information for as long as your account is active or as needed to provide services. We may retain certain information for legal compliance even after account deletion.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center mr-4">
                <Shield className="w-6 h-6" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-['Poppins']">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-4">
              Your privacy and data security are our top priorities. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-muted-foreground">
              Last Updated: October 19, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/5 border-l-4 border-l-primary">
            <h2 className="text-2xl font-['Poppins'] mb-4">Our Commitment to You</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At HeyB, we understand that trust is the foundation of our marketplace. We are committed to being transparent about how we collect, use, and protect your personal information.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy applies to all users of the HeyB platform, including both clients seeking services and service providers offering their skills. By using HeyB, you agree to the terms outlined in this policy.
            </p>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} id={section.title.toLowerCase().replace(/\s+/g, '-')}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent text-white flex items-center justify-center mr-4">
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-['Poppins']">{section.title}</h2>
                </div>

                <div className="space-y-6 ml-16">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-lg font-['Poppins'] mb-2">{item.subtitle}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-['Poppins'] mb-4">Questions About Your Privacy?</h2>
                <p className="text-muted-foreground mb-6">
                  If you have any questions about this Privacy Policy, how we handle your data, or want to exercise your privacy rights, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> privacy@heyb.africa</p>
                  <p><strong>Phone:</strong> +234 800 000 0000</p>
                  <p><strong>Address:</strong> HeyB Privacy Team, Lagos, Nigeria</p>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  We will respond to your inquiry within 30 days.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Terms of Service */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-['Poppins'] mb-4">Terms of Service</h2>
            <p className="text-muted-foreground mb-8">
              For information about our Terms of Service and user agreements, please refer to our dedicated Terms page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                View Terms of Service
              </button>
              <button className="px-6 py-3 rounded-lg border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="p-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                <section.icon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm">{section.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
