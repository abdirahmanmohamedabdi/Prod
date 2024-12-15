"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PaperClipIcon } from "@heroicons/react/solid";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../lib/supabaseClient"; // Ensure correct import path

export default function EmployeeDetailsPage() {
  const { id } = useParams(); // Get the id parameter from the URL
  const [employee, setEmployee] = useState(null); // Store the fetched employee
  const [documents, setDocuments] = useState([]); // Store documents
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching employee:", error.message);
        toast.error("Failed to fetch employee");
      } else {
        setEmployee(data);
        // Ensure fileUrl is an array
        const fileUrls = Array.isArray(data.fileUrl) ? data.fileUrl : data.fileUrl ? data.fileUrl.split(",") : [];
        setDocuments(fileUrls);
      }
      setLoading(false);
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <Sidebar>
        <div className="min-h-screen bg-gray-100 p-6">
          <ToastContainer />
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Loading...</h1>
        </div>
      </Sidebar>
    );
  }

  if (!employee) {
    return (
      <Sidebar>
        <div className="min-h-screen bg-gray-100 p-6">
          <ToastContainer />
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee not found</h1>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-font font-medium text-gray-900">Employee Information</h3>
          <p className="mt-1 max-w-2xl text-sm font-font text-gray-500">Personal details and application.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium font-font text-gray-500">Employee ID</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{employee.employeeId}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium font-font text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{employee.firstName} {employee.secondName}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium font-font text-gray-500">Files</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {documents.map((doc, index) => (
                    <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-2 flex-1 w-0 font-medium truncate">{`Document ${index + 1}`}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href={doc}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.preventDefault();
                            const link = document.createElement('a');
                            link.href = doc;
                            link.download = `Document_${index + 1}.pdf`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
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
    </Sidebar>
  );
}