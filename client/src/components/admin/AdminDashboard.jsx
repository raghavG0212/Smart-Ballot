import { Card } from "flowbite-react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import AdminDropdown from "./AdminDropdown";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminMainDash() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/v1/candidate/getCandidates"
        );
        setCandidates(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);
 
  

  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Votes",
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar className="h-full" />
      <div className="flex flex-col flex-grow h-full">
        <div>
          <AdminDropdown />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6 p-6">
          <Card>
            <h5 className="text-xl font-bold">Card 1</h5>
            <p>Some content for Card 1.</p>
          </Card>
          <Card>
            <h5 className="text-xl font-bold">Card 2</h5>
            <p>Some content for Card 2.</p>
          </Card>
          <Card>
            <h5 className="text-xl font-bold">Card 3</h5>
            <p>Some content for Card 3.</p>
          </Card>
          <Card>
            <h5 className="text-xl font-bold">Card 4</h5>
            <p>Some content for Card 4.</p>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 flex-grow p-6">
          <Card className="h-full">
            <h5 className="text-xl font-bold mb-4">Sales Bar Chart</h5>
            <Bar data={barData} />
          </Card>
          <Card className="h-full">
            <h5 className="text-xl font-bold mb-4">Votes Pie Chart</h5>
            <Pie data={pieData} />
          </Card>
        </div>
      </div>
    </div>
  );
}

// import React from 'react'

// export default function AdminDashboard() {
//   return (
//     <div>AdminDashboard</div>
//   )
// }
