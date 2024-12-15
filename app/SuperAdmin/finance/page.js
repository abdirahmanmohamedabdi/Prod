"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // To get employee_id from URL
import Sidebar from "../../components/Sidebar"; // Adjust path as needed
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PaperClipIcon } from "@heroicons/react/solid";
import supabase from "../../lib/supabaseClient"; // Ensure correct import path

export default function EmployeeDocumentsPage() {
  const { id: employeeId } = useParams(); // Get employee ID from URL
  const [documents, setDocuments] = useState([]); // Store documents
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      console.log("Fetching documents for employee:", employeeId);
      try {
        const { data, error } = await supabase
          .from("employee_files")
          .select("file_name, file_url, document_type, created_at")
          .eq("employee_id", employeeId);

        if (error) {
          console.error("Error fetching documents:", error.message);
          toast.error("Failed to fetch documents");
        } else {
          console.log("Documents fetched:", data);
          setDocuments(data);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [employeeId]);

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

  if (!documents.length) {
    return (
      <Sidebar>
        <div className="min-h-screen bg-gray-100 p-6">
          <ToastContainer />
          <h1 className="text-3xl font-bold text-gray-800 mb-6">No Documents Found</h1>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-100 p-6">
        <ToastContainer />
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Documents</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul role="list" className="divide-y divide-gray-200">
            {documents.map((doc, index) => (
              <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div className="w-0 flex-1 flex items-center">
                  <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-2 flex-1 w-0 font-medium truncate">{doc.file_name}</span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a
                    href={doc.file_url}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    download
                  >
                    Download
                  </a>
                </div>
                <div className="ml-4 text-gray-500">
                  <span className="text-xs">{doc.document_type}</span>
                </div>
                <div className="ml-4 text-gray-400 text-xs">{new Date(doc.created_at).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Sidebar>
  );
}
