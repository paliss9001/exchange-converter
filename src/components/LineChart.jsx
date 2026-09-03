import { Ticks } from "chart.js";
import { toPadding } from "chart.js/helpers";
import { Line } from "react-chartjs-2";

function LineChart({ chartData, base, quote }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center", color: "#fff" }}>
        {base}/{quote}
      </h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
            },
            legend: {
              display: false,
            },
          },
          responsive: true,
          scales: {
            y: {
              grid: {
                color: "rgba(255, 255, 255, 0.03)",
                borderDash: [4, 4],
              },
            },
            x: {
              reverse: true
            }
          },
          
        }}
      />
    </div>
  );
}
export default LineChart;
