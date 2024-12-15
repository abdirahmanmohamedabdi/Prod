"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar";
import supabase from "../../../../lib/supabaseClient"; // Ensure correct import path
import { useRouter, useParams } from "next/navigation";

const BusDetails = () => {
  const [bus, setBus] = useState(null);
  const { id: bus_id } = useParams(); // Get the bus ID from URL params
  const router = useRouter();

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        console.log(`Fetching details for bus_id: ${bus_id}`); // Debugging line

        // Fetch bus details with driver name
        const { data, error } = await supabase
          .from("buses")
          .select(`
            bus_id,
            bus_number,
            capacity,
            maintenance_date,
            active_status,
            employees(
              firstName,
              secondName
            ),
            bus_route_number
          `)
          .eq("bus_id", bus_id)
          .single();

        console.log("Fetched bus details:", data); // Debugging line

        if (error) {
          throw error;
        }

        setBus(data);
      } catch (error) {
        console.error("Error fetching bus details:", error.message); // Error handling
      }
    };

    fetchBusDetails();
  }, [bus_id]);

  if (!bus) {
    return (
      <Sidebar>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg font-font text-gray-700">Loading bus details...</div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="p-8 space-y-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold font-font text-blue-700">Bus Details</h1>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-font text-sm text-gray-600">Bus ID</p>
              <p className="text-lg font-font text-gray-800">{bus.bus_id}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Bus Number</p>
              <p className="text-lg font-font text-gray-800">{bus.bus_number || "N/A"}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Assigned Driver</p>
              <p className="text-lg font-font text-gray-800">
                {bus.drivers
                  ? `${bus.drivers.first_name} ${bus.drivers.second_name}`
                  : "Not Assigned"}
              </p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Route Number</p>
              <p className="text-lg font-font text-gray-800">
                {bus.bus_route_number || "Not Assigned"}
              </p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Capacity</p>
              <p className="text-lg font-font text-gray-800">{bus.capacity || "N/A"}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Maintenance Date</p>
              <p className="text-lg font-font text-gray-800">
                {bus.maintenance_date || "No Maintenance Scheduled"}
              </p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Active Status</p>
              <p className="text-lg font-font text-gray-800">
                {bus.active_status ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          {/* Back to Manage Buses Button */}
          <button
            className="px-6 py-2 bg-blue-600 text-white font-font rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => router.push("/SuperAdmin/Transport/Buses/Manage")}
          >
            Back to Manage Buses
          </button>
        </div>
      </div>
    </Sidebar>
  );
};

export default BusDetails;
