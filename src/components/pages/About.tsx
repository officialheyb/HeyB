import { Target, Eye, Heart, Award, Users, Globe, Code, Lightbulb, TrendingUp, Shield } from "lucide-react";
import { Card } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import amb1 from "../../assets/amb1.jpg";
import amb2 from "../../assets/amb2.jpg";
import amb3 from "../../assets/amb3.jpg";
import amb4 from "../../assets/amb4.jpg";
import amb5 from "../../assets/amb5.jpg";
import amb6 from "../../assets/amb6.jpg";
import amb7 from "../../assets/amb7.jpg";

export function About() {
  const values = [
    {
      icon: Heart,
      title: "Trust First",
      description: "We verify every service provider to ensure you work with skilled, reliable professionals.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by Africans, for Africans. We understand the unique challenges and opportunities in our markets.",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We maintain high standards through ratings, reviews, and continuous provider vetting.",
    },
    {
      icon: Globe,
      title: "Pan-African Vision",
      description: "Starting in Nigeria, expanding across Africa to connect millions with trusted services.",
    },
  ];

  const team = [
    {
      role: "Founder & CEO",
      description: "Passionate about solving Africa's service marketplace challenges through technology.",
      icon: Lightbulb,
      color: "from-purple-500 to-purple-700",
    },
    {
      role: "Head of Operations",
      description: "Ensuring quality and trust in every transaction across our platform.",
      icon: Shield,
      color: "from-orange-500 to-red-500",
    },
    {
      role: "Lead Developer",
      description: "Building scalable technology to power Africa's service economy.",
      icon: Code,
      color: "from-blue-500 to-purple-600",
    },
    {
      role: "Chief Marketing Officer",
      description: "Connecting providers with customers across Nigeria and beyond.",
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-500",
    },
    {
      role: "Customer Success Manager",
      description: "Dedicated to ensuring excellent experiences for all users on the platform.",
      icon: Heart,
      color: "from-pink-500 to-rose-600",
    },
    {
      role: "Head of Provider Relations",
      description: "Working closely with service providers to help them succeed and grow.",
      icon: Users,
      color: "from-green-500 to-emerald-600",
    },
    {
      role: "Product Manager",
      description: "Designing features that make finding and hiring services effortless.",
      icon: Target,
      color: "from-indigo-500 to-blue-600",
    },
    {
      role: "Quality Assurance Lead",
      description: "Maintaining high standards through rigorous verification and monitoring.",
      icon: Award,
      color: "from-teal-500 to-cyan-600",
    },
    {
      role: "Community Manager",
      description: "Building trust and engagement within the HeyB community across Africa.",
      icon: Globe,
      color: "from-violet-500 to-fuchsia-600",
    },
  ];

  const ambassadors = [
    {
      name: "The Taofeek Alata",
      post: "Regional Ambassador - Ilorin",
      location: "Kwara, Ilorin, Nigeria",
      image: amb1,
    },
    {
      name: "Olayimika Priscilla Olamide",
      post: "Regional Ambassador - Ilorin",
      location: "Kwara, Ilorin, Nigeria",
      image: amb2,
    },
    {
      name: "Yisa-Apata Taofeek",
      post: "Regional Ambassador - Ilorin",
      location: "Kwara, Ilorin, Nigeria",
      image: amb3,
    },
    {
      name: "Lawal Aakeefah",
      post: "Regional Ambassador - Ilorin",
      location: "Kwara, Ilorin, Nigeria",
      image: amb4,
    },
    {
      name: "Ambassador Kehinde Fadhlullah Abiodun",
      post: "Regional Ambassador - Ilorin",
      location: "Kwara, Ilorin, Nigeria",
      image: amb5,
    },
    {
      name: "Comrade Cole Joel  Temitope",
      post: "Regional Ambassador - Ogun",
      location: "FUNAAB, Ogun State, Nigeria",
      image: amb6,
    },
    {
      name: "Olamide Israel Olaoluwa",
      post: "Regional Ambassador - Ogun",
      location: "FUNAAB, Ogun State, Nigeria",
      image: amb7,
    },
  ];

  const autoplayPluginTeam = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const autoplayPluginAmbassadors = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-24 relative overflow-hidden">
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold font-['Poppins'] mb-8 text-primary">
              Building Trust in Africa's Service Marketplace
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              HeyB is more than a platform—it's a movement to transform how Africans find and hire service professionals. We're creating transparency, building trust, and empowering local talent.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <Card className="p-10 border-l-4 border-l-primary bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center mr-5 shadow-lg">
                  <Target className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-['Poppins']">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To build trust and transparency in the service marketplace by connecting buyers with verified, skilled providers across various categories—from home maintenance and auto repair to beauty, tech, and professional services.
              </p>
            </Card>

            <Card className="p-10 border-l-4 border-l-secondary bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 text-white flex items-center justify-center mr-5 shadow-lg">
                  <Eye className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-['Poppins']">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To become Africa's most trusted service marketplace, empowering millions of service professionals to build sustainable businesses while making quality services accessible to everyone, everywhere.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-24 bg-gradient-to-br from-accent/5 to-primary/5 relative overflow-hidden">
        <div className="floating-shape floating-shape-1"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-8 text-primary">
                How HeyB Started
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  HeyB was born from a simple yet frustrating experience: the difficulty of finding trustworthy service providers in Nigeria. Our founders spent weeks trying to find a reliable plumber, only to encounter unprofessional service, inflated prices, and broken promises.
                </p>
                <p>
                  They realized this wasn't just their problem—millions of people across Africa face the same challenge every day. Meanwhile, skilled professionals struggle to find consistent work and build their reputation.
                </p>
                <p>
                  That's when the idea for HeyB was born: a platform that would bridge this gap, verify providers, ensure quality, and create trust in the service marketplace. Today, we're proud to serve thousands of users and providers across Nigeria, with plans to expand throughout Africa.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary via-secondary to-accent p-12 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <Shield className="w-16 h-16 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <TrendingUp className="w-16 h-16 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <Lightbulb className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-accent via-primary to-secondary rounded-3xl -z-10 opacity-50 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 relative overflow-hidden">
        <div className="floating-shape floating-shape-3"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6 text-primary">
              Our Core Values
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/30 bg-white/80 backdrop-blur-sm group hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-white flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-['Poppins'] mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-secondary to-accent text-white relative overflow-hidden animate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Growing together, one job at a time
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: "50,000+", label: "Verified Providers" },
              { value: "200,000+", label: "Jobs Completed" },
              { value: "₦2.5B+", label: "Value Transacted" },
              { value: "15+", label: "Service Categories" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-6xl font-bold font-['Poppins'] mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-white/80 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="floating-shape floating-shape-2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6 text-primary">
              Meet the Team
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Dedicated professionals working to transform Africa's service economy
            </p>
          </div>

          {/* Carousel for all screens */}
          <div className="max-w-5xl mx-auto">
            <Carousel
              plugins={[
                autoplayPluginTeam.current,
              ]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {team.map((member, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="p-8 text-center hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/30 bg-white/80 backdrop-blur-sm group h-full">
                      <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        <member.icon className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-xl font-['Poppins'] mb-3">{member.role}</h3>
                      <p className="text-muted-foreground leading-relaxed">{member.description}</p>
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

      {/* Ambassadors Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="floating-shape floating-shape-3"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6 text-primary">
              Meet Our Ambassadors
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Leading the charge in regional growth and engagement
            </p>
          </div>

          {/* Carousel for all screens */}
          <div className="max-w-5xl mx-auto">
            <Carousel
              plugins={[
                autoplayPluginAmbassadors.current,
              ]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {ambassadors.map((ambassador, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="p-8 text-center hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/30 bg-white/80 backdrop-blur-sm group h-full">
                      <div className="w-full aspect-square mx-auto mb-6 overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary via-secondary to-accent p-1 rounded-xl">
                        <img 
                          src={ambassador.image} 
                          alt={ambassador.name} 
                          className="w-full h-full object-cover rounded-lg bg-white" 
                        />
                      </div>
                      <h3 className="text-xl font-['Poppins'] mb-2">{ambassador.name}</h3>
                      <p className="text-muted-foreground mb-1">{ambassador.post}</p>
                      <p className="text-sm text-muted-foreground/80">{ambassador.location}</p>
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
    </div>
  );
}