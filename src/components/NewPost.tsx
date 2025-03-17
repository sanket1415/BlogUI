import React, { useState, useEffect, useRef } from "react";

const NewPost: React.FC = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [urlSlug, setUrlSlug] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [isFeatured, setIsFeatured] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saving, setSaving] = useState(false);
  const [featuredImage, setFeaturedImage] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categories] = useState([
    "Technology",
    "Marketing",
    "Design",
    "Business",
    "Lifestyle",
    "Travel",
  ]);

  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const autoSave = () => {
      if (title || content) {
        setSaving(true);
        setTimeout(() => {
          setSaving(false);
          setLastSaved(new Date());
        }, 1000);
      }
    };
    const interval = setInterval(autoSave, 300000);
    return () => clearInterval(interval);
  }, [title, content]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFeaturedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    const notification = document.createElement("div");
    notification.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    notification.textContent = "Post published successfully!";
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Posts
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {saving && <span className="text-sm text-gray-500">Saving...</span>}
            {lastSaved && (
              <span className="text-sm text-gray-500">
                Last saved {lastSaved.toLocaleTimeString()}
              </span>
            )}
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">
              Preview
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Publish
            </button>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
          <input
            type="text"
            placeholder="Post Title"
            className="w-full text-4xl font-bold mb-8 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="relative mb-8" ref={categoryRef}>
            <button
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <i className="fas fa-folder text-gray-400"></i>
              <span>{category || "Select Category"}</span>
              <i className="fas fa-chevron-down text-gray-400"></i>
            </button>
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setCategory(cat);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {featuredImage ? (
                <div className="relative">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="max-h-96 mx-auto rounded-lg"
                  />
                  <button
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer"
                    onClick={() => setFeaturedImage("")}
                  >
                    <i className="fas fa-times text-gray-600"></i>
                  </button>
                </div>
              ) : (
                <div>
                  <i className="fas fa-image text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-500 mb-4">Drag and drop your featured image here or</p>
                  <label className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">
                    Browse Files
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="border border-gray-200 rounded-lg p-2">
              <div className="flex items-center space-x-2 mb-2 border-b border-gray-200 pb-2">
                <button className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <i className="fas fa-bold text-gray-600"></i>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <i className="fas fa-italic text-gray-600"></i>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <i className="fas fa-link text-gray-600"></i>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <i className="fas fa-list text-gray-600"></i>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <i className="fas fa-quote-right text-gray-600"></i>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <i className="fas fa-image text-gray-600"></i>
                </button>
              </div>
              <textarea
                className="w-full h-96 resize-none border-none focus:outline-none focus:ring-0"
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>
        </main>

        <aside
          className={`fixed right-0 top-16 h-full w-80 bg-white border-l border-gray-200 transform transition-transform duration-300 ${
            showSidebar ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Post Settings</h2>
              <button
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">SEO Title</h3>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Meta Description</h3>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">URL Slug</h3>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={urlSlug}
                  onChange={(e) => setUrlSlug(e.target.value)}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Publish Date</h3>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Visibility</h3>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="password">Password Protected</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Featured Post</span>
                <button
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isFeatured ? "bg-blue-600" : "bg-gray-200"
                  }`}
                  onClick={() => setIsFeatured(!isFeatured)}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                      isFeatured ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewPost;