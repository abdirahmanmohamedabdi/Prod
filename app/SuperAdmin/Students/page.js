"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon, SearchIcon, SortAscendingIcon } from '@heroicons/react/solid';
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../lib/supabaseClient"; // Ensure correct import path

export default function ManageStudentsPage() {
  const [students, setStudents] = useState([]); // Store the fetched students
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*");

      if (error) {
        console.error("Error fetching students:", error.message);
        toast.error("Failed to fetch students");
      } else {
        setStudents(data);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = filteredStudents.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.first_name.localeCompare(b.first_name);
    } else {
      return b.first_name.localeCompare(a.first_name);
    }
  });

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-100 p-8">
        <ToastContainer />
        <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-lg leading-6 font-medium font-font text-gray-900">Students</h3>
          <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center space-x-4">
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              onClick={handleSort}
            >
              <SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="ml-2">Sort</span>
              <ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Admission Number</th>
                <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Graduated</th>
                <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Admission Date</th>
                <th className="px-6 py-3 text-right text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap font-font text-sm font-medium text-gray-900">{student.first_name} {student.last_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-font text-sm font-medium text-gray-900">{student.admission_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-font text-sm font-medium text-gray-900">{student.has_graduated ? "Yes" : "No"}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-font text-sm font-medium text-gray-900">{student.date_joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-font text-right text-sm font-medium">
                    <a href={`/SuperAdmin/Students/${student.id}`} className="text-indigo-600 font-font hover:text-indigo-900">View Profile</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
}