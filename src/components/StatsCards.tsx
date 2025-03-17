import React from "react";

const StatsCards: React.FC = () => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <i className="fas fa-file-alt text-blue-600 text-3xl"></i>
        </div>
        <div className="ml-5">
          <h3 className="text-lg font-medium text-gray-900">Total Posts</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">24</p>
            <p className="ml-2 text-sm text-green-600">
              <i className="fas fa-arrow-up"></i>
              <span className="ml-1">12%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <i className="fas fa-eye text-green-600 text-3xl"></i>
        </div>
        <div className="ml-5">
          <h3 className="text-lg font-medium text-gray-900">Total Views</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">12.5K</p>
            <p className="ml-2 text-sm text-green-600">
              <i className="fas fa-arrow-up"></i>
              <span className="ml-1">8%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <i className="fas fa-heart text-red-600 text-3xl"></i>
        </div>
        <div className="ml-5">
          <h3 className="text-lg font-medium text-gray-900">Engagement</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">1.8K</p>
            <p className="ml-2 text-sm text-green-600">
              <i className="fas fa-arrow-up"></i>
              <span className="ml-1">15%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StatsCards;