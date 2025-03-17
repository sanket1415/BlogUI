import React, { useState, useEffect } from "react";
import * as echarts from "echarts";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const postsChart = echarts.init(document.getElementById("postsChart")!);
    const engagementChart = echarts.init(document.getElementById("engagementChart")!);

    const postsOption = {
      animation: false,
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
      yAxis: { type: "value" },
      series: [{ data: [5, 8, 12, 15, 20, 24], type: "line", smooth: true, color: "#3B82F6" }],
    };

    const engagementOption = {
      animation: false,
      tooltip: { trigger: "item" },
      series: [
        {
          type: "pie",
          radius: ["60%", "80%"],
          data: [
            { value: 12500, name: "Views" },
            { value: 1800, name: "Likes" },
            { value: 950, name: "Comments" },
          ],
          color: ["#3B82F6", "#10B981", "#8B5CF6"],
        },
      ],
    };

    postsChart.setOption(postsOption);
    engagementChart.setOption(engagementOption);

    return () => {
      postsChart.dispose();
      engagementChart.dispose();
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <img
          className="absolute bottom-0 left-8 transform translate-y-1/2 w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          src="https://public.readdy.ai/ai/img_res/1f48c5b4a7d78622ec2cd6e81dc24901.jpg"
          alt="Elizabeth Anderson"
        />
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="absolute top-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <i className="fas fa-edit mr-2"></i>
            Edit Profile
          </button>
        )}
        {editMode && (
          <div className="absolute top-4 right-4 space-x-2">
            <button
              onClick={() => setEditMode(false)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors cursor-pointer"
            >
              <i className="fas fa-check mr-2"></i>
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="pt-20 px-8 pb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Elizabeth Anderson</h1>
            <p className="text-lg text-gray-600 mt-1">Senior Content Strategist & Tech Blogger</p>
            <div className="flex items-center mt-2 text-gray-600">
              <i className="fas fa-map-marker-alt mr-2"></i>
              San Francisco, CA
            </div>
          </div>
          <div className="flex space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">12.5K</div>
              <div className="text-sm text-gray-600">Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">1.8K</div>
              <div className="text-sm text-gray-600">Engagement</div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex space-x-4 border-b border-gray-200">
            {["About", "Posts", "Analytics", "Settings"].map((tab) => (
              <button
                key={tab.toLowerCase()}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab.toLowerCase()
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                } cursor-pointer`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {activeTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Bio</h3>
                  <p className="mt-2 text-gray-600">
                    Passionate about creating engaging content that bridges the gap between technology and user experience...
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-envelope mr-2"></i>
                      elizabeth.anderson@blogcraft.com
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-phone mr-2"></i>
                      +1 (415) 555-0123
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Social Media</h3>
                  <div className="mt-2 flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      <i className="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      <i className="fab fa-linkedin text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      <i className="fab fa-github text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "posts" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((post) => (
                  <div
                    key={post}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      className="w-full h-48 object-cover rounded-t-lg"
                      src={`https://readdy.ai/api/search-image?query=modern minimalist tech workspace with laptop and coffee on desk professional photography&width=600&height=400&flag=b14a66a689d9984fea84fcf3f295a71b&seq=${post}&orientation=landscape`}
                      alt="Post thumbnail"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        The Future of AI in Content Creation
                      </h3>
                      <p className="text-gray-600 text-sm mt-2">
                        Exploring how artificial intelligence is revolutionizing the way we create and consume content...
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500">March 15, 2025</div>
                        <div className="flex space-x-2 text-gray-500 text-sm">
                          <span><i className="fas fa-eye mr-1"></i>2.1K</span>
                          <span><i className="fas fa-heart mr-1"></i>156</span>
                          <span><i className="fas fa-comment mr-1"></i>48</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Posts Growth</h3>
                    <div id="postsChart" style={{ height: "300px" }}></div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Overview</h3>
                    <div id="engagementChart" style={{ height: "300px" }}></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Profile Settings</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Display Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="Elizabeth Anderson"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bio</label>
                      <textarea
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        rows={4}
                        defaultValue="Passionate about creating engaging content that bridges the gap between technology and user experience..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="elizabeth.anderson@blogcraft.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;