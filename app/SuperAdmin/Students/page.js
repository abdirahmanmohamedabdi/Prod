"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const sampleStudents = [
  { id: 1, name: "Alice Johnson", dob: "2005-06-15", dateJoined: "2020-09-01", graduated: false },
  { id: 2, name: "Ethan Brown", dob: "2007-04-20", dateJoined: "2021-03-15", graduated: false },
  { id: 3, name: "Sophia Davis", dob: "2006-11-30", dateJoined: "2019-01-10", graduated: true },
  { id: 4, name: "Liam Wilson", dob: "2008-02-25", dateJoined: "2022-05-20", graduated: false },
  { id: 5, name: "Olivia Martinez", dob: "2005-08-12", dateJoined: "2020-07-14", graduated: true },
  { id: 6, name: "Noah Anderson", dob: "2006-09-05", dateJoined: "2019-11-22", graduated: false },
  { id: 7, name: "Isabella Thomas", dob: "2007-12-18", dateJoined: "2021-06-30", graduated: false },
  { id: 8, name: "Mason Jackson", dob: "2008-03-10", dateJoined: "2022-08-25", graduated: false },
  { id: 9, name: "Mia White", dob: "2005-10-22", dateJoined: "2020-02-17", graduated: true },
  { id: 10, name: "James Harris", dob: "2006-07-08", dateJoined: "2019-04-05", graduated: false },
  { id: 11, name: "Ava Clark", dob: "2007-01-14", dateJoined: "2021-09-12", graduated: false },
  { id: 12, name: "Lucas Lewis", dob: "2008-05-19", dateJoined: "2022-11-03", graduated: false },
  { id: 13, name: "Amelia Robinson", dob: "2005-11-27", dateJoined: "2020-06-21", graduated: true },
  { id: 14, name: "Benjamin Walker", dob: "2006-03-03", dateJoined: "2019-08-09", graduated: false },
  { id: 15, name: "Charlotte Hall", dob: "2007-09-29", dateJoined: "2021-12-15", graduated: false },
];

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    setStudents(sampleStudents);
  }, []);

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === "dateJoined") {
        comparison = new Date(a.dateJoined) - new Date(b.dateJoined);
      } else if (sortField === "graduated") {
        comparison = a.graduated === b.graduated ? 0 : a.graduated ? -1 : 1;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const nextPage = () => {
    if (indexOfLastStudent < filteredStudents.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Student Management</h1>

      {/* Search and Sort Controls */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 w-full sm:w-1/3"
        />
        <div className="flex space-x-4">
          <button
            onClick={() => handleSort("name")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Sort by Name {sortField === "name" && (sortOrder === "asc" ? "↓" : "↑")}
          </button>
          <button
            onClick={() => handleSort("dateJoined")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Sort by Recently Added {sortField === "dateJoined" && (sortOrder === "asc" ? "↓" : "↑")}
          </button>
          <button
            onClick={() => handleSort("graduated")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Sort by Graduated {sortField === "graduated" && (sortOrder === "asc" ? "↓" : "↑")}
          </button>
        </div>
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
            {currentStudents.map((student) => (
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
                    href={`/SuperAdmin/Students/${student.id}`}
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

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={indexOfLastStudent >= filteredStudents.length}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}