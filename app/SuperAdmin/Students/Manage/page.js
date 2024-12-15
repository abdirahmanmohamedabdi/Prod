"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon, SearchIcon, SortAscendingIcon } from '@heroicons/react/solid';
import Sidebar from "../../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../../lib/supabaseClient"; // Ensure correct import path

export default function ManageStudentsPage() {
  const [students, setStudents] = useState([]); // Store the fetched students
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedStudent, setSelectedStudent] = useState(null); // Store the selected student for editing

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

  const handleEditClick = (student) => {
    setSelectedStudent(student);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    const { error } = await supabase
      .from("students")
      .update(selectedStudent)
      .eq("id", selectedStudent.id);

    if (error) {
      console.error("Error updating student:", error.message);
      toast.error("Failed to update student");
    } else {
      toast.success("Student updated successfully");
      setSelectedStudent(null);
      // Refresh the students list
      const { data } = await supabase.from("students").select("*");
      setStudents(data);
    }
  };

  const handleDeleteClick = async (id) => {
    const { error } = await supabase
      .from("students")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting student:", error.message);
      toast.error("Failed to delete student");
    } else {
      toast.success("Student deleted successfully");
      setStudents(students.filter((student) => student.id !== id));
    }
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
              className="relative inline-flex items-center px-4 font-font py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              onClick={handleSort}
            >
              <SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="ml-2 font-font">Sort</span>
              <ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium font-font text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium font-font text-gray-500 uppercase tracking-wider">Admission Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium font-font text-gray-500 uppercase tracking-wider">Graduated</th>
                <th className="px-6 py-3 text-left text-xs font-medium font-font text-gray-500 uppercase tracking-wider">Admission Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium font-font text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-font font-medium text-gray-900">{student.first_name} {student.last_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-font font-medium text-gray-900">{student.admission_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-font font-medium text-gray-900">{student.has_graduated ? "Yes" : "No"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-font font-medium text-gray-900">{student.date_joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-font font-medium">
                    <button
                      onClick={() => handleEditClick(student)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(student.id)}
                      className="text-red-600 font-font hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedStudent && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold font-font mb-4">Edit Student</h2>
            <form className="space-y-4 bg-white p-6 shadow rounded-md">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={selectedStudent.first_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-font font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={selectedStudent.last_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 font-font rounded-md"
                />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-font font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={selectedStudent.dob}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="has_graduated" className="block font-font text-sm font-medium text-gray-700">
                  Has Graduated
                </label>
                <input
                  type="checkbox"
                  id="has_graduated"
                  name="has_graduated"
                  checked={selectedStudent.has_graduated}
                  onChange={(e) => setSelectedStudent((prevStudent) => ({
                    ...prevStudent,
                    has_graduated: e.target.checked,
                  }))}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="date_joined" className="block font-font text-sm font-medium text-gray-700">
                  Date Joined
                </label>
                <input
                  type="date"
                  id="date_joined"
                  name="date_joined"
                  value={selectedStudent.date_joined}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleSaveClick}
                  className="w-full bg-indigo-600 text-white px-4 py-2  font-font rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Sidebar>
  );
}