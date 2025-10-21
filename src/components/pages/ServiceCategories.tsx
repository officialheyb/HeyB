import { Wrench, Car, Sparkles, Laptop, Briefcase, Home, Scissors, Paintbrush, Zap, Droplet, Camera, Music, ChefHat, Dumbbell, GraduationCap } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export function ServiceCategories() {
  const categories = [
    {
      icon: Home,
      name: "Home Maintenance",
      description: "Plumbing, electrical, carpentry, and general repairs",
      services: ["Plumbing", "Electrical Work", "Carpentry", "Painting", "Roofing", "HVAC"],
      gradient: "from-purple-500 to-purple-700",
    },
    {
      icon: Car,
      name: "Auto Services",
      description: "Car repairs, maintenance, and detailing services",
      services: ["Mechanic", "Auto Detailing", "Tire Services", "Oil Change", "Body Work", "Diagnostics"],
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Sparkles,
      name: "Beauty & Wellness",
      description: "Hair, makeup, spa, and personal care services",
      services: ["Hair Styling", "Makeup", "Manicure/Pedicure", "Spa Treatments", "Massage", "Barbering"],
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Laptop,
      name: "Tech Support",
      description: "Computer repair, software, and IT services",
      services: ["Computer Repair", "Software Installation", "Network Setup", "Data Recovery", "Tech Support", "Web Development"],
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: Briefcase,
      name: "Professional Services",
      description: "Consulting, legal, accounting, and business services",
      services: ["Legal", "Accounting", "Consulting", "Marketing", "HR Services", "Business Planning"],
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Zap,
      name: "Appliance Repair",
      description: "Fix and maintain household appliances",
      services: ["Refrigerator Repair", "Washing Machine", "Microwave", "AC Repair", "Generator", "Small Appliances"],
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      icon: Droplet,
      name: "Cleaning Services",
      description: "Home and office cleaning solutions",
      services: ["House Cleaning", "Office Cleaning", "Deep Cleaning", "Laundry", "Fumigation", "Carpet Cleaning"],
      gradient: "from-teal-500 to-cyan-600",
    },
    {
      icon: Camera,
      name: "Creative Services",
      description: "Design, photography, and creative work",
      services: ["Graphic Design", "Photography", "Videography", "Content Writing", "Animation", "Branding"],
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: Music,
      name: "Event Services",
      description: "Planning and executing memorable events",
      services: ["Event Planning", "Catering", "DJ Services", "Decoration", "MC Services", "Photography"],
      gradient: "from-violet-500 to-fuchsia-600",
    },
    {
      icon: GraduationCap,
      name: "Education & Tutoring",
      description: "Academic support and skill development",
      services: ["Private Tutoring", "Music Lessons", "Language Classes", "Exam Prep", "Skills Training", "Coaching"],
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: Dumbbell,
      name: "Fitness & Health",
      description: "Personal training and wellness services",
      services: ["Personal Training", "Yoga", "Nutrition Coaching", "Physiotherapy", "Sports Coaching", "Wellness"],
      gradient: "from-lime-500 to-green-600",
    },
    {
      icon: ChefHat,
      name: "Food Services",
      description: "Catering and food preparation",
      services: ["Catering", "Personal Chef", "Baking", "Meal Prep", "Food Delivery", "Event Catering"],
      gradient: "from-red-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-24 relative overflow-hidden">
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold font-['Poppins'] mb-8 text-primary">
            Service Categories
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our wide range of services. From home maintenance to professional consulting, find the perfect service provider for your needs.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 relative overflow-hidden">
        <div className="floating-shape floating-shape-3"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-2 border-transparent hover:border-primary/30 bg-white/80 backdrop-blur-sm">
                <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                  <category.icon className="w-24 h-24 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-['Poppins'] mb-3 group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{category.description}</p>
                  <div className="space-y-2 mb-6">
                    <p className="font-medium text-sm">Popular Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.services.slice(0, 4).map((service, idx) => (
                        <span key={idx} className="px-3 py-1 bg-muted rounded-full text-xs">
                          {service}
                        </span>
                      ))}
                      {category.services.length > 4 && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          +{category.services.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                    Find Providers
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-secondary to-accent text-white relative overflow-hidden animate-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-8">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
            We're constantly expanding our service categories. Get in touch and let us know what you need!
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-10 py-7 shadow-2xl hover:scale-105 transition-transform">
            Contact Support
          </Button>
        </div>
      </section>
    </div>
  );
}
