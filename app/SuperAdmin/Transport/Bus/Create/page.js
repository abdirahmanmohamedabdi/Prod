"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar";
import supabase from "../../../../lib/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const AddBusPage = () => {
  const [busNumber, setBusNumber] = useState("");
  const [driverBusId, setDriverBusId] = useState("");
  const [busRouteNumber, setBusRouteNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");
  const [activeStatus, setActiveStatus] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDrivers = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("role", "DRIVER");
      if (error) {
        console.error("Error fetching drivers:", error);
      } else {
        setDrivers(data);
      }
    };

    fetchDrivers();
  }, []);

  const handleAddBus = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("buses").insert([
        {
          bus_number: busNumber,
          driver_bus_id: driverBusId,
          bus_route_number: busRouteNumber,
          capacity: parseInt(capacity),
          maintenance_date: maintenanceDate,
          active_status: activeStatus,
        },
      ]);

      if (error) {
        toast.error("Failed to add bus");
        console.error("Error adding bus:", error);
      } else {
        toast.success("Bus added successfully");
        router.push("/superadmin/transport/buses");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Unexpected error:", error);
    }
  };

  return (
    <Sidebar>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Add Bus</h1>
        <form onSubmit={handleAddBus}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Bus Number</label>
            <input
              type="text"
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Driver</label>
            <select
              value={driverBusId}
              onChange={(e) => setDriverBusId(e.target.value)}
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Route Number</label>
            <input
              type="text"
              value={busRouteNumber}
              onChange={(e) => setBusRouteNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Capacity</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Maintenance Date</label>
            <input
              type="date"
              value={maintenanceDate}
              onChange={(e) => setMaintenanceDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Active Status</label>
            <select
              value={activeStatus}
              onChange={(e) => setActiveStatus(e.target.value === "true")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
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

export default AddBusPage;