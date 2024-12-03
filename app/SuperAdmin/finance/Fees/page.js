"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../../../components/Sidebar";
const sampleStudents = [
  { id: 1, name: "Alice Johnson", class: "Class A", fee: 1000, paid: 800, paymentMethod: "Bank Statement", paymentMessage: "Bank statement #12345", fullPayment: false },
  { id: 2, name: "Ethan Brown", class: "Class B", fee: 1200, paid: 1200, paymentMethod: "MPESA Code", paymentMessage: "MPESA code #67890", fullPayment: true },
  { id: 3, name: "Sophia Davis", class: "Class A", fee: 900, paid: 900, paymentMethod: "Bank Statement", paymentMessage: "Bank statement #54321", fullPayment: true },
  { id: 4, name: "Liam Wilson", class: "Class C", fee: 1100, paid: 500, paymentMethod: "MPESA Code", paymentMessage: "MPESA code #09876", fullPayment: false },
  { id: 5, name: "Olivia Martinez", class: "Class B", fee: 1300, paid: 1300, paymentMethod: "Bank Statement", paymentMessage: "Bank statement #11223", fullPayment: true },
  { id: 6, name: "Noah Anderson", class: "Class A", fee: 1000, paid: 1000, paymentMethod: "MPESA Code", paymentMessage: "MPESA code #44556", fullPayment: true },
  { id: 7, name: "Isabella Thomas", class: "Class C", fee: 1200, paid: 600, paymentMethod: "Bank Statement", paymentMessage: "Bank statement #77889", fullPayment: false },
  { id: 8, name: "Mason Jackson", class: "Class B", fee: 1100, paid: 1100, paymentMethod: "MPESA Code", paymentMessage: "MPESA code #99001", fullPayment: true },
  { id: 9, name: "Mia White", class: "Class A", fee: 900, paid: 900, paymentMethod: "Bank Statement", paymentMessage: "Bank statement #22334", fullPayment: true },
  { id: 10, name: "James Harris", class: "Class C", fee: 1000, paid: 700, paymentMethod: "MPESA Code", paymentMessage: "MPESA code #55667", fullPayment: false },
];

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [fullPayment, setFullPayment] = useState(false);
  const studentsPerPage = 5;

  useEffect(() => {
    setStudents(sampleStudents);
  }, []);

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleMarkAsPaid = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, paid: student.fee } : student
    );
    setStudents(updatedStudents);
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = (student) => {
    setSelectedStudent(student);
    setShowConfirmModal(true);
  };

  const handlePaymentMessageSubmit = () => {
    // Handle the payment message submission logic here
    console.log(`Payment confirmed for ${selectedStudent.name}: ${paymentMessage}`);
    setShowPaymentModal(false);
    setPaymentMessage("");
    setPaymentConfirmed(true);
  };

  const filteredStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === "class") {
        comparison = a.class.localeCompare(b.class);
      } else if (sortField === "fee") {
        comparison = a.fee - b.fee;
      } else if (sortField === "paid") {
        comparison = a.paid - b.paid;
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
    <Sidebar>
    <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Student Management</h1>
  
    {/* Search and Sort Controls */}
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <div className="relative w-full sm:w-1/3">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 py-2 pl-4 pr-10 text-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 shadow-sm hover:border-indigo-400 transition-all"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11l2 2-2 2M19 12H5"
          />
        </svg>
      </div>
  
      <div className="flex space-x-4">
        <button
          onClick={() => handleSort("name")}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
        >
          Sort by Name
          {sortField === "name" && (sortOrder === "asc" ? " ↓" : " ↑")}
        </button>
        <button
          onClick={() => handleSort("class")}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
        >
          Sort by Class
          {sortField === "class" && (sortOrder === "asc" ? " ↓" : " ↑")}
        </button>
        <button
          onClick={() => handleSort("fee")}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
        >
          Sort by Fee
          {sortField === "fee" && (sortOrder === "asc" ? " ↓" : " ↑")}
        </button>
        <button
          onClick={() => handleSort("paid")}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
        >
          Sort by Paid
          {sortField === "paid" && (sortOrder === "asc" ? " ↓" : " ↑")}
        </button>
      </div>
    </div>
      {/* Student List */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Class
        </th>
        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Fee
        </th>
        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Paid
        </th>
        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Balance
        </th>
        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Payment Method
        </th>
        <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {currentStudents.map((student, index) => (
        <tr
          key={student.id}
          className={`${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          } hover:bg-indigo-50`}
        >
          <td className="py-4 px-6 text-sm font-medium text-gray-900">
            {student.name}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500">{student.class}</td>
          <td className="py-4 px-6 text-sm text-gray-500">Ksh {student.fee}</td>
          <td className="py-4 px-6 text-sm text-gray-500">Ksh {student.paid}</td>
          <td className="py-4 px-6 text-sm text-gray-500">
            Ksh {student.fee - student.paid}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500">
            {student.paymentMethod}
          </td>
          <td className="py-4 px-6 text-right">
            <div className="flex space-x-2 justify-end">
              <button
                onClick={() => handleConfirmPayment(student)}
                className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold text-sm rounded-lg shadow-md hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Mark as Paid
              </button>
              <Link href={`/SuperAdmin/finance/Fees/${student.id}`}>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold text-sm rounded-lg shadow-md hover:from-blue-500 hover:to-blue-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300">
                  View Profile
                </span>
              </Link>
            </div>
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

      {/* Confirm Payment Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 sm:mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Payment</h3>
            <p>Are you sure you want to mark the fee as paid for {selectedStudent?.name}?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleMarkAsPaid(selectedStudent.id);
                  setShowConfirmModal(false);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Message Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 sm:mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Confirmation</h3>
            <textarea
              value={paymentMessage}
              onChange={(e) => setPaymentMessage(e.target.value)}
              placeholder="Enter bank statement or MPESA code"
              className="border rounded-md p-2 w-full mb-4"
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={fullPayment}
                onChange={(e) => setFullPayment(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="fullPayment" className="ml-2 block text-sm text-gray-900">
                Paid in Full
              </label>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handlePaymentMessageSubmit();
                  setShowPaymentModal(false);
                  alert(`Payment confirmed for ${selectedStudent?.name}`);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
            {paymentConfirmed && (
              <div className="mt-4 text-green-500 font-bold">
                Payment confirmed for {selectedStudent?.name}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </Sidebar>
  );
}