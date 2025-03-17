import React from "react";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";
import StatsCards from "./StatsCards";
import ViewsChart from "./ViewsChart";
import EngagementChart from "./EngagementChart";
import PostsTable from "./PostsTable";
import Profile from "./Profile";
import NewPost from "./NewPost";
import { Post } from "../types/Post";

interface DashboardProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  activeView: "posts" | "profile" | "new-post";
  setActiveView: (view: "posts" | "profile" | "new-post") => void;
  posts: Post[];
  selectedPosts: number[];
  searchTerm: string;
  categoryFilter: string;
  statusFilter: string;
  dateRange: { start: string; end: string };
  sortField: string;
  sortDirection: "asc" | "desc";
  setSearchTerm: (term: string) => void;
  setCategoryFilter: (category: string) => void;
  setStatusFilter: (status: string) => void;
  setDateRange: (range: { start: string; end: string }) => void;
  handleSort: (field: string) => void;
  handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectPost: (id: number) => void;
  showBulkActions: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeView,
  setActiveView,
  posts,
  selectedPosts,
  searchTerm,
  categoryFilter,
  statusFilter,
  dateRange,
  sortField,
  sortDirection,
  setSearchTerm,
  setCategoryFilter,
  setStatusFilter,
  setDateRange,
  handleSort,
  handleSelectAll,
  handleSelectPost,
  showBulkActions,
}) => (
  <div className="min-h-screen bg-gray-50">
    <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setActiveView={setActiveView} />
    {activeView !== "new-post" && <Sidebar sidebarOpen={sidebarOpen} setActiveView={setActiveView} />}
    <main className={activeView === "new-post" ? "" : "lg:pl-64 pt-16"}>
      <div className={activeView === "new-post" ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
        <div className={activeView === "new-post" ? "" : "py-6"}>
          {activeView === "posts" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">My Posts</h1>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  onClick={() => setActiveView("new-post")}
                >
                  <i className="fas fa-plus mr-2"></i>
                  New Post
                </button>
              </div>
              <StatsCards />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <ViewsChart />
                <EngagementChart />
              </div>
              <PostsTable
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
            </>
          )}
          {activeView === "profile" && <Profile />}
          {activeView === "new-post" && <NewPost />}
        </div>
      </div>
    </main>
  </div>
);

export default Dashboard;