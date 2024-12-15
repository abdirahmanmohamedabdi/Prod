"use client";

import { useState } from "react";
import { UploadButton } from "../../../utils/uploadthing"; // Import UploadButton component
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import { ToastContainer, toast } from "react-toastify";
import supabase from "../../../lib/supabaseClient"; // Ensure correct import path
import Sidebar from "../../../components/Sidebar";

export default function CreateStudentPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [hasGraduated, setHasGraduated] = useState(false);
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [altParentPhone, setAltParentPhone] = useState("");
  const [studentFiles, setStudentFiles] = useState([]);
  const [dateJoined, setDateJoined] = useState(new Date().toISOString().split("T")[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateAdmissionNumber = () => {
    const timestamp = Date.now().toString().slice(-6); // Use the last 6 digits of the timestamp
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ADM${timestamp}${randomNum}`;
  };

  const handleFileUpload = async (files) => {
    if (files.length + studentFiles.length > 5) {
      toast.error("You can only upload up to 5 files.");
      return;
    }

    const admissionNumber = generateAdmissionNumber();
    const uploadedFiles = [];

    for (const file of files) {
      const fileName = `${admissionNumber}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("student-files")
        .upload(fileName, file);

      if (error) {
        console.error("Error uploading file:", error.message);
        toast.error("Failed to upload file");
        return;
      }

      uploadedFiles.push(data.Key);
    }

    setStudentFiles([...studentFiles, ...uploadedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const admissionNumber = generateAdmissionNumber();

    const studentData = {
      first_name: firstName,
      last_name: lastName,
      dob,
      has_graduated: hasGraduated,
      parent_details: {
        name: parentName,
        phone: parentPhone,
        alt_phone: altParentPhone,
      },
      student_files: studentFiles,
      date_joined: dateJoined,
      admission_number: admissionNumber,
    };

    try {
      const { error } = await supabase
        .from("students") // Replace with your table name
        .insert([studentData]);

      if (error) {
        console.error("Error creating student:", error.message);
        toast.error("Failed to create student");
        return;
      }

      toast.success("Student created successfully");
      // Reset form fields
      setFirstName("");
      setLastName("");
      setDob("");
      setHasGraduated(false);
      setParentName("");
      setParentPhone("");
      setAltParentPhone("");
      setStudentFiles([]);
      setDateJoined(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Error creating student:", error.message);
      toast.error("Failed to create student");
    }
  };

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-100 p-6">
        <ToastContainer />
        <h1 className="text-3xl font-bold font-font text-gray-800 mb-6">Create Student</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-md">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-font font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 font-font rounded-md"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm  font-font font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 font-font rounded-md"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-font font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 font-font rounded-md"
            />
          </div>

          {/* Has Graduated */}
          <div>
            <label htmlFor="hasGraduated" className="block text-sm font-font font-medium text-gray-700">
              Has Graduated
            </label>
            <input
              type="checkbox"
              id="hasGraduated"
              checked={hasGraduated}
              onChange={(e) => setHasGraduated(e.target.checked)}
              className="h-4 w-4 text-indigo-600 font-font border-gray-300 rounded"
            />
          </div>

          {/* Parent Details */}
          <div>
            <label htmlFor="parentDetails" className="block text-sm font-font font-medium text-gray-700">
              Parent Details
            </label>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-indigo-600 text-white px-4 py-2  font-font rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Parent Details
            </button>
          </div>

          {/* Student Files */}
          <div>
            <label className="block text-sm font-medium font-font text-gray-700">Upload Files</label>
            <UploadButton
              endpoint="pdfUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                const admissionNumber = generateAdmissionNumber();
                const uploadedFiles = res.map(file => ({
                  url: file.url,
                  name: `${admissionNumber}_${file.name}`
                }));
                setStudentFiles([...studentFiles, ...uploadedFiles]);
              }}
              onUploadError={(error) => {
                console.error("Error uploading file:", error);
                toast.error("Failed to upload file");
              }}
            />
            <p className="text-sm text-gray-500 mt-2">You can upload up to 5 files.</p>
          </div>

          {/* Date Joined */}
          <div>
            <label htmlFor="dateJoined" className="block text-sm font-font font-medium text-gray-700">
              Date Joined
            </label>
            <input
              type="date"
              id="dateJoined"
              value={dateJoined}
              onChange={(e) => setDateJoined(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 font-font rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm font-font hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Student
          </button>
        </form>

        {/* Parent Details Modal */}
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium font-font text-gray-900">Parent Details</h3>
                    <div className="mt-2">
                      <div>
                        <label htmlFor="parentName" className="block text-sm  font-font font-medium text-gray-700">
                          Parent Name
                        </label>
                        <input
                          type="text"
                          id="parentName"
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                          className="w-full px-3 py-2 font-font border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="parentPhone" className="block text-sm font-font font-medium text-gray-700">
                          Parent Phone
                        </label>
                        <input
                          type="tel"
                          id="parentPhone"
                          value={parentPhone}
                          onChange={(e) => setParentPhone(e.target.value)}
                          className="w-full px-3 py-2 border font-font border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="altParentPhone" className="block text-sm font-font font-medium text-gray-700">
                          Alternative Phone
                        </label>
                        <input
                          type="tel"
                          id="altParentPhone"
                          value={altParentPhone}
                          onChange={(e) => setAltParentPhone(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 font-font rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex justify-center w-full rounded-md font-font border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}