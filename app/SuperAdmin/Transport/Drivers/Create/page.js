"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar";
import supabase from "../../../../lib/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const CreateDriverPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [busId, setBusId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [busList, setBusList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDriversAndBuses = async () => {
      try {
        // Fetch all employees with the role 'DRIVER'
        const { data: driversData, error: driversError } = await supabase
          .from("employees")
          .select("id, firstName, secondName") // Ensure correct column names
          .eq("role", "DRIVER");

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
        setBusList(busesData);
      } catch (error) {
        console.error("Error fetching drivers and buses:", error.message); // Debugging line
        toast.error("Failed to fetch drivers and buses");
      }
    };

    fetchDriversAndBuses();
  }, []);

  const handleDriverChange = (e) => {
    const driverId = e.target.value;
    setSelectedDriver(driverId);

    const selectedDriver = drivers.find((driver) => driver.id === driverId);
    if (selectedDriver) {
      setFirstName(selectedDriver.firstName);
      setSecondName(selectedDriver.secondName);
    } else {
      setFirstName("");
      setSecondName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("drivers").insert([
        {
          id: selectedDriver,
          first_name: firstName,
          second_name: secondName,
          bus_id: busId,
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success("Driver created successfully");
      router.push("/superadmin/transport/drivers/manage");
    } catch (error) {
      console.error("Error creating driver:", error.message);
      toast.error("Failed to create driver");
    }
  };

  return (
    <Sidebar>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold font-font">Create Driver</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-md">
          <div>
            <label className="block text-sm font-font font-medium">Select Driver</label>
            <select
              value={selectedDriver}
              onChange={handleDriverChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Driver</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.firstName} {driver.secondName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-font font-medium">First Name</label>
            <input
              type="text"
              value={firstName}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-font font-medium">Second Name</label>
            <input
              type="text"
              value={secondName}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

         

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow font-font hover:bg-blue-700 transition"
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

export default CreateDriverPage;