import React from "react";

interface SidebarProps {
  sidebarOpen: boolean;
  setActiveView: (view: "posts" | "profile" | "new-post") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setActiveView }) => (
  <div
    className={`fixed inset-y-0 left-0 transform ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    } lg:translate-x-0 lg:static lg:inset-0 z-50`}
  >
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200 pt-20">
      <div className="px-4 py-2">
        <button
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          onClick={() => setActiveView("new-post")}
        >
          <i className="fas fa-plus mr-2"></i>
          New Post
        </button>
      </div>
      <nav className="mt-5 flex-1 px-2 space-y-1">
        <button
          className="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50"
          onClick={() => setActiveView("posts")}
        >
          <i className="fas fa-file-alt mr-3 text-gray-400"></i>
          My Posts
        </button>
        <button
          className="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50"
          onClick={() => setActiveView("profile")}
        >
          <i className="fas fa-user mr-3 text-gray-400"></i>
          Profile
        </button>
        <a
          href="#"
          className="group flex items-center px-2 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <i className="fas fa-pencil-alt mr-3 text-gray-400"></i>
          Drafts
        </a>
        <a
          href="#"
          className="group flex items-center px-2 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <i className="fas fa-folder mr-3 text-gray-400"></i>
          Categories
        </a>
        <a
          href="#"
          className="group flex items-center px-2 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <i className="fas fa-cog mr-3 text-gray-400"></i>
          Settings
        </a>
      </nav>
    </div>
  </div>
);

export default Sidebar;