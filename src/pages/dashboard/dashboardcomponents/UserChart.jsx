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
    <div className="bg-white shadow-lg rounded-2xl p-5">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">User Statistics</h3>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={2.5}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserStat;
