"use client"
import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/outline';

const CreateEmployeePage = () => {
  const [employeeFirstName, setEmployeeFirstName] = useState('');
  const [employeeSecondName, setEmployeeSecondName] = useState('');
  const [employeeRole, setEmployeeRole] = useState('');
  const [employeeType, setEmployeeType] = useState('');
  const [employeeDOB, setEmployeeDOB] = useState('');
  const [employeePhone, setEmployeePhone] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeeEmergencyContact, setEmployeeEmergencyContact] = useState('');
  const [employeeFile, setEmployeeFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to create employee
    console.log('Employee Created:', {
      firstName: employeeFirstName,
      secondName: employeeSecondName,
      role: employeeRole,
      type: employeeType,
      dob: employeeDOB,
      phone: employeePhone,
      email: employeeEmail,
      emergencyContact: employeeEmergencyContact,
      file: employeeFile,
    });
  };

  return (
    <div className="container mx-auto p-6">
     
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Role
          </label>
          <input
            type="text"
            value={employeeRole}
            onChange={(e) => setEmployeeRole(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Type
          </label>
          <select
            value={employeeType}
            onChange={(e) => setEmployeeType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Type</option>
            <option value="maintenance">Maintenance</option>
            <option value="driver">Driver</option>
            <option value="cleaning">Cleaning</option>
            <option value="teacher">Teacher</option>
            <option value="cook">Cook</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={employeePhone}
            onChange={(e) => setEmployeePhone(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload File
          </label>
          <input
            type="file"
            onChange={(e) => setEmployeeFile(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
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
    </div>
  );
};

export default CreateEmployeePage;