import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const UserStat = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        console.log("API URL:", API_URL);
        const response = await fetch(`${API_URL}/api/v1/dashboard/get`);
        const result = await response.json();
        console.log("API Response:", result);

        if (result.success && result.data.length > 0) {
          const { usersThisMonth } = result.data[0];
          const currentMonthIndex = new Date().getMonth();
          const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];

          const updatedData = months.map((month, index) => ({
            name: month,
            users: index === currentMonthIndex ? usersThisMonth : 0,
          }));

          setData(updatedData);
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] shadow-xl rounded-2xl p-6 border border-gray-800">
      <h3 className="text-2xl font-bold text-white mb-4 text-center">User Statistics</h3>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ backgroundColor: "#1f2937", borderColor: "#3b82f6", color: "#fff" }}
              cursor={{ stroke: "#3b82f6", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={3}
              activeDot={{ r: 8, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserStat;
