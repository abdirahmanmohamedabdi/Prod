"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';

export default function CreateEmployeePage() {
  const [userRole, setUserRole] = useState('Finance'); // Set initial role to 'HR' for testing

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

  const [employeeFirstName, setEmployeeFirstName] = useState('');
  const [employeeSecondName, setEmployeeSecondName] = useState('');
  const [employeeType, setEmployeeType] = useState('');
  const [employeeDOB, setEmployeeDOB] = useState('');
  const [employeePhone, setEmployeePhone] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeeEmergencyContact, setEmployeeEmergencyContact] = useState('');
  const [employeeFile, setEmployeeFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', employeeFirstName);
    formData.append('secondName', employeeSecondName);
    formData.append('type', employeeType);
    formData.append('dob', employeeDOB);
    formData.append('phone', employeePhone);
    formData.append('email', employeeEmail);
    formData.append('emergencyContact', employeeEmergencyContact);
    formData.append('file', employeeFile);

    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle successful response
        console.log('Employee created successfully');
      } else {
        // Handle error response
        console.error('Error creating employee');
      }
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <Sidebar >
      <div className="p-6">
        <h1 className="text-2xl font-font font-bold">Add employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-font text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              value={employeeFirstName}
              onChange={(e) => setEmployeeFirstName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-font text-sm font-bold mb-2">
              Second Name
            </label>
            <input
              type="text"
              value={employeeSecondName}
              onChange={(e) => setEmployeeSecondName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-font text-sm font-bold mb-2">
              Type
            </label>
            <input
              type="text"
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-font text-sm font-bold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={employeeDOB}
              onChange={(e) => setEmployeeDOB(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-font text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={employeePhone}
              onChange={(e) => setEmployeePhone(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-font text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-font text-sm font-bold mb-2">
              Emergency Contact
            </label>
            <input
              type="text"
              value={employeeEmergencyContact}
              onChange={(e) => setEmployeeEmergencyContact(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-font text-sm font-bold mb-2">
              Upload Documents
            </label>
            <input
              type="file"
              onChange={(e) => setEmployeeFile(e.target.files[0])}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300 rounded-md"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-one hover:bg-blue-700 font-font text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Sidebar>
  );
}

