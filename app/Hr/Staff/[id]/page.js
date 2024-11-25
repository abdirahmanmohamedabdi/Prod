"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PaperClipIcon } from "@heroicons/react/solid";
import Layout from "@/app/components/Layout";

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

export default function EmployeeDetails() {
  const params = useParams(); // Retrieve the dynamic `id` from the URL
  const employeeId = parseInt(params.id, 10);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    // Simulate fetching employee data from an API
    const fetchEmployee = async () => {
      try {
        console.log("Fetching employee with ID:", employeeId); // Debugging log
        const employeeData = employees.find((emp) => emp.id === employeeId);
        if (!employeeData) {
          throw new Error("Employee not found");
        }
        setEmployee(employeeData);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  if (!employee) {
    return <p className="text-center text-gray-500 mt-10">Employee not found</p>;
  }

  return (
    <Layout userRole={userRole}>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Employee Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.role}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.email}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.about}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Attachments</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {employee.attachments && employee.attachments.map((attachment) => (
                    <li key={attachment.name} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-2 flex-1 w-0 truncate">{attachment.name}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href={attachment.link} className="font-medium text-indigo-600 hover:text-indigo-500" download>
                          Download
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Layout>
  );
}