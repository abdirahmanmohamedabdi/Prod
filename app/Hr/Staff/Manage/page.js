"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PaperClipIcon } from "@heroicons/react/solid";
import Sidebar from "../../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../../lib/supabaseClient"; // Ensure correct import path

export default function ManageUsers() {
  const [userList, setUserList] = useState([]); // Store the fetched employees
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Store the selected employee for editing
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('HR'); // Set initial role to 'HR' for testing

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*");

      if (error) {
        console.error("Error fetching employees:", error.message);
        toast.error("Failed to fetch employees");
      } else {
        setUserList(data);
      }
      setLoading(false);
    };

    fetchEmployees();
  }, []);

  const deleteUser = async (id) => {
    const { error } = await supabase
      .from("employees")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting employee:", error.message);
      toast.error("Failed to delete employee");
    } else {
      toast.success("Employee deleted successfully");
      setUserList(userList.filter((user) => user.id !== id));
    }
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    const { error } = await supabase
      .from("employees")
      .update(selectedEmployee)
      .eq("id", selectedEmployee.id);

    if (error) {
      console.error("Error updating employee:", error.message);
      toast.error("Failed to update employee");
    } else {
      toast.success("Employee updated successfully");
      setSelectedEmployee(null);
      // Refresh the employees list
      const { data } = await supabase.from("employees").select("*");
      setUserList(data);
    }
  };

  if (loading) {
    return (
      <Sidebar>
        <div className="min-h-screen bg-gray-100 p-6">
          <ToastContainer />
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Loading...</h1>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium font-font text-gray-900">Manage Users</h3>
          <p className="mt-1 max-w-2xl text-sm font-font text-gray-500">User details and actions.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="divide-y divide-gray-200">
            {userList.map((user) => (
              <div key={user.id} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium font-font text-gray-500">Full name</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow font-font">{user.firstName} {user.secondName}</span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEditClick(user)}
                      className="bg-white rounded-md font-font font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Update
                    </button>
                  </span>
                </dd>
                <dt className="text-sm font-medium font-font text-gray-500">Role</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow font-font">{user.role}</span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEditClick(user)}
                      className="bg-white rounded-md font-font font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Update
                    </button>
                  </span>
                </dd>
                <dt className="text-sm font-medium font-font text-gray-500">Email address</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow font-font">{user.email}</span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEditClick(user)}
                      className="bg-white font-font rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Update
                    </button>
                  </span>
                </dd>
                <dt className="text-sm font-medium font-font text-gray-500">Actions</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="ml-4 flex-shrink-0 flex space-x-4">
                    <a href={`/Hr/Staff/${user.id}`}>
                      <a className="bg-white rounded-md font-font font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        View Details
                      </a>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleEditClick(user)}
                      className="bg-white rounded-md font-font font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Update
                    </button>
                    <span className="text-gray-300" aria-hidden="true">
                      |
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteUser(user.id)}
                      className="bg-white rounded-md font-medium text-red-600 font-font hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {selectedEmployee && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
          <form className="space-y-4 bg-white p-6 shadow rounded-md">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={selectedEmployee.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="secondName" className="block text-sm font-medium text-gray-700">
                Second Name
              </label>
              <input
                type="text"
                id="secondName"
                name="secondName"
                value={selectedEmployee.secondName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={selectedEmployee.dob}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={selectedEmployee.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={selectedEmployee.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
                Emergency Contact
              </label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                value={selectedEmployee.emergencyContact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={selectedEmployee.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Role</option>
                <option value="IT">IT</option>
                <option value="COOK">Cook</option>
                <option value="CLEAN">Clean</option>
                <option value="DRIVER">Driver</option>
                <option value="TEACH">Teach</option>
                <option value="MAINT">Maintenance</option>
              </select>
            </div>
            <div>
              <button
                type="button"
                onClick={handleSaveClick}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </Sidebar>
  );
}