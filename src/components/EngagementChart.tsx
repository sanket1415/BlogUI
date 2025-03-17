import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const EngagementChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const engagementChart = echarts.init(chartRef.current);
      const option = {
        animation: false,
        tooltip: { trigger: "item" },
        series: [
          {
            type: "pie",
            radius: ["60%", "80%"],
            data: [
              { value: 735, name: "Likes" },
              { value: 580, name: "Comments" },
              { value: 484, name: "Shares" },
            ],
            color: ["#3B82F6", "#10B981", "#8B5CF6"],
          },
        ],
      };
      engagementChart.setOption(option);
      return () => engagementChart.dispose();
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Engagement Distribution
      </h3>
      <div ref={chartRef} style={{ height: "300px" }}></div>
    </div>
  );
};

export default EngagementChart;