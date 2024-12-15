"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import supabase from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

const RoutesDashboard = () => {
  const [routes, setRoutes] = useState([]);
  const [totalRoutes, setTotalRoutes] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const { data, error } = await supabase
          .from("routes")
          .select("id, route_name, pickup_time, drop_off_time");

        if (error) {
          throw error;
        }

        console.log("Fetched routes:", data); // Debugging line
        setRoutes(data);
        setTotalRoutes(data.length);
      } catch (error) {
        console.error("Error fetching routes:", error.message);
      }
    };

    fetchRoutes();
  }, []);

  const handleRouteClick = (id) => {
    router.push(`/SuperAdmin/Transport/Route/${id}`);
  };

  return (
    <Sidebar>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold font-font">Routes Dashboard</h1>

        {/* Quick Links */}
        <div className="flex justify-between items-center mt-4 mb-6">
          <button
            onClick={() => router.push("/SuperAdmin/Transport/Route/Create")}
            className="bg-green-600 text-white px-6 py-2 rounded-md shadow font-font hover:bg-green-700 transition"
          >
            Add Route
          </button>
          <button
            onClick={() => router.push("/SuperAdmin/Transport/Route/Manage")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow font-font hover:bg-blue-700 transition"
          >
            Manage Routes
          </button>
        </div>

        {/* Routes Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold font-font">Total Routes</h2>
            <p className="text-3xl font-bold text-blue-600">{totalRoutes}</p>
          </div>
        </div>

        {/* Routes List */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold font-font">Recent Routes</h2>
          <table className="min-w-full mt-4 bg-white rounded-md shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-font">Route Name</th>
                <th className="px-6 py-3 text-left font-font">Pickup Time</th>
                <th className="px-6 py-3 text-left font-font">Drop Off Time</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr
                  key={route.id}
                  className="border-b hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => handleRouteClick(route.id)}
                >
                  <td className="px-6 py-4 font-font">{route.route_name}</td>
                  <td className="px-6 py-4 font-font">{route.pickup_time}</td>
                  <td className="px-6 py-4 font-font">{route.drop_off_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
};

export default RoutesDashboard;