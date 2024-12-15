"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import supabase from "../../../lib/supabaseClient"; // Ensure correct import path
import { useRouter } from "next/navigation";

const DriversDashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const [totalDrivers, setTotalDrivers] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        // Fetch all drivers and their assigned buses
        const { data, error } = await supabase
          .from("drivers")
          .select(`
            id,
            first_name,
            second_name,
            bus_id,
            buses (
              bus_number
            )
          `);

        if (error) {
          throw error;
        }

        console.log("Fetched drivers:", data); // Debugging line 1
        setDrivers(data);
        setTotalDrivers(data.length);
        console.log("Total drivers:", data.length); // Debugging line 2
      } catch (error) {
        console.error("Error fetching drivers:", error.message);
      }
    };

    fetchDrivers();
  }, []);

  useEffect(() => {
    console.log("Drivers state updated:", drivers); // Debugging line 3
  }, [drivers]);

  const handleRowClick = (id) => {
    router.push(`/SuperAdmin/Transport/Drivers/${id}`);
  };

  return (
    <Sidebar>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold font-font">Drivers Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Drivers */}
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold font-font">Total Drivers</h2>
            <p className="text-3xl font-bold text-blue-600">{totalDrivers}</p>
          </div>

          {/* Recently Added Drivers */}
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold font-font">Recently Added Drivers</h2>
            <p className="text-lg font-font text-gray-700">
              {drivers.length > 0 ? drivers[0]?.first_name || "No drivers added yet" : "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold font-font">Recent Drivers</h2>
          <table className="min-w-full mt-4 bg-white rounded-md shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-font">Driver Name</th>
                <th className="px-6 py-3 text-left font-font">Assigned Bus</th>
                <th className="px-6 py-3 text-left font-font">Status</th>
              </tr>
            </thead>
            <tbody>
              {drivers.slice(0, 5).map((driver, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => handleRowClick(driver.id)}
                >
                  <td className="px-6 py-4 font-font">
                    {driver.first_name} {driver.second_name}
                  </td>
                  <td className="px-6 py-4 font-font">
                    {driver.bus_id ? driver.buses.bus_number : "Not Assigned"}
                  </td>
                  <td className="px-6 py-4 font-font">
                    {driver.bus_id ? "Assigned" : "Not Assigned"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Links */}
        <div className="mt-6 space-x-4">
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            onClick={() => window.location.href = "/SuperAdmin/Transport/Drivers/Create"}
          >
            Add New Driver
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => window.location.href = "/SuperAdmin/Transport/Drivers/Manage"}
          >
            Manage Drivers
          </button>
        </div>
      </div>
    </Sidebar>
  );
};

export default DriversDashboard;