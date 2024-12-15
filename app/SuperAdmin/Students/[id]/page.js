"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PaperClipIcon } from "@heroicons/react/solid";
import Sidebar from "../../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../../lib/supabaseClient"; // Ensure correct import path

export default function StudentDetailsPage() {
  const { id } = useParams(); // Get the id parameter from the URL
  const [student, setStudent] = useState(null); // Store the fetched student
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching student:", error.message);
        toast.error("Failed to fetch student");
      } else {
        if (data?.student_files) {
          // Determine if `student_files` contains JSON strings or plain URLs
          data.student_files = data.student_files.map((file) => {
            try {
              return JSON.parse(file); // Attempt to parse JSON
            } catch (e) {
              return { url: file, name: "Unknown Document" }; // Fallback for plain strings
            }
          });
        }
        setStudent(data);
      }
      setLoading(false);
    };

    fetchStudent();
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

  if (!student) {
    return (
      <Sidebar>
        <div className="min-h-screen bg-gray-100 p-6">
          <ToastContainer />
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Student not found</h1>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-font font-medium text-gray-900">Student Information</h3>
          <p className="mt-1 max-w-2xl text-sm font-font text-gray-500">Personal details and application.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {/* Student details */}
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium font-font text-gray-500">Admission Number</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{student.admission_number}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium font-font text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{student.first_name} {student.last_name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium font-font text-gray-500">Date of Birth</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{student.dob}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium font-font text-gray-500">Has Graduated</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{student.has_graduated ? "Yes" : "No"}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium font-font text-gray-500">Parent Name</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{student.parent_details.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium font-font text-gray-500">Parent Phone</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{student.parent_details.phone}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium font-font text-gray-500">Alternative Phone</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{student.parent_details.alt_phone}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium font-font text-gray-500">Date Joined</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{student.date_joined}</dd>
            </div>
            {/* Attachments */}
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium font-font text-gray-500">Attachments</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {student.student_files &&
                    student.student_files.map((fileData, index) => (
                      <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span className="ml-2 flex-1 w-0 font-font truncate">{fileData.name || `Document ${index + 1}`}</span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a
                            href={fileData.url}
                            className="font-medium text-indigo-600 font-font hover:text-indigo-500"
                            download
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
