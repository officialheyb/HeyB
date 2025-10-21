import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner@2.0.3";
import { markdownToHtml } from "../utils/markdown";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

interface BlogPostProps {
  post: BlogPost;
  onBack: () => void;
}

export function BlogPost({ post, onBack }: BlogPostProps) {
  const sharePost = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      default:
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        return;
    }
    
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          <Badge className="mb-4 bg-primary/10 text-primary border-0">
            {post.category}
          </Badge>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-['Poppins'] mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Share */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24">
                <Card className="p-6">
                  <h3 className="font-['Poppins'] mb-4 flex items-center">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Article
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => sharePost("twitter")}
                    >
                      <FaXTwitter className="w-4 h-4 mr-2" />
                      Share on X
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => sharePost("facebook")}
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Share on Facebook
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => sharePost("copy")}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground mb-8">
                  {post.excerpt}
                </p>
                
                <div 
                  className="prose prose-lg max-w-none text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
                />
              </div>

              {/* Author Card */}
              <Card className="mt-12 p-6 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-['Poppins'] mb-1">Written by {post.author}</h4>
                    <p className="text-sm text-muted-foreground">
                      Contributing writer at HeyB, passionate about helping people find and hire quality service providers.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Related CTA */}
              <div className="mt-12 p-8 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg text-white text-center">
                <h3 className="text-2xl font-['Poppins'] mb-4">
                  Ready to Find Your Perfect Service Provider?
                </h3>
                <p className="mb-6 text-white/90">
                  Join thousands of satisfied customers who found trusted professionals on HeyB
                </p>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Get Started Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
