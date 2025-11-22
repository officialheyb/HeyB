import { useState, useEffect, useRef } from "react";
import { Plus, Edit, Trash2, LogOut, Image as ImageIcon, Menu, X, Bold, Italic, Underline, List, ListOrdered, Heading2, Quote, Code, Undo, Redo, Strikethrough, Link, Minus, Type, Eye } from "lucide-react";
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
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUndoRedoRef = useRef(false);

  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = localStorage.getItem("heyb_blog_posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }

    // Load draft from localStorage
    const savedDraft = localStorage.getItem("heyb_blog_draft");
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      setFormData(draft);
      toast.info("Draft restored from autosave");
    }
  }, []);

  // Autosave effect
  useEffect(() => {
    // Only autosave if there's content and not editing a published post
    if (!editingPost && (formData.title || formData.content || formData.excerpt)) {
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current);
      }

      autosaveTimeoutRef.current = setTimeout(() => {
        localStorage.setItem("heyb_blog_draft", JSON.stringify(formData));
      }, 2000); // Autosave after 2 seconds of inactivity
    }

    return () => {
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current);
      }
    };
  }, [formData, editingPost]);

  // History management for undo/redo
  useEffect(() => {
    if (!isUndoRedoRef.current && formData.content !== (history[historyIndex] || "")) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(formData.content);
      
      // Limit history to 50 entries
      if (newHistory.length > 50) {
        newHistory.shift();
      } else {
        setHistoryIndex(historyIndex + 1);
      }
      
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
        year: "numeric", 
        month: "long", 
        day: "numeric" 
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
      // Clear draft after successful publish
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
      const updatedPosts = posts.filter(p => p.id !== id);
      savePosts(updatedPosts);
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

  // Undo/Redo functions
  const handleUndo = () => {
    if (historyIndex > 0) {
      isUndoRedoRef.current = true;
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setFormData({ ...formData, content: history[newIndex] });
      toast.success("Undo");
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isUndoRedoRef.current = true;
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setFormData({ ...formData, content: history[newIndex] });
      toast.success("Redo");
    }
  };

  // Rich text editor functions
  const insertFormatting = (prefix: string, suffix: string = "", placeholder: string = "") => {
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

    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        // If text was selected, place cursor after the formatted text
        const newCursorPos = start + prefix.length + selectedText.length + suffix.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      } else {
        // If no text selected, select the placeholder
        const selectionStart = start + prefix.length;
        const selectionEnd = selectionStart + textToInsert.length;
        textarea.setSelectionRange(selectionStart, selectionEnd);
      }
    }, 0);
  };

  const insertAtCursor = (text: string, selectText: string = "") => {
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

  const formatBold = () => insertFormatting("**", "**", "bold text");
  const formatItalic = () => insertFormatting("*", "*", "italic text");
  const formatUnderline = () => insertFormatting("<u>", "</u>", "underlined text");
  const formatStrikethrough = () => insertFormatting("~~", "~~", "strikethrough text");
  const formatHeading = () => insertFormatting("## ", "", "Heading");
  const formatHeading3 = () => insertFormatting("### ", "", "Subheading");
  const formatList = () => insertFormatting("- ", "", "List item");
  const formatOrderedList = () => insertFormatting("1. ", "", "List item");
  const formatQuote = () => insertFormatting("> ", "", "Quote text");
  const formatCode = () => insertFormatting("`", "`", "code");
  const formatCodeBlock = () => insertFormatting("```\n", "\n```", "code block");
  const insertHR = () => insertAtCursor("\n\n---\n\n");
  
  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      insertFormatting("[", `](${url})`, "link text");
    }
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      const alt = prompt("Enter image description (alt text):") || "image";
      insertAtCursor(`![${alt}](${url})`);
    }
  };

  // Keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            handleRedo();
          } else {
            handleUndo();
          }
          break;
        case 'z':
          e.preventDefault();
          handleRedo();
          break;
        case 'b':
          e.preventDefault();
          formatBold();
          break;
        case 'i':
          e.preventDefault();
          formatItalic();
          break;
        case 'u':
          e.preventDefault();
          formatUnderline();
          break;
        case 'k':
          e.preventDefault();
          insertLink();
          break;
      }
    }
  };

  const SidebarContent = () => (
    <div className="space-y-2 p-4">
      <Button
        variant={activeView === "create" ? "default" : "ghost"}
        className={`w-full justify-start ${activeView === "create" ? "bg-gradient-to-r from-primary to-secondary" : ""}`}
        onClick={() => {
          setActiveView("create");
          setSidebarOpen(false);
        }}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create New Post
      </Button>
      <Button
        variant={activeView === "list" ? "default" : "ghost"}
        className={`w-full justify-start ${activeView === "list" ? "bg-gradient-to-r from-primary to-secondary" : ""}`}
        onClick={() => {
          setActiveView("list");
          setSidebarOpen(false);
        }}
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
              {/* Mobile Menu Button */}
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
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 hidden lg:flex"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar Layout */}
      <div className="flex max-w-7xl mx-auto">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-border min-h-screen sticky top-16">
          <div className="py-4">
            <h2 className="px-4 mb-4 font-['Poppins']">Navigation</h2>
            <SidebarContent />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          {activeView === "create" && (
            <Card className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-['Poppins']">
                  {editingPost ? "Edit Post" : "Create New Post"}
                </h2>
                {editingPost && (
                  <Button variant="ghost" onClick={() => { resetForm(); setIsEditing(false); }}>
                    Cancel
                  </Button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter post title"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Author name (default: HeyB Editorial)"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Select category</option>
                      <option value="Tips & Guides">Tips & Guides</option>
                      <option value="Provider Success">Provider Success</option>
                      <option value="Safety">Safety</option>
                      <option value="Industry Insights">Industry Insights</option>
                      <option value="Client Tips">Client Tips</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Enter image URL (optional)"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief description (shown in blog list)"
                    className="mt-1"
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="content">Full Content *</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {showPreview ? "Hide Preview" : "Show Preview"}
                    </Button>
                  </div>
                  
                  {/* Formatting Toolbar */}
                  <div 
                    className="border border-border rounded-t-md bg-muted/30 p-2 flex flex-wrap gap-1" 
                    role="toolbar" 
                    aria-label="Text formatting toolbar"
                    aria-controls="content"
                  >
                    {/* Undo/Redo */}
                    <div className="flex gap-1 pr-2 border-r border-border">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleUndo}
                        disabled={historyIndex <= 0}
                        title="Undo (Ctrl+Z)"
                        aria-label="Undo last change"
                      >
                        <Undo className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleRedo}
                        disabled={historyIndex >= history.length - 1}
                        title="Redo (Ctrl+Y)"
                        aria-label="Redo last undone change"
                      >
                        <Redo className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Text Formatting */}
                    <div className="flex gap-1 pr-2 border-r border-border">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={formatBold}
                        title="Bold (Ctrl+B)"
                        aria-label="Bold text"
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={formatItalic}
                        title="Italic (Ctrl+I)"
                        aria-label="Italic text"
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={formatUnderline}
                        title="Underline (Ctrl+U)"
                        aria-label="Underline text"
                      >
                        <Underline className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={formatStrikethrough}
                        title="Strikethrough"
                        aria-label="Strikethrough text"
                      >
                        <Strikethrough className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Headings */}
                    <div className="flex gap-1 pr-2 border-r border-border">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={formatHeading}
                        title="Heading 2"
                        aria-label="Insert Heading 2"
                      >
                        <Heading2 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={formatHeading3}
                        title="Heading 3"
                        aria-label="Insert Heading 3"
                      >
                        <Type className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Lists */}
                    <div className="flex gap-1 pr-2 border-r border-border">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={formatList}
                        title="Bullet List"
                        aria-label="Insert bullet list"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={formatOrderedList}
                        title="Numbered List"
                        aria-label="Insert numbered list"
                      >
                        <ListOrdered className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Quote & Code */}
                    <div className="flex gap-1 pr-2 border-r border-border">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={formatQuote}
                        title="Quote"
                        aria-label="Insert blockquote"
                      >
                        <Quote className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={formatCode}
                        title="Inline Code"
                        aria-label="Insert inline code"
                      >
                        <Code className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Links & Media */}
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={insertLink}
                        title="Insert Link (Ctrl+K)"
                        aria-label="Insert link"
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={insertImage}
                        title="Insert Image"
                        aria-label="Insert image"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={insertHR}
                        title="Horizontal Rule"
                        aria-label="Insert horizontal rule"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Textarea
                    ref={contentEditorRef}
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    onKeyDown={handleKeyDown}
                    placeholder="Write your blog post content here...&#10;&#10;Quick tips:&#10;• Use the toolbar buttons above for formatting&#10;• Or type Markdown directly&#10;• **bold** *italic* <u>underline</u>&#10;• Keyboard shortcuts: Ctrl+B (bold), Ctrl+I (italic), Ctrl+U (underline)&#10;• Ctrl+Z (undo), Ctrl+Y (redo)"
                    className="mt-0 rounded-t-none border-t-0 font-mono text-sm"
                    rows={14}
                    required
                    aria-label="Blog post content editor with Markdown support"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                    <span>✓ Auto-saving... Use toolbar or type Markdown directly.</span>
                    <span>{formData.content.length} characters</span>
                  </div>
                  
                  {/* Preview */}
                  {showPreview && (
                    <div className="mt-4 p-4 border border-border rounded-md bg-muted/20">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                        <h4 className="font-['Poppins'] text-sm">Preview</h4>
                        <span className="text-xs text-muted-foreground">How your content will appear</span>
                      </div>
                      <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: markdownToHtml(formData.content || 'Start typing to see preview...') }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-border"
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Mark as Featured Post
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-gradient-to-r from-primary to-secondary">
                    {editingPost ? "Update Post" : "Publish Post"}
                  </Button>
                  {!editingPost && (formData.title || formData.content) && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        localStorage.setItem("heyb_blog_draft", JSON.stringify(formData));
                        toast.success("Draft saved!");
                      }}
                    >
                      Save Draft
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          )}

          {activeView === "list" && (
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl font-['Poppins'] mb-4">All Posts ({posts.length})</h2>
              
              {posts.length === 0 ? (
                <Card className="p-12 text-center">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No blog posts yet. Create your first post!</p>
                  <Button 
                    onClick={() => setActiveView("create")}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </Button>
                </Card>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="font-['Poppins'] text-base md:text-lg">{post.title}</h3>
                          {post.featured && (
                            <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2 md:gap-4 text-xs text-muted-foreground">
                          <span>By {post.author}</span>
                          <span>•</span>
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            handleEdit(post);
                            setActiveView("create");
                          }}
                        >
                          <Edit className="w-4 h-4 md:mr-1" />
                          <span className="hidden md:inline">Edit</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 md:mr-1" />
                          <span className="hidden md:inline">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
