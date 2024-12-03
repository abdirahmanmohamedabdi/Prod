"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";

const rolePrefixes = {
  IT: "IT",
  COOK: "COOK",
  CLEAN: "CLEAN",
  DRIVER: "DRIVER",
  TEACH: "TEACH",
  MAINT: "MAINT",
};

let idCounters = {
  IT: 0,
  COOK: 0,
  CLEAN: 0,
  DRIVER: 0,
  TEACH: 0,
  MAINT: 0,
};

function generateEmployeeId(role) {
  const prefix = rolePrefixes[role];
  if (!prefix) {
    throw new Error(`Invalid role: ${role}`);
  }

  idCounters[role]++;
  const uniqueNumber = idCounters[role].toString().padStart(4, "0");
  return `${prefix}${uniqueNumber}`;
}

export default function CreateEmployeePage() {
  const [userRole, setUserRole] = useState("HR");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/user-role");
        const data = await response.json();
        setUserRole(data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const [employeeFirstName, setEmployeeFirstName] = useState("");
  const [employeeSecondName, setEmployeeSecondName] = useState("");
  const [employeeDOB, setEmployeeDOB] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeEmergencyContact, setEmployeeEmergencyContact] = useState("");
  const [employeeFile, setEmployeeFile] = useState(null);
  const [employeeRole, setEmployeeRole] = useState("TEACH");
  const [employeeId, setEmployeeId] = useState("");

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setEmployeeRole(selectedRole);
    const newEmployeeId = generateEmployeeId(selectedRole);
    setEmployeeId(newEmployeeId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", employeeFirstName);
    formData.append("secondName", employeeSecondName);
    formData.append("dob", employeeDOB);
    formData.append("phone", employeePhone);
    formData.append("email", employeeEmail);
    formData.append("emergencyContact", employeeEmergencyContact);
    formData.append("file", employeeFile);
    formData.append("role", employeeRole);
    formData.append("employeeId", employeeId);

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Employee created successfully");
      } else {
        console.error("Error creating employee");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <Sidebar>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Employee</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="first-name"
                value={employeeFirstName}
                onChange={(e) => setEmployeeFirstName(e.target.value)}
                placeholder="John"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
              />
            </div>
          </div>

          {/* Second Name */}
          <div>
            <label htmlFor="second-name" className="block text-sm font-medium text-gray-700">
              Second Name
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="second-name"
                value={employeeSecondName}
                onChange={(e) => setEmployeeSecondName(e.target.value)}
                placeholder="Doe"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="date"
                id="dob"
                value={employeeDOB}
                onChange={(e) => setEmployeeDOB(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="tel"
                id="phone"
                value={employeePhone}
                onChange={(e) => setEmployeePhone(e.target.value)}
                placeholder="0712345678"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="email"
                id="email"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                placeholder="example@example.com"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <label htmlFor="emergency-contact" className="block text-sm font-medium text-gray-700">
              Emergency Contact
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="emergency-contact"
                value={employeeEmergencyContact}
                onChange={(e) => setEmployeeEmergencyContact(e.target.value)}
                placeholder="Emergency contact details"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
              Upload Documents
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="file"
                id="file-upload"
                onChange={(e) => setEmployeeFile(e.target.files[0])}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Select Role
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <select
                id="role"
                value={employeeRole}
                onChange={handleRoleChange}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
              >
                <option value="IT">IT</option>
                <option value="COOK">Cook</option>
                <option value="CLEAN">Cleaner</option>
                <option value="DRIVER">Driver</option>
                <option value="TEACH">Teacher</option>
                <option value="MAINT">Maintenance</option>
              </select>
            </div>
          </div>

          {/* Generated Employee ID */}
          {employeeId && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Generated Employee ID</label>
              <p className="mt-1 text-lg font-bold text-indigo-600">{employeeId}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
      </Sidebar>
  
  );
}
