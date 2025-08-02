import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

// Example props: {  {...}, title: "Questions Overview" }
export default function ChartWidget({ data, title }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-12">
      <h3 className="text-lg font-semibold text-secondary mb-4">{title}</h3>
      <Bar
        data={data}
        options={{
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: "#1F0322", font: { weight: "bold" } } },
            y: {
              grid: { color: "#F9EBFB" },
              ticks: { color: "#8A1C7C", font: { weight: "bold" } },
              beginAtZero: true,
            },
          },
        }}
        height={90}
      />
    </div>
  )
}
