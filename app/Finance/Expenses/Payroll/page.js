"use client";
import { useState,useEffect } from "react";
import { jsPDF } from "jspdf";
import { PaperClipIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Sidebar from "../../../components/Sidebar";
const employees = [
  {
    id: "EMP001",
    name: "John Doe",
    department: "Finance",
    basicSalary: 50000,
    allowances: 10000,
    deductions: [
      { type: "NHIF", amount: 1200 },
      { type: "NSSF", amount: 600 },
    ],
    attachments: [
      { name: "NHIF Statement.pdf", link: "/files/nhif-statement.pdf" },
      { name: "NSSF Statement.pdf", link: "/files/nssf-statement.pdf" },
    ],
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    department: "Human Resources",
    basicSalary: 60000,
    allowances: 15000,
    deductions: [
      { type: "NHIF", amount: 1400 },
      { type: "NSSF", amount: 800 },
    ],
    attachments: [
      { name: "NHIF Receipt.pdf", link: "/files/nhif-receipt.pdf" },
    ],
  },
  {
    id: "EMP003",
    name: "Lindsey Willims",
    department: "Maintenance",
    basicSalary: 70000,
    allowances: 12000,
    deductions: [
      { type: "NHIF", amount: 1300 },
      { type: "NSSF", amount: 700 },
    ],
    attachments: [],
  },
  {
    id: "EMP008",
    name: "Davis Williams",
    department: "Cleaner",
    basicSalary: 55000,
    allowances: 11000,
    deductions: [
      { type: "NHIF", amount: 1100 },
      { type: "NSSF", amount: 500 },
    ],
    attachments: [
      { name: "NSSF Contributions.pdf", link: "/files/nssf-contributions.pdf" },
    ],
  },
  {
    id: "EMP006",
    name: "Daniel John",
    department: "Driver",
    basicSalary: 60000,
    allowances: 15000,
    deductions: [
      { type: "NHIF", amount: 1400 },
      { type: "NSSF", amount: 800 },
    ],
    attachments: [
      { name: "NHIF Receipt.pdf", link: "/files/nhif-receipt.pdf" },
    ],
  },
  {
    id: "EMP008",
    name: "Ali Khan",
    department: "Cook",
    basicSalary: 60000,
    allowances: 15000,
    deductions: [
      { type: "NHIF", amount: 1400 },
      { type: "NSSF", amount: 800 },
    ],
    attachments: [
      { name: "NHIF Receipt.pdf", link: "/files/nhif-receipt.pdf" },
    ],
  },
];

export default function PayslipPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('Finance'); 
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
  // Fetch Users (Replace this with your backend API)
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Placeholder for API call to fetch users
        const fetchedUsers = [
          { id: 1, name: "John Doe", email: "john@example.com", role: "Hr", password: "password123" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Finance", password: "password123" },
          { id: 3, name: "Admin User", email: "admin@example.com", role: "Superadmin", password: "password123" },
        ];
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePayslip = () => {
    if (!selectedEmployee) {
      alert("Please select an employee to generate the payslip.");
      return;
    }

    const {
      id,
      name,
      department,
      basicSalary,
      allowances,
      deductions,
    } = selectedEmployee;

    const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
    const netSalary = basicSalary + allowances - totalDeductions;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Employee Payslip", 10, 10);
    doc.setFontSize(12);
    doc.text(`Employee ID: ${id}`, 10, 20);
    doc.text(`Name: ${name}`, 10, 30);
    doc.text(`Department: ${department}`, 10, 40);
    doc.text(`Basic Salary: Ksh ${basicSalary.toLocaleString()}`, 10, 50);
    doc.text(`Allowances: Ksh ${allowances.toLocaleString()}`, 10, 60);
    doc.text(`Deductions: Ksh ${totalDeductions.toLocaleString()}`, 10, 70);
    deductions.forEach((deduction, index) => {
      doc.text(
        `${deduction.type}: Ksh ${deduction.amount.toLocaleString()}`,
        10,
        80 + index * 10
      );
    });
    doc.text(`Net Salary: Ksh ${netSalary.toLocaleString()}`, 10, 100 + deductions.length * 10);
    doc.save(`${name}_Payslip.pdf`);
  };

  return (
    <Sidebar>
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold font-font text-gray-800 mb-6">Payslip Management</h1>

      {/* Breadcrumb */}
     
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 w-full sm:w-1/3"
        />
      </div>

      {/* Employee Selection */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 font-font  mb-4">Select Employee</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className={`p-4 rounded-lg shadow font-font  cursor-pointer ${
                selectedEmployee?.id === employee.id
                  ? "bg-indigo-100 border-2 border-indigo-600"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setSelectedEmployee(employee)}
            >
              <h3 className="text-lg font-semibold font-font  text-gray-700">
                {employee.name}
              </h3>
              <p className="text-gray-600 font-font ">ID: {employee.id}</p>
              <p className="text-gray-600 font-font ">{employee.department}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payslip Details */}
      {selectedEmployee && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold font-font  text-gray-800 mb-4">Payslip Details</h2>
          <p className="text-gray-600 font-font">
            <span className="font-semibold font-font ">Employee ID:</span> {selectedEmployee.id}
          </p>
          <p className="text-gray-600 font-font">
            <span className="font-semibold font-font ">Name:</span> {selectedEmployee.name}
          </p>
          <p className="text-gray-600 font-font">
            <span className="font-semibold font-font ">Department:</span>{" "}
            {selectedEmployee.department}
          </p>
          <p className="text-gray-600 font-font">
            <span className="font-semibold font-font ">Basic Salary:</span> Ksh{" "}
            {selectedEmployee.basicSalary.toLocaleString()}
          </p>
          <p className="text-gray-600 font-font">
            <span className="font-semibold font-font ">Allowances:</span> Ksh{" "}
            {selectedEmployee.allowances.toLocaleString()}
          </p>
          <p className="text-gray-600 font-semibold mt-4 font-font ">Deductions:</p>
          <ul className="ml-4 list-disc">
            {selectedEmployee.deductions.map((deduction, index) => (
              <li key={index} className="text-gray-600 font-font ">
                {deduction.type}: Ksh {deduction.amount.toLocaleString()}
              </li>
            ))}
          </ul>
          <p className="text-gray-600 mt-4">
            <span className="font-semibold font-font ">Net Salary:</span>{" "}
            <span className="text-green-600 font-font font-bold">
              Ksh{" "}
              {(
                selectedEmployee.basicSalary +
                selectedEmployee.allowances -
                selectedEmployee.deductions.reduce((sum, item) => sum + item.amount, 0)
              ).toLocaleString()}
            </span>
          </p>

          {/* Attachments */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 font-font ">Attachments</h3>
            <ul
              role="list"
              className="border border-gray-200 rounded-md divide-y divide-gray-200 mt-2"
            >
              {selectedEmployee.attachments.map((attachment, index) => (
                <li
                  key={index}
                  className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                >
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2 flex-1 w-0 font-font  truncate">
                      {attachment.name}
                    </span>
                  </div>
                  <div className="ml-4 font-font  flex-shrink-0">
                    <a
                      href={attachment.link}
                      className="font-medium text-indigo-600 font-font  hover:text-indigo-500"
                      download
                    >
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Generate Payslip Button */}
      <button
        onClick={generatePayslip}
        className="w-full bg-indigo-600 text-white font-font  px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700"
      >
        Generate Payslip
      </button>
    </div>
    </Sidebar>
  );
}
