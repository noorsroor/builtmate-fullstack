// src/pages/AdminDash.jsx
import React, { useEffect, useState } from "react";
import { FaUsers, FaTools, FaCalendarCheck, FaLightbulb } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Sidebar from "../components/admin/Sidebar"; // Import Sidebar
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
ChartJS.register(BarElement, CategoryScale, LinearScale);
import { PieChart, Pie, Cell } from "recharts";

const AdminDash = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [monthlyData, setMonthlyData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const COLORS = ["#4CAF50", "#FF9800", "#F44336"];


  useEffect(() => {
    const fetchGrowthData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/analytics/booking-growth?year=${selectedYear}`
        );
        setMonthlyData(response.data.monthlyData);
      } catch (error) {
        console.error("Error fetching growth data:", error);
      }
    };

    fetchGrowthData();
  }, [selectedYear]);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPros: 0,
    totalBookings: 0,
    totalIdeas: 0,
  });

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setStats(res.data.stats);
      setChartData(res.data.chartData);
      setData([
        { name: "Users", value: res.data.stats.totalUsers },
        { name: "Professionals", value: res.data.stats.totalPros },
        { name: "Admins", value: 1 },
      ]);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  return (
    <div className="flex min-h-screen ">


      {/* Main Content */}
      <div className="flex-1 p-6 ">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Users" value={stats.totalUsers} icon={<FaUsers className="text-yellow-500" />} />
          <StatCard title="Professionals" value={stats.totalPros} icon={<FaTools className="text-yellow-500"/>} />
          <StatCard title="Bookings" value={stats.totalBookings} icon={<FaCalendarCheck className="text-yellow-500"/>} />
          <StatCard title="Ideas" value={stats.totalIdeas} icon={<FaLightbulb className="text-yellow-500"/>} />
        </div>

        {/* Chart */}
        <div className="flex row gap-5 lg:flex-nowrap flex-wrap">
        <div className="bg-white p-6 rounded-lg shadow-md h-[400px] w-[700px]">
          <h2 className="text-xl font-bold mb-4">Users Growth</h2>
          {chartData ? (
            <Bar
              data={{
                labels: chartData.months,
                datasets: [
                  {
                    label: "New Users",
                    data: chartData.userCounts,
                    backgroundColor: "#E7A624",
                  },
                ],
              }}
              options={{ responsive: true }}
            />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>

        <div className="p-4 bg-white w-[450px] rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">User Types Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            fill="#82ca9d"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    </div>

        <div className="p-4 mt-10 bg-white">
      <h2 className="text-2xl font-bold mb-4">Booking Growth Analytics</h2>

      <div className="flex gap-4 mb-4">
        <label>
          Select Year:{" "}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {Array.from({ length: 5 }).map((_, index) => {
              const year = new Date().getFullYear() - index;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
        </label>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickFormatter={(value) => months[value - 1]}
            label={{ value: "Month", position: "insideBottomRight", offset: -5 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalBookings" stroke="#8884d8" name="Total Bookings" />
          <Line type="monotone" dataKey="totalEarnings" stroke="#E7A624" name="Total Earnings" />
        </LineChart>
      </ResponsiveContainer>
    </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="flex items-center p-5 bg-white rounded-lg shadow-md">
    <div className="text-4xl text-indigo-600 mr-4">{icon}</div>
    <div>
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  </div>
);

export default AdminDash;
