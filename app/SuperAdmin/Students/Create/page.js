"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from '../components/Layout';
export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch students (mocked for now)
  useEffect(() => {
    const fetchStudents = async () => {
      const sampleStudents = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        dob: `200${i % 10}-0${(i % 12) + 1}-1${i % 9}`,
        dateJoined: `202${i % 5}-0${(i % 9) + 1}-1${(i % 2) + 1}`,
        graduated: i % 3 === 0,
      }));
      setStudents(sampleStudents);
    };
    fetchStudents();
  }, []);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === "asc" ? comparison : -comparison;
    });

  return (
    <Layout>
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Student Management</h1>

      {/* Search and Sort Controls */}
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 w-full sm:w-1/3"
        />
        <button
          onClick={handleSort}
          className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Sort {sortOrder === "asc" ? "↓" : "↑"}
        </button>
      </div>

      {/* Student List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Date of Birth
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Date Joined
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase">
                Graduated
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.dob}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.dateJoined}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                  <input type="checkbox" checked={student.graduated} readOnly />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <Link
                    href={`/students/${student.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </Link>
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
