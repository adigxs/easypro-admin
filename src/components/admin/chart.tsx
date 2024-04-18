import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function Chart() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Demandes mensulles",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const pieData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100, 40, 120],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-2 h-full w-full mx-6">
      <div
        className="hidden lg:flex items-start justify-start"
        style={{ height: "100%", width: "100%" }}
      >
        <Bar data={data} />
      </div>

      <div
        className="hidden lg:flex items-center justify-center"
        style={{ height: "70%", width: "100%" }}
      >
        <Pie data={pieData} />
      </div>
      <div className="lg:hidden block" style={{ height: "40%", width: "90%" }}>
        <Bar data={data} />
      </div>

      <div className="lg:hidden block" style={{ height: "40%", width: "100%" }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
}
