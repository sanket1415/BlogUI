import React, { useRef, useEffect } from "react";

interface TopNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  setActiveView: (view: "posts" | "profile" | "new-post") => void;
}

const TopNav: React.FC<TopNavProps> = ({ sidebarOpen, setSidebarOpen, setActiveView }) => {
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            <div className="flex-shrink-0 flex items-center ml-4">
              <span className="text-2xl font-bold text-blue-600">BlogCraft</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-500 cursor-pointer">
              <i className="fas fa-bell text-xl"></i>
            </button>
            <div className="relative">
              <button
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://public.readdy.ai/ai/img_res/cd962dfda94733630013ecc9ca54f1fc.jpg"
                  alt="Elizabeth Anderson"
                />
                <span className="text-gray-700">Elizabeth Anderson</span>
                <i className="fas fa-chevron-down ml-2 text-gray-400 text-sm"></i>
              </button>
              {profileMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                  ref={profileMenuRef}
                >
                  <div className="py-1" role="menu">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-blue-600 bg-blue-50"
                      onClick={() => {
                        setActiveView("profile");
                        setProfileMenuOpen(false);
                      }}
                    >
                      <i className="fas fa-user mr-2"></i>
                      View Profile
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setActiveView("posts");
                        setProfileMenuOpen(false);
                      }}
                    >
                      <i className="fas fa-file-alt mr-2"></i>
                      My Posts
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fas fa-cog mr-2"></i>
                      Settings
                    </button>
                    <div className="border-t border-gray-100"></div>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;