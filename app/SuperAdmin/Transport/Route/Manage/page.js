"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/Sidebar";
import supabase from "../../../../lib/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageRoutesPage = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const { data, error } = await supabase.from("routes").select("*");

      if (error) {
        console.error("Error fetching routes:", error.message);
        toast.error("Failed to fetch routes.");
      } else {
        setRoutes(data);
      }
    };

    fetchRoutes();
  }, []);

  const handleDeleteRoute = async (id) => {
    try {
      const { error } = await supabase.from("routes").delete().eq("id", id);

      if (error) throw error;

      toast.success("Route deleted successfully!");
      setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
    } catch (error) {
      console.error("Error deleting route:", error.message);
      toast.error("Failed to delete route.");
    }
  };

  return (
    <Sidebar>
      <div className="p-6 space-y-6">
        <ToastContainer />
        <h1 className="text-2xl font-semibold font-font">Manage Routes</h1>
        <table className="min-w-full mt-4 bg-white rounded-md shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-font">Route Name</th>
              <th className="px-6 py-3 text-left font-font">Start Point</th>
              <th className="px-6 py-3 text-left font-font">End Point</th>
              <th className="px-6 py-3 text-left font-font">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr
                key={route.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="px-6 py-4 font-font">{route.route_name}</td>
                <td className="px-6 py-4 font-font">{route.start_point}</td>
                <td className="px-6 py-4 font-font">{route.end_point}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteRoute(route.id)}
                    className="text-red-600 hover:underline font-font"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Sidebar>
  );
};

export default ManageRoutesPage;
