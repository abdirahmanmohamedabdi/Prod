"use client";
import { ChevronDownIcon, SearchIcon, SortAscendingIcon } from '@heroicons/react/solid';
import Link from "next/link";
import { useState,useEffect } from "react";
import Layout from '@/app/components/Layout';
export default function StaffPage() {
  // Dummy data for employees
  const employees = [
    {
      id: 1,
      name: "Margot Foster",
      email: "margotfoster@example.com",
      role: "Teacher",
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
      role: "Cook",
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
      role: "Driver",
      about: "Jane is a detail-oriented professional with extensive experience in administrative and operational management.",
      attachments: [
        { name: "NHIF", link: "#" },
        { name: "NSSF", link: "#" },
      ],
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
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
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Layout userRole={userRole}>
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg leading-6 font-font font-medium text-gray-900">Staff Members</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center space-x-4">
          <label htmlFor="desktop-search-candidate font-font" className="sr-only">
            Search
          </label>
          <div className="flex rounded-md shadow-sm space-x-2">
            <div className="relative flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="desktop-search-candidate"
                id="desktop-search-candidate"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  font-font rounded-md pl-10 sm:text-sm border-gray-300"
                placeholder="Search candidates"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              onClick={handleSort}
            >
              <SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="ml-2 font-font">Sort</span>
              <ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-font text-gray-900">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-font text-gray-900">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-font text-gray-900">{employee.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href={`/Hr/Staff/${employee.id}`}>
                    <a className="text-indigo-600 font-font hover:text-indigo-900">View Profile</a>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
}
