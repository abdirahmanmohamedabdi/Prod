"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar";
import supabase from "../../../../lib/supabaseClient"; // Ensure correct import path
import { useRouter, useParams } from "next/navigation";

const DriverProfile = () => {
  const [driver, setDriver] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchDriverProfile = async () => {
      try {
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
          `)
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        console.log("Fetched driver profile:", data); // Debugging line
        setDriver(data);
      } catch (error) {
        console.error("Error fetching driver profile:", error.message);
      }
    };

    fetchDriverProfile();
  }, [id]);

  if (!driver) {
    return (
      <Sidebar>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg font-font text-gray-700">Loading driver details...</div>
        </div>
      </Sidebar>
    );
  }

  const handleBusClick = (busId) => {
    router.push(`/SuperAdmin/Transport/Bus/${busId}`);
  };

  return (
    <Sidebar>
      <div className="p-8 space-y-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold font-font text-blue-700">Driver Profile</h1>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-font text-sm text-gray-600">Driver ID</p>
              <p className="text-lg font-font text-gray-800">{driver.id}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">First Name</p>
              <p className="text-lg font-font text-gray-800">{driver.first_name}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Second Name</p>
              <p className="text-lg font-font text-gray-800">{driver.second_name}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Assigned Bus</p>
              <p
                className="text-lg font-font text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleBusClick(driver.bus_id)}
              >
                {driver.bus_id ? driver.buses.bus_number : "Not Assigned"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          {/* Back to Manage Drivers Button */}
          <button
            className="px-6 py-2 bg-blue-600 text-white font-font rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => router.push("/SuperAdmin/Transport/Drivers/Manage")}
          >
            Back to Manage Drivers
          </button>

          {/* View Entire Profile Button */}
          <button
            className="px-6 py-2 bg-green-600 text-white font-font rounded-lg shadow hover:bg-green-700 transition"
            onClick={() => router.push(`/Hr/Staff/${driver.id}`)}
          >
            View Entire Profile
          </button>
        </div>
      
      </div>
    </Sidebar>
  );
};

export default DriverProfile;

  