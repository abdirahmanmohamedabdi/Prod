"use client";
import React, { useState, useEffect } from 'react';

import {
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon,
  BellIcon,
} from "@heroicons/react/outline";
import Layout from "@/app/components/Layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
const userRole = "HR";
import "react-calendar/dist/Calendar.css";   
export default function HrAdminDashboard() {
  const [userRole, setUserRole] = useState('HR'); // Set initial role to 'HR' for testing

  useEffect(() => {
    // Fetch user role from an API or another source
    const fetchUserRole = async () => {
      try {
        const response = await fetch('/api/user-role');
        const data = await response.json();
        setUserRole(data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);
  const events = [
    { title: "Staff Meeting", date: "2024-11-22" },
    { title: "Teacher Training", date: "2024-11-25" },
  ];
  return (
    <Layout userRole={userRole}>
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-font text-gray-800">HR Admin Dashboard</h1>
        <p className="text-sm font-font text-gray-600">
          Overview of staff management and HR operations.
        </p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Staff */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <UserGroupIcon className="h-8 w-8 text-indigo-500" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold font-font text-gray-800">Teachers</h2>
            <p className="text-2xl font-bold font-font text-gray-900">120</p>
          </div>
        </div>
        {/* Pending Leaves */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <UserGroupIcon className="h-8 w-8 text-yellow-500" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold font-font text-gray-800">
              Staff
            </h2>
            <p className="text-2xl font-bold font-font text-gray-900">5</p>
          </div>
        </div>
  
     
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
       

        {/* Calendar */}
       
    </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold font-font text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <button className="bg-indigo-500 text-white font-font px-4 py-2 rounded-mdg shadow hover:bg-indigo-600">
            Add Staff
          </button>
         
         
          <button className="bg-red-500 text-white font-font px-4 py-2 rounded-md shadow hover:bg-red-600">
            Delete Staff
          </button>
        </div>
      </div>
    </div>
  </Layout>
  );
}
