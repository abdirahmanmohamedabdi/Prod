"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar";
import supabase from "../../../../lib/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageBusesPage = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const { data, error } = await supabase.from("buses").select("*");
        if (error) throw error;

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

  const handleDeleteBus = async (busId) => {
    try {
      const { error } = await supabase.from("buses").delete().eq("id", busId);
      if (error) throw error;

      toast.success("Bus deleted successfully!");
      setBuses((prev) => prev.filter((bus) => bus.id !== busId));
    } catch (error) {
      console.error("Error deleting bus:", error.message);
      toast.error("Failed to delete bus.");
    }
  };

  const handleToggleActiveStatus = async (busId, currentStatus) => {
    try {
      const { error } = await supabase
        .from("buses")
        .update({ active_status: !currentStatus })
        .eq("id", busId);
      if (error) throw error;

      toast.success("Bus status updated successfully!");
      setBuses((prev) =>
        prev.map((bus) =>
          bus.id === busId ? { ...bus, active_status: !currentStatus } : bus
        )
      );
    } catch (error) {
      console.error("Error updating bus status:", error.message);
      toast.error("Failed to update bus status.");
    }
  };

  return (
    <Sidebar>
      <ToastContainer />
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-semibold font-font">Manage Buses</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="text-left px-6 py-3 font-font">Bus Number</th>
                <th className="text-left px-6 py-3 font-font">Model</th>
                <th className="text-left px-6 py-3 font-font">Capacity</th>
                <th className="text-left px-6 py-3 font-font">Maintenance Date</th>
                <th className="text-left px-6 py-3 font-font">Active Status</th>
                <th className="text-left px-6 py-3 font-font">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center px-6 py-3 font-font">
                    Loading buses...
                  </td>
                </tr>
              ) : buses.length > 0 ? (
                buses.map((bus) => (
                  <tr key={bus.id} className="border-t">
                    <td className="px-6 py-3 font-font">{bus.bus_number}</td>
                    <td className="px-6 py-3 font-font">{bus.model}</td>
                    <td className="px-6 py-3 font-font">{bus.capacity}</td>
                    <td className="px-6 py-3 font-font">{bus.maintenance_date || "N/A"}</td>
                    <td className="px-6 py-3 font-font">
                      {bus.active_status ? "Active" : "Inactive"}
                    </td>
                    <td className="px-6 py-3 font-font">
                      <button
                        onClick={() => handleToggleActiveStatus(bus.id, bus.active_status)}
                        className={`mr-4 ${bus.active_status ? "text-red-600" : "text-green-600"} hover:underline`}
                      >
                        {bus.active_status ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleDeleteBus(bus.id)}
                        className="text-red-600 hover:text-red-800 font-font"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center px-6 py-3 font-font">
                    No buses to manage.
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

export default ManageBusesPage;