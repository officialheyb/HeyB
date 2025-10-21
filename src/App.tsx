import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { LiveChat } from "./components/LiveChat";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { HowItWorks } from "./components/pages/HowItWorks";
import { ServiceCategories } from "./components/pages/ServiceCategories";
import { ForProviders } from "./components/pages/ForProviders";
import { ForClients } from "./components/pages/ForClients";
import { Blog } from "./components/pages/Blog";
import { BlogPost } from "./components/pages/BlogPost";
import { BlogLogin } from "./components/pages/BlogLogin";
import { BlogAdmin } from "./components/pages/BlogAdmin";
import { Support } from "./components/pages/Support";
import { Privacy } from "./components/pages/Privacy";
import { Toaster } from "./components/ui/sonner";

type Page = "home" | "about" | "how-it-works" | "services" | "providers" | "clients" | "blog" | "blog-post" | "blog-admin" | "blog-login" | "support" | "privacy";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isLoading, setIsLoading] = useState(true);
  const [currentBlogPostId, setCurrentBlogPostId] = useState<string | null>(null);
  const [isBlogAdminLoggedIn, setIsBlogAdminLoggedIn] = useState(false);
  const [pageHistory, setPageHistory] = useState<Array<{ page: Page; postId?: string }>>([{ page: "home" }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds loading

    return () => clearTimeout(timer);
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.page) {
        setCurrentPage(event.state.page);
        if (event.state.postId) {
          setCurrentBlogPostId(event.state.postId);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Announce page changes to screen readers
  const announcePageChange = (pageName: string) => {
    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = `Navigated to ${pageName} page`;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  const handleNavigate = (page: string, postId?: string) => {
    const newPage = page as Page;
    setCurrentPage(newPage);
    if (postId) {
      setCurrentBlogPostId(postId);
    }
    
    // Add to browser history
    const state = { page: newPage, postId };
    window.history.pushState(state, "", `#${page}${postId ? `/${postId}` : ""}`);
    
    // Add to internal history
    const newHistory = pageHistory.slice(0, historyIndex + 1);
    newHistory.push({ page: newPage, postId });
    setPageHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    // Announce to screen readers
    announcePageChange(page.replace("-", " "));
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBlogLogin = () => {
    setIsBlogAdminLoggedIn(true);
    setCurrentPage("blog-admin");
  };

  const handleBlogLogout = () => {
    setIsBlogAdminLoggedIn(false);
    setCurrentPage("blog");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "about":
        return <About />;
      case "how-it-works":
        return <HowItWorks onNavigate={handleNavigate} />;
      case "services":
        return <ServiceCategories />;
      case "providers":
        return <ForProviders onNavigate={handleNavigate} />;
      case "clients":
        return <ForClients onNavigate={handleNavigate} />;
      case "blog":
        return <Blog onNavigate={handleNavigate} />;
      case "blog-post": {
        const savedPosts = localStorage.getItem("heyb_blog_posts");
        let posts = savedPosts ? JSON.parse(savedPosts) : [];
        
        // If no posts in localStorage, use default posts
        if (posts.length === 0) {
          posts = [
            {
              id: "1",
              title: "10 Tips for Hiring the Right Service Provider in Nigeria",
              excerpt: "Learn how to identify qualified professionals, avoid scams, and get the best value for your money when hiring service providers.",
              content: "Finding the right service provider can be challenging. Here are 10 essential tips to help you make the best choice:\n\n1. Check Reviews and Ratings: Always read reviews from previous clients to gauge the quality of service.\n\n2. Verify Credentials: Ensure the provider has proper certifications and licenses for their trade.\n\n3. Get Multiple Quotes: Compare prices and services from at least 3-5 providers before making a decision.\n\n4. Ask for References: Request contact information for past clients and actually call them.\n\n5. Check Insurance: Verify that the provider has liability insurance to protect you from potential damages.\n\n6. Clear Communication: Choose someone who communicates clearly and promptly responds to your questions.\n\n7. Written Contracts: Always get agreements in writing, including scope of work, timeline, and payment terms.\n\n8. Payment Schedule: Never pay the full amount upfront. Use milestone-based payments.\n\n9. Local Expertise: Prefer providers with experience in your local area who understand regional challenges.\n\n10. Trust Your Instincts: If something feels off, it probably is. Don't ignore red flags.\n\nBy following these tips, you'll significantly increase your chances of finding a reliable, professional service provider who delivers quality work at fair prices.",
              author: "HeyB Editorial",
              date: "October 15, 2025",
              category: "Tips & Guides",
              image: "https://images.unsplash.com/photo-1535757596010-06fbdd41fd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
              featured: true,
            },
            {
              id: "2",
              title: "How to Write a Great Service Job Description",
              excerpt: "A comprehensive guide to creating job posts that attract quality service providers and get accurate quotes.",
              content: "Creating an effective job description is crucial for attracting the right service providers. Here's how to do it:\n\nBe Specific About the Work: Clearly describe what needs to be done, including all details about the scope of work.\n\nInclude Important Details: Mention location, timing, budget range, and any special requirements.\n\nAdd Photos if Possible: Visual references help providers understand the job better and provide accurate quotes.\n\nSet Clear Expectations: Specify deadlines, quality standards, and any materials or tools you expect the provider to bring.\n\nMention Your Availability: Let providers know when you're available for consultations or when the work needs to start.\n\nBe Honest About Challenges: If there are any difficulties with the job, mention them upfront to get realistic quotes.",
              author: "Sarah Johnson",
              date: "October 12, 2025",
              category: "Client Tips",
              image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
            },
            {
              id: "3",
              title: "Growing Your Service Business with HeyB",
              excerpt: "Success stories and strategies from top-rated providers who built thriving businesses on our platform.",
              content: "Many service providers have transformed their businesses using HeyB. Here are strategies from our top performers:\n\nComplete Your Profile: Providers with complete profiles get 3x more job requests. Add professional photos, certifications, and detailed service descriptions.\n\nRespond Quickly: The first provider to respond has a 60% higher chance of winning the job. Enable notifications and respond within hours.\n\nBuild Your Reputation: Every completed job is an opportunity for a great review. Go above and beyond to exceed client expectations.\n\nSpecialize and Excel: Focusing on specific services helps you become known as an expert, commanding higher rates and more trust.\n\nProfessional Communication: Clear, polite, and timely communication sets you apart. Return calls, provide updates, and be reliable.\n\nCompetitive Pricing: Research market rates and price competitively while ensuring you can deliver quality work profitably.",
              author: "Emmanuel Okafor",
              date: "October 10, 2025",
              category: "Provider Success",
              image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
            }
          ];
        }
        
        const post = posts.find((p: any) => p.id === currentBlogPostId);
        if (post) {
          return <BlogPost post={post} onBack={() => handleNavigate("blog")} />;
        }
        return <Blog onNavigate={handleNavigate} />;
      }
      case "blog-login":
        return <BlogLogin onLogin={handleBlogLogin} />;
      case "blog-admin":
        if (!isBlogAdminLoggedIn) {
          return <BlogLogin onLogin={handleBlogLogin} />;
        }
        return <BlogAdmin onLogout={handleBlogLogout} />;
      case "support":
        return <Support />;
      case "privacy":
        return <Privacy />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
      
      {currentPage !== "blog-login" && currentPage !== "blog-admin" && (
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      <main id="main-content" className="flex-1" role="main" tabIndex={-1}>
        {renderPage()}
      </main>
      {currentPage !== "blog-login" && currentPage !== "blog-admin" && (
        <>
          <Footer onNavigate={handleNavigate} />
          <LiveChat />
        </>
      )}
      <Toaster />
      {/* Hidden Blog Admin Access */}
      {currentPage === "blog" && (
        <button
          onClick={() => handleNavigate("blog-login")}
          className="fixed bottom-20 left-4 w-8 h-8 opacity-10 hover:opacity-50 transition-opacity"
          aria-label="Admin Login"
          aria-hidden="true"
        >
          🔐
        </button>
      )}
    </div>
  );
}