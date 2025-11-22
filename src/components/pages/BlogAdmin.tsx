import { useState, useEffect, useRef } from "react";
import {
  Plus, Edit, Trash2, LogOut, Image as ImageIcon, Menu, X,
  Bold, Italic, Underline, List, ListOrdered, Heading2, Type,
  Quote, Code, Undo, Redo, Strikethrough, Link, Minus, Eye
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card } from "../ui/card";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
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
  featured?: boolean;
}

interface BlogAdminProps {
  onLogout: () => void;
}

export function BlogAdmin({ onLogout }: BlogAdminProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<"create" | "list">("create");
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    image: "",
    featured: false,
  });
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const contentEditorRef = useRef<HTMLTextAreaElement>(null);
  const autosaveTimeoutRef = useRef<number | null>(null); // ✅ browser-friendly
  const isUndoRedoRef = useRef(false);

  // Load posts and draft from localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem("heyb_blog_posts");
    if (savedPosts) setPosts(JSON.parse(savedPosts));

    const savedDraft = localStorage.getItem("heyb_blog_draft");
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
      toast.info("Draft restored from autosave");
    }
  }, []);

  // Autosave
  useEffect(() => {
    if (!editingPost && (formData.title || formData.content || formData.excerpt)) {
      if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
      autosaveTimeoutRef.current = window.setTimeout(() => {
        localStorage.setItem("heyb_blog_draft", JSON.stringify(formData));
      }, 2000);
    }

    return () => {
      if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
    };
  }, [formData, editingPost]);

  // Undo/Redo history
  useEffect(() => {
    if (!isUndoRedoRef.current && formData.content !== (history[historyIndex] || "")) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(formData.content);

      if (newHistory.length > 50) newHistory.shift();
      setHistoryIndex(prev => prev + 1);
      setHistory(newHistory);
    }
    isUndoRedoRef.current = false;
  }, [formData.content]);

  const savePosts = (newPosts: BlogPost[]) => {
    localStorage.setItem("heyb_blog_posts", JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newPost: BlogPost = {
      id: editingPost?.id || Date.now().toString(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      author: formData.author || "HeyB Editorial",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric"
      }),
      category: formData.category || "General",
      image: formData.image || "https://images.unsplash.com/photo-1535757596010-06fbdd41fd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
      featured: formData.featured,
    };

    if (editingPost) {
      const updatedPosts = posts.map(p => p.id === editingPost.id ? newPost : p);
      savePosts(updatedPosts);
      toast.success("Post updated successfully!");
    } else {
      savePosts([newPost, ...posts]);
      toast.success("Post created successfully!");
      localStorage.removeItem("heyb_blog_draft");
    }

    resetForm();
    setIsEditing(false);
    setActiveView("list");
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      image: post.image,
      featured: post.featured || false,
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      savePosts(posts.filter(p => p.id !== id));
      toast.success("Post deleted successfully!");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      image: "",
      featured: false,
    });
    setEditingPost(null);
    setHistory([]);
    setHistoryIndex(-1);
    localStorage.removeItem("heyb_blog_draft");
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      isUndoRedoRef.current = true;
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setFormData(prev => ({ ...prev, content: history[newIndex] }));
      toast.success("Undo");
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isUndoRedoRef.current = true;
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setFormData(prev => ({ ...prev, content: history[newIndex] }));
      toast.success("Redo");
    }
  };

  const insertFormatting = (prefix: string, suffix = "", placeholder = "") => {
    const textarea = contentEditorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const beforeText = formData.content.substring(0, start);
    const afterText = formData.content.substring(end);

    const textToInsert = selectedText || placeholder;
    const newText = beforeText + prefix + textToInsert + suffix + afterText;
    setFormData({ ...formData, content: newText });

    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        const newCursorPos = start + prefix.length + selectedText.length + suffix.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      } else {
        const selectionStart = start + prefix.length;
        const selectionEnd = selectionStart + textToInsert.length;
        textarea.setSelectionRange(selectionStart, selectionEnd);
      }
    }, 0);
  };

  const insertAtCursor = (text: string, selectText = "") => {
    const textarea = contentEditorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const beforeText = formData.content.substring(0, start);
    const afterText = formData.content.substring(end);

    const newText = beforeText + text + afterText;
    setFormData({ ...formData, content: newText });

    setTimeout(() => {
      textarea.focus();
      if (selectText) {
        const selectStart = beforeText.length + text.indexOf(selectText);
        const selectEnd = selectStart + selectText.length;
        textarea.setSelectionRange(selectStart, selectEnd);
      } else {
        const newCursorPos = start + text.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) insertFormatting("[", `](${url})`, "link text");
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (!url) return;
    const alt = prompt("Enter image description (alt text)") || "image";
    insertAtCursor(`![${alt}](${url})`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'z':
          e.preventDefault();
          if (e.shiftKey) handleRedo();
          else handleUndo();
          break;
        case 'y':
          e.preventDefault();
          handleRedo();
          break;
        case 'b':
          e.preventDefault();
          insertFormatting("**", "**", "bold text");
          break;
        case 'i':
          e.preventDefault();
          insertFormatting("*", "*", "italic text");
          break;
        case 'u':
          e.preventDefault();
          insertFormatting("<u>", "</u>", "underlined text");
          break;
        case 'k':
          e.preventDefault();
          insertLink();
          break;
      }
    }
  };

  // Sidebar content
  const SidebarContent = () => (
    <div className="space-y-2 p-4">
      <Button
        variant={activeView === "create" ? "default" : "ghost"}
        className={`w-full justify-start ${activeView === "create" ? "bg-gradient-to-r from-primary to-secondary" : ""}`}
        onClick={() => { setActiveView("create"); setSidebarOpen(false); }}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create New Post
      </Button>
      <Button
        variant={activeView === "list" ? "default" : "ghost"}
        className={`w-full justify-start ${activeView === "list" ? "bg-gradient-to-r from-primary to-secondary" : ""}`}
        onClick={() => { setActiveView("list"); setSidebarOpen(false); }}
      >
        <Edit className="w-4 h-4 mr-2" />
        All Posts ({posts.length})
      </Button>
      <div className="pt-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="py-4">
                    <h2 className="px-4 mb-4 font-['Poppins']">Admin Panel</h2>
                    <SidebarContent />
                  </div>
                </SheetContent>
              </Sheet>
              <h1 className="text-xl md:text-2xl font-['Poppins']">Blog Admin Panel</h1>
            </div>
            <Button variant="outline" className="border-white text-white hover:bg-white/20 hidden lg:flex" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex max-w-7xl mx-auto">
        <aside className="hidden lg:block w-64 bg-white border-r border-border min-h-screen sticky top-16">
          <div className="py-4">
            <h2 className="px-4 mb-4 font-['Poppins']">Navigation</h2>
            <SidebarContent />
          </div>
        </aside>
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          {/* Your Create/List content goes here */}
        </main>
      </div>
    </div>
  );
}
