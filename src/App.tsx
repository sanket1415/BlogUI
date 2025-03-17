import React, { useState } from "react";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import { Post } from "./types/Post";

const App: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<"posts" | "profile" | "new-post">("posts");
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "The Future of Artificial Intelligence in Modern Software Development",
      date: "2025-03-16",
      category: "Technology",
      status: "published",
      views: 1243,
      likes: 89,
      comments: 32,
      shares: 15,
      author: "Elizabeth Anderson",
      excerpt: "Exploring how AI is revolutionizing the way we build and maintain software...",
      selected: false,
    },
    {
      id: 2,
      title: "Sustainable Architecture: Building for Tomorrow",
      date: "2025-03-15",
      category: "Architecture",
      status: "published",
      views: 856,
      likes: 67,
      comments: 24,
      shares: 12,
      author: "Elizabeth Anderson",
      excerpt: "An in-depth look at eco-friendly building practices and their impact...",
      selected: false,
    },
    {
      id: 3,
      title: "Digital Marketing Trends for 2025",
      date: "2025-03-14",
      category: "Marketing",
      status: "draft",
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      author: "Elizabeth Anderson",
      excerpt: "Analyzing upcoming trends in digital marketing and consumer behavior...",
      selected: false,
    },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosts = posts.map((post) => ({
      ...post,
      selected: e.target.checked,
    }));
    setPosts(newPosts);
    setSelectedPosts(e.target.checked ? posts.map((post) => post.id) : []);
    setShowBulkActions(e.target.checked);
  };

  const handleSelectPost = (id: number) => {
    const newPosts = posts.map((post) =>
      post.id === id ? { ...post, selected: !post.selected } : post,
    );
    setPosts(newPosts);
    const selectedIds = newPosts.filter((post) => post.selected).map((post) => post.id);
    setSelectedPosts(selectedIds);
    setShowBulkActions(selectedIds.length > 0);
  };

  return isLoggedIn ? (
    <Dashboard
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      activeView={activeView}
      setActiveView={setActiveView}
      posts={posts}
      selectedPosts={selectedPosts}
      searchTerm={searchTerm}
      categoryFilter={categoryFilter}
      statusFilter={statusFilter}
      dateRange={dateRange}
      sortField={sortField}
      sortDirection={sortDirection}
      setSearchTerm={setSearchTerm}
      setCategoryFilter={setCategoryFilter}
      setStatusFilter={setStatusFilter}
      setDateRange={setDateRange}
      handleSort={handleSort}
      handleSelectAll={handleSelectAll}
      handleSelectPost={handleSelectPost}
      showBulkActions={showBulkActions}
    />
  ) : (
    <AuthPage
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
    />
  );
};

export default App;