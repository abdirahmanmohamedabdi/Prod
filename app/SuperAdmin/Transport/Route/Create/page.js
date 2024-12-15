"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar";
import supabase from "../../../../lib/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const AddRoutePage = () => {
  const [routeName, setRouteName] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [driverId, setDriverId] = useState("");
  const [busId, setBusId] = useState("");
  const [substituteBusId, setSubstituteBusId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [zones, setZones] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDriversBusesAndZones = async () => {
      try {
        // Fetch all drivers
        const { data: driversData, error: driversError } = await supabase
          .from("drivers")
          .select("id, first_name, second_name");

        if (driversError) {
          throw driversError;
        }

        console.log("Fetched drivers:", driversData); // Debugging line
        setDrivers(driversData);

        // Fetch buses
        const { data: busesData, error: busesError } = await supabase
          .from("buses")
          .select("bus_id, bus_number");

        if (busesError) {
          throw busesError;
        }

        console.log("Fetched buses:", busesData); // Debugging line
        setBuses(busesData);

        // Fetch zones
        const { data: zonesData, error: zonesError } = await supabase
          .from("zones")
          .select("id, zone_label, zone_name");

        if (zonesError) {
          throw zonesError;
        }

        console.log("Fetched zones:", zonesData); // Debugging line
        setZones(zonesData);
      } catch (error) {
        console.error("Error fetching drivers, buses, and zones:", error.message);
        toast.error("Failed to fetch drivers, buses, and zones");
      }
    };

    fetchDriversBusesAndZones();
  }, []);

  const handleAddRoute = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("routes").insert([
        {
          route_name: routeName,
          pickup_time: pickupTime,
          drop_off_time: dropOffTime,
          driver_id: driverId,
          bus_id: busId,
          substitute_bus_id: substituteBusId,
          zone_id: zoneId,
        },
      ]);

      if (error) {
        toast.error("Failed to add route");
        console.error("Error adding route:", error);
      } else {
        toast.success("Route added successfully");
        router.push("/SuperAdmin/Transport/Routes");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Unexpected error:", error);
    }
  };

  return (
    <Sidebar>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Add Route</h1>
        <form onSubmit={handleAddRoute}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Route Name</label>
            <input
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pickup Time</label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Drop Off Time</label>
            <input
              type="time"
              value={dropOffTime}
              onChange={(e) => setDropOffTime(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Zone</label>
            <select
              value={zoneId}
              onChange={(e) => setZoneId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Zone</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.zone_label} - {zone.zone_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Driver</label>
            <select
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Driver</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.first_name} {driver.second_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Bus</label>
            <select
              value={busId}
              onChange={(e) => setBusId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Bus</option>
              {buses.map((bus) => (
                <option key={bus.bus_id} value={bus.bus_id}>
                  {bus.bus_number}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Substitute Bus</label>
            <select
              value={substituteBusId}
              onChange={(e) => setSubstituteBusId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Substitute Bus</option>
              {buses.map((bus) => (
                <option key={bus.bus_id} value={bus.bus_id}>
                  {bus.bus_number}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </Sidebar>
  );
};

export default AddRoutePage;