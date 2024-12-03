"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PaperClipIcon } from "@heroicons/react/solid";
import Sidebar from "../../../components/Sidebar";

const employees = [
  {
    id: 1,
    name: "Margot Foster",
    email: "margotfoster@example.com",
    role: "HR",
    about: "Margot is an experienced HR professional who has been instrumental in managing recruitment and employee engagement.",
    attachments: [
      { name: "NHIF", link: "#" },
      { name: "NSSF", link: "#" },
    ],
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Finance",
    about: "John has a decade of experience in managing financial records, budgets, and payroll systems.",
    attachments: [
      { name: "NHIF", link: "#" },
      { name: "NSSF", link: "#" },
    ],
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "SuperAdmin",
    about: "Jane is a detail-oriented professional with extensive experience in administrative and operational management.",
    attachments: [
      { name: "NHIF", link: "#" },
      { name: "NSSF", link: "#" },
    ],
  },
];

export default function ManageUsers() {
  const [userList, setUserList] = useState(employees);

  const deleteUser = (id) => {
    setUserList(userList.filter((user) => user.id !== id));
  };
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
                <span className="flex-grow font-font">{user.name}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    type="button"
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
  </Sidebar> 
  );
}