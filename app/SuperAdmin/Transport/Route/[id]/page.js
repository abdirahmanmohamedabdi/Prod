"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar";
import supabase from "../../../../lib/supabaseClient";
import { useRouter, useParams } from "next/navigation";

const RouteDetails = () => {
  const [route, setRoute] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("routes")
          .select(`
            id,
            route_name,
            pickup_time,
            drop_off_time,
            zone_id,
            driver_id,
            bus_id,
            substitute_bus_id,
            buses:bus_id (
              bus_number,
              capacity,
              driver_bus_id (
                employeeId
              )
            ),
            substitute_buses:substitute_bus_id (
              bus_number,
              capacity
            )
          `)
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        console.log("Fetched route details:", data); // Debugging line
        setRoute(data);
      } catch (error) {
        console.error("Error fetching route details:", error.message);
      }
    };

    fetchRouteDetails();
  }, [id]);

  if (!route) {
    return (
      <Sidebar>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg font-font text-gray-700">Loading route details...</div>
        </div>
      </Sidebar>
    );
  }

  const handleDriverClick = (driverId) => {
    router.push(`/Hr/Staff/${driverId}`);
  };

  return (
    <Sidebar>
      <div className="p-8 space-y-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold font-font text-blue-700">Route Details</h1>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-font text-sm text-gray-600">Route Name</p>
              <p className="text-lg font-font text-gray-800">{route.route_name}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Pickup Time</p>
              <p className="text-lg font-font text-gray-800">{route.pickup_time}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Drop Off Time</p>
              <p className="text-lg font-font text-gray-800">{route.drop_off_time}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Zone</p>
              <p className="text-lg font-font text-gray-800">{route.zone_id}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Driver ID</p>
              <p
                className="text-lg font-font text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleDriverClick(route.driver_id)}
              >
                Details
              </p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Bus Number</p>
              <p className="text-lg font-font text-gray-800">{route.buses.bus_number}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Bus Capacity</p>
              <p className="text-lg font-font text-gray-800">{route.buses.capacity}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Bus Driver Employee ID</p>
              <p className="text-lg font-font text-gray-800">{route.buses.driver_bus_id.employeeId}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Substitute Bus Number</p>
              <p className="text-lg font-font text-gray-800">{route.substitute_buses.bus_number}</p>
            </div>
            <div>
              <p className="font-font text-sm text-gray-600">Substitute Bus Capacity</p>
              <p className="text-lg font-font text-gray-800">{route.substitute_buses.capacity}</p>
            </div>
          </div>
        </div>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() => router.push("/SuperAdmin/Transport/Route/Manage")}
        >
          Back to Manage Routes
        </button>
      </div>
    </Sidebar>
  );
};

export default RouteDetails;