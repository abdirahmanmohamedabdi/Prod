"use client";
import { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { jsPDF } from "jspdf";
import EditStudentModal from "../../../../components/EditStudentModal";
import Sidebar from "../../../../components/Sidebar";
const sampleStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    class: "Class A",
    fee: 100000,
    paid: 80000,
    paymentMethod: "Bank Statement",
    paymentMessage: "Bank statement #12345",
    fullPayment: false,
    semester: "Spring 2023",
    term: "Term 1",
    scholarship: true,
    pastPayments: [
      { amount: 50000, date: "2023-01-15", year: 2023 },
      { amount: 30000, date: "2023-02-15", year: 2023 },
    ],
  },
];

const paymentMethods = [
  { id: 1, name: "Mpesa" },
  { id: 2, name: "Card" },
  { id: 3, name: "Cash" },
];

export default function StudentDetailsPage({ params }) {
  const { id } = params;
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Fetch student details
  useEffect(() => {
    const fetchStudentDetails = () => {
      const fetchedStudent = sampleStudents.find(
        (s) => s.id === parseInt(id)
      );
      if (fetchedStudent) {
        setStudent(fetchedStudent);
      } else {
        console.error("Student not found.");
      }
      setLoading(false);
    };

    fetchStudentDetails();
  }, [id]);

  const handleAddPayment = (payment) => {
    if (!payment.amount || !payment.date) {
      alert("Please enter a valid amount and date.");
      return;
    }
    const updatedStudent = {
      ...student,
      pastPayments: [...student.pastPayments, payment],
      paid: student.paid + parseInt(payment.amount),
    };
    updatedStudent.fullPayment = updatedStudent.paid >= student.fee;
    setStudent(updatedStudent);
  };

  const handleDeletePayment = (index) => {
    const updatedPayments = [...student.pastPayments];
    const deletedPayment = updatedPayments.splice(index, 1);
    const updatedPaidAmount = student.paid - deletedPayment[0].amount;

    const updatedStudent = {
      ...student,
      pastPayments: updatedPayments,
      paid: updatedPaidAmount,
      fullPayment: updatedPaidAmount >= student.fee,
    };

    setStudent(updatedStudent);
  };

  const generateReceipt = () => {
    const doc = new jsPDF();
    doc.text(`Receipt for ${student.name}`, 10, 10);
    doc.text(`Total Paid: Ksh ${student.paid}`, 10, 20);
    doc.text(`Outstanding Balance: Ksh ${student.fee - student.paid}`, 10, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 40);
    doc.save(`${student.name}_receipt.pdf`);
  };

  if (loading) return <div>Loading...</div>;
  if (!student) return <div>Student not found.</div>;

  return (
    <Sidebar>
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm mb-4">
        <a href="/students" className="text-indigo-600 hover:underline">
          Students
        </a>{" "}
        <ChevronRightIcon className="inline-block h-4 w-4 text-gray-400" />
        <span>{student.name}</span>
      </nav>

      {/* Student Info */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
        <p className="text-gray-600">Class: {student.class}</p>
        <p className="text-gray-600">Fee: Ksh {student.fee}</p>
        <p className="text-gray-600">Paid: Ksh {student.paid}</p>
        <p className="text-gray-600">
          Balance: Ksh {student.fee - student.paid}
        </p>
        <p className="text-gray-600">
          Payment Status:{" "}
          <span
            className={`${
              student.fullPayment ? "text-green-600" : "text-red-600"
            } font-semibold`}
          >
            {student.fullPayment ? "Paid in Full" : "Pending"}
          </span>
        </p>
        <p className="text-gray-600">Scholarship: {student.scholarship ? "Yes" : "No"}</p>
      </div>

      {/* Past Payments Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Past Payments</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {student.pastPayments.map((payment, index) => (
              <tr key={index}>
                <td className="px-6 py-4">{payment.date}</td>
                <td className="px-6 py-4">Ksh {payment.amount}</td>
                <td className="px-6 py-4">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDeletePayment(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generate Receipt */}
      <button
        onClick={generateReceipt}
        className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700"
      >
        Generate Receipt
      </button>

      {/* Edit Payment Modal */}
      <EditStudentModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleAddPayment={handleAddPayment}
        paymentMethods={paymentMethods}
      />
    </div>
    </Sidebar>
  );
}
