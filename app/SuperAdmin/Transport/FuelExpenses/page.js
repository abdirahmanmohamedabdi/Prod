"use client";
import React from 'react';
import Sidebar from '../../../components/Sidebar';
import Link from 'next/link';

const FuelExpenseDashboard = () => {
  return (
    <Sidebar>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Fuel Expense Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <a href="/SuperAdmin/Transport/FuelExpenses/Create">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline">
              Create Fuel Expense
            </a>
          </a>
          <a href="/SuperAdmin/Transport/FuelExpenses/Manage">
            <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline">
              Manage Fuel Expenses
            </a>
          </a>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Detailed Information</h2>
          <p className="text-gray-700">Here you can add more detailed information about the transport management system, such as recent activities, notifications, or any other relevant data.</p>
        </div>
      </div>
    </Sidebar>
  );
};

export default FuelExpenseDashboard;