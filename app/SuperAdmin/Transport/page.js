"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import supabase from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { UsersIcon, TruckIcon, MapIcon } from "@heroicons/react/outline";

const TransportDashboard = () => {
  const [buses, setBuses] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [busesData, driversData, routesData] = await Promise.all([
          supabase.from("buses").select("*"),
          supabase.from("drivers").select("*"),
          supabase.from("routes").select("*, zones:zone_id (id, zone_label, zone_name)"),
        ]);

        if (busesData.error || driversData.error || routesData.error) {
          throw new Error("Error fetching data");
        }

        setBuses(busesData.data);
        setDrivers(driversData.data);
        setRoutes(routesData.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Sidebar>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg font-font text-gray-700">Loading transport data...</div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="p-8 space-y-8">
        <h1 className="text-3xl font-semibold font-font text-blue-700">Transport Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <TruckIcon className="h-8 w-8 text-blue-500" />
              <h2 className="text-xl font-semibold font-font text-gray-700">Buses</h2>
            </div>
            <ul className="mt-4 space-y-2">
              {buses.map((bus) => (
                <li key={bus.bus_id} className="text-gray-800">
                  <div className="flex justify-between items-center">
                    <span>{bus.bus_number} - {bus.capacity} seats</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${bus.active_status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {bus.active_status ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <UsersIcon className="h-8 w-8 text-blue-500" />
              <h2 className="text-xl font-semibold font-font text-gray-700">Drivers</h2>
            </div>
            <ul className="mt-4 space-y-2">
              {drivers.map((driver) => (
                <li key={driver.id} className="text-gray-800">
                  {driver.first_name} {driver.second_name}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <MapIcon className="h-8 w-8 text-blue-500" />
              <h2 className="text-xl font-semibold font-font text-gray-700">Routes</h2>
            </div>
            <ul className="mt-4 space-y-2">
              {routes.map((route) => (
                <li key={route.id} className="text-gray-800">
                  <div>
                    <span className="font-semibold">{route.route_name}</span>
                    <ul className="ml-4 mt-2 space-y-1">
                      {console.log("Zones for route:", route.route_name, route.zones)}
                      {Array.isArray(route.zones) ? (
                        route.zones.length > 0 ? (
                          route.zones.map((zone) => (
                            <li key={zone.id} className="text-gray-600">
                              <a href={`/SuperAdmin/Transport/Route/${route.id}`} className="text-blue-500 hover:underline">
                                {zone.zone_label}
                              </a>
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-600">No zones available</li>
                        )
                      ) : (
                        <li className="text-gray-600">{route.zones.zone_label}</li>
                      )}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default TransportDashboard;