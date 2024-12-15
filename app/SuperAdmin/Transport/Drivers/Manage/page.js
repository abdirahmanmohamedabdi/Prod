"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar";
import supabase from "../../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

const ManageDriverPage = () => {
  const [drivers, setDrivers] = useState([]);
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

        console.log("Fetched drivers:", data); // Debugging line
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching drivers:", error.message);
      }
    };

    fetchDrivers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from("drivers")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Refresh the drivers list after deletion
      setDrivers(drivers.filter((driver) => driver.id !== id));
    } catch (error) {
      console.error("Error deleting driver:", error.message);
    }
  };

  const handleUpdate = (id) => {
    router.push(`/SuperAdmin/Transport/Drivers/Update/${id}`);
  };

  return (
    <Sidebar>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold font-font">Manage Drivers</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 border-b">Driver Name</th>
              <th className="px-4 py-2 text-left text-gray-600 border-b">Assigned Bus</th>
              <th className="px-4 py-2 text-left text-gray-600 border-b">Status</th>
              <th className="px-4 py-2 text-left text-gray-600 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="border-b hover:bg-gray-100 transition">
                <td className="px-6 py-4 font-font">
                  {driver.first_name} {driver.second_name}
                </td>
                <td className="px-6 py-4 font-font">
                  {driver.bus_id ? driver.buses.bus_number : "Not Assigned"}
                </td>
                <td className="px-6 py-4 font-font">
                  {driver.bus_id ? "Assigned" : "Not Assigned"}
                </td>
                <td className="px-6 py-4 font-font">
                  <button
                    onClick={() => handleUpdate(driver.id)}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(driver.id)}
                    className="text-red-500 hover:underline"
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

export default ManageDriverPage;