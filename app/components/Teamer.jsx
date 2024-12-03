"use client";
import { useState } from "react";

const departments = [
  { name: "Human Resources", employeeCount: 10, onLeave: 2 },
  { name: "Finance", employeeCount: 8, onLeave: 1 },
  { name: "IT", employeeCount: 12, onLeave: 3 },
  { name: "Marketing", employeeCount: 7, onLeave: 0 },
];

const employeeStats = {
  totalEmployees: 37,
  activeEmployees: 31,
  onLeave: 6,
};

export default function Teamer() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">HR Overview</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Employees</h2>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {employeeStats.totalEmployees}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Active Employees</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {employeeStats.activeEmployees}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">On Leave</h2>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {employeeStats.onLeave}
          </p>
        </div>
      </div>

      {/* Department Overview */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Department Overview</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Employees
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                On Leave
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Active Employees
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.map((dept, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {dept.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {dept.employeeCount}
                </td>
                <td className="px-6 py-4 text-sm text-yellow-500">
                  {dept.onLeave}
                </td>
                <td className="px-6 py-4 text-sm text-green-600">
                  {dept.employeeCount - dept.onLeave}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
