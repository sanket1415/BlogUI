import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const ViewsChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const viewsChart = echarts.init(chartRef.current);
      const option = {
        animation: false,
        tooltip: { trigger: "axis" },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: { type: "value" },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1520],
            type: "line",
            smooth: true,
            color: "#3B82F6",
          },
        ],
      };
      viewsChart.setOption(option);
      return () => viewsChart.dispose();
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Views Trend</h3>
      <div ref={chartRef} style={{ height: "300px" }}></div>
    </div>
  );
};

export default ViewsChart;