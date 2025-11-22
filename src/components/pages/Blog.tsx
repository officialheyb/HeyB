import { Calendar, User, ArrowRight, Tag, Search } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  featured?: boolean;
}

interface BlogProps {
  onNavigate: (page: string, postId?: string) => void;
}

export function Blog({ onNavigate }: BlogProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = localStorage.getItem("heyb_blog_posts");
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    } else {
      // Initialize with default posts if none exist
      setBlogPosts(defaultPosts);
    }
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletterEmail) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    toast.info("Subscribing...");

    try {
      const formData = new FormData();
      formData.append("access_key", "00479584-edf0-450a-90fc-5dabf973418a");
      formData.append("subject", "New Newsletter Subscription");
      formData.append("email", newsletterEmail);
      formData.append("message", `New newsletter subscription from: ${newsletterEmail}`);
      formData.append("from_name", "HeyB Newsletter");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Successfully subscribed!", {
          description: "Thank you for subscribing to our newsletter!"
        });
        setNewsletterEmail("");
      } else {
        toast.error("Subscription failed", {
          description: "Please try again or contact us at officialheyb@gmail.com"
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please try again later"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const featuredPost = blogPosts.find(p => p.featured) || {
    id: "1",
    title: "10 Tips for Hiring the Right Service Provider in Nigeria",
    excerpt: "Learn how to identify qualified professionals, avoid scams, and get the best value for your money when hiring service providers.",
    content: "Finding the right service provider can be challenging. Here are 10 essential tips...",
    author: "HeyB Editorial",
    date: "October 15, 2025",
    category: "Tips & Guides",
    image: "https://images.unsplash.com/photo-1535757596010-06fbdd41fd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwc2VydmljZSUyMHdvcmtlcnxlbnwxfHx8fDE3NjA4Nzk1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
  };

  const defaultPosts: BlogPost[] = [
    {
      id: "2",
      title: "How to Write a Great Service Job Description",
      excerpt: "A comprehensive guide to creating job posts that attract quality service providers and get accurate quotes.",
      content: "Creating an effective job description is crucial for attracting the right service providers...",
      author: "Sarah Johnson",
      date: "October 12, 2025",
      category: "Client Tips",
      image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwc2VydmljZXxlbnwxfHx8fDE3NjA4Nzk1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "3",
      title: "Growing Your Service Business with HeyB",
      excerpt: "Success stories and strategies from top-rated providers who built thriving businesses on our platform.",
      content: "Many service providers have transformed their businesses using HeyB...",
      author: "Emmanuel Okafor",
      date: "October 10, 2025",
      category: "Provider Success",
      image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5keW1hbiUyMHJlcGFpciUyMHRvb2xzfGVufDF8fHx8MTc2MDg3OTUyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "4",
      title: "Safety First: Protecting Yourself When Hiring Services",
      excerpt: "Essential safety tips for both clients and providers to ensure secure, professional interactions.",
      content: "Safety is paramount when hiring or providing services...",
      author: "HeyB Safety Team",
      date: "October 8, 2025",
      category: "Safety",
      image: "https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3VwcG9ydCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjA4NDgwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "5",
      title: "Understanding Service Pricing in Nigeria",
      excerpt: "A breakdown of average costs for common services across major Nigerian cities to help you budget better.",
      content: "Service pricing varies significantly across Nigeria...",
      author: "Price Insights Team",
      date: "October 5, 2025",
      category: "Industry Insights",
      image: "https://images.unsplash.com/photo-1653130029149-9109b115ab9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjA3ODg5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "6",
      title: "The Rise of the Gig Economy in Africa",
      excerpt: "How digital platforms like HeyB are transforming employment and entrepreneurship across the continent.",
      content: "The gig economy is revolutionizing how Africans work and earn...",
      author: "Market Research",
      date: "October 3, 2025",
      category: "Industry Insights",
      image: "https://images.unsplash.com/photo-1535757596010-06fbdd41fd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwc2VydmljZSUyMHdvcmtlcnxlbnwxfHx8fDE3NjA4Nzk1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "7",
      title: "5 Common Home Maintenance Mistakes to Avoid",
      excerpt: "Learn from experts about the most frequent home repair mistakes and how to prevent costly damage.",
      content: "Home maintenance mistakes can be costly. Here are the top 5 to avoid...",
      author: "Maintenance Pro",
      date: "September 30, 2025",
      category: "Tips & Guides",
      image: "https://images.unsplash.com/photo-1741827866663-6ad8ec20480c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvJTIwbWVjaGFuaWMlMjByZXBhaXJ8ZW58MXx8fHwxNzYwODc5NTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const allPosts = blogPosts.length > 0 ? blogPosts : defaultPosts;
  
  // Filter posts
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory && !post.featured;
  });

  const categories = [
    { name: "All", count: allPosts.length, color: "primary" },
    { name: "Tips & Guides", count: allPosts.filter(p => p.category === "Tips & Guides").length, color: "primary" },
    { name: "Provider Success", count: allPosts.filter(p => p.category === "Provider Success").length, color: "secondary" },
    { name: "Safety", count: allPosts.filter(p => p.category === "Safety").length, color: "accent" },
    { name: "Industry Insights", count: allPosts.filter(p => p.category === "Industry Insights").length, color: "primary" },
    { name: "Client Tips", count: allPosts.filter(p => p.category === "Client Tips").length, color: "secondary" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6">
            HeyB Blog & Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tips, guides, and insights to help you make the most of the service marketplace
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <ImageWithFallback
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  Featured
                </Badge>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-primary/10 text-primary border-0">
                  {featuredPost.category}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold font-['Poppins'] mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {featuredPost.date}
                  </div>
                </div>
                <Button 
                  className="w-fit bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  onClick={() => onNavigate("blog-post", featuredPost.id)}
                >
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles by title, author, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === category.name
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "bg-white border border-border hover:border-primary"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-['Poppins']">
                  {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
                </h2>
                <span className="text-muted-foreground">
                  {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
                </span>
              </div>
              {filteredPosts.length === 0 ? (
                <Card className="p-12 text-center">
                  <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-['Poppins'] mb-2">No articles found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-3 bg-primary/10 text-primary border-0 text-xs">
                        {post.category}
                      </Badge>
                      <h3 className="text-lg font-['Poppins'] mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full mt-4 text-primary hover:text-primary"
                        onClick={() => onNavigate("blog-post", post.id)}
                      >
                        Read More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <Card className="p-6">
                <h3 className="text-lg font-['Poppins'] mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-primary" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
                        selectedCategory === category.name 
                          ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-l-4 border-primary' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      <span className="text-sm">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Newsletter */}
              <Card className="p-6 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
                <h3 className="text-lg font-['Poppins'] mb-2">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest tips, guides, and industry insights delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-md border border-border bg-white"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
              </Card>

              {/* Popular Posts */}
              <Card className="p-6">
                <h3 className="text-lg font-['Poppins'] mb-4">Popular Posts</h3>
                <div className="space-y-4">
                  {allPosts.slice(0, 3).map((post, index) => (
                    <div 
                      key={index} 
                      className="border-b border-border last:border-0 pb-4 last:pb-0 cursor-pointer"
                      onClick={() => onNavigate("blog-post", post.id)}
                    >
                      <h4 className="text-sm font-['Poppins'] mb-1 line-clamp-2 hover:text-primary">
                        {post.title}
                      </h4>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] mb-6">
            Have a Topic Suggestion?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            We'd love to hear what you want to learn about!
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => {
              const phoneNumber = "2349133826633";
              const message = "Hey! I would like to submit my idea";
              window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
            }}
          >
            Submit Your Idea
          </Button>
        </div>
      </section>
    </div>
  );
}
