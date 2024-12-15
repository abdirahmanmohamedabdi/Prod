"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import supabase from "../../../lib/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const BusesDashboard = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const { data, error } = await supabase
          .from("buses")
          .select("bus_id, bus_number, capacity, maintenance_date, active_status");

        if (error) {
          throw error;
        }

        console.log("Fetched buses:", data); // Debugging line
        setBuses(data);
      } catch (error) {
        console.error("Error fetching buses:", error.message);
        toast.error("Failed to load buses.");
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  const handleBusClick = (id) => {
    router.push(`/SuperAdmin/Transport/Bus/${id}`);
  };

  if (loading) {
    return (
      <Sidebar>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg font-font text-gray-700">Loading buses...</div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <ToastContainer />
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-semibold font-font">Buses Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push("/SuperAdmin/Transport/Bus/Create")}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow font-font hover:bg-green-700"
          >
            Add Bus
          </button>
        </div>
        <div className="mt-6">
          <table className="min-w-full bg-white rounded-md shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-font">Bus Number</th>
                <th className="px-6 py-3 text-left font-font">Capacity</th>
                <th className="px-6 py-3 text-left font-font">Maintenance Date</th>
                <th className="px-6 py-3 text-left font-font">Active Status</th>
              </tr>
            </thead>
            <tbody>
              {buses.length > 0 ? (
                buses.map((bus) => (
                  <tr
                    key={bus.bus_id}
                    className="border-b hover:bg-gray-100 transition cursor-pointer"
                    onClick={() => handleBusClick(bus.bus_id)}
                  >
                    <td className="px-6 py-3 font-font">{bus.bus_number}</td>
                    <td className="px-6 py-3 font-font">{bus.capacity}</td>
                    <td className="px-6 py-3 font-font">{bus.maintenance_date}</td>
                    <td className="px-6 py-3 font-font">
                      {bus.active_status ? "Active" : "Inactive"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-6 py-3 font-font">
                    No buses available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
};

export default BusesDashboard;