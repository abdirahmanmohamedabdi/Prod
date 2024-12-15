"use client";
import React, { useState } from "react";
import { UploadButton } from "../../../utils/uploadthing"; // Import UploadButton component
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import { ToastContainer, toast } from "react-toastify";
import supabase from "../../../lib/supabaseClient"; // Ensure correct import path
import Sidebar from "../../../components/Sidebar";

const rolePrefixes = {
  IT: "IT",
  COOK: "COOK",
  CLEAN: "CLEAN",
  DRIVER: "DRIVER",
  TEACH: "TEACH",
  MAINT: "MAINT",
};

function generateEmployeeId(role) {
  const prefix = rolePrefixes[role];
  const randomNumber = Math.floor(100 + Math.random() * 900); // Generate a random 3-digit number
  return `${prefix}${randomNumber}`;
}

export default function CreateEmployeePage() {
  const [employeeFirstName, setEmployeeFirstName] = useState("");
  const [employeeSecondName, setEmployeeSecondName] = useState("");
  const [employeeDOB, setEmployeeDOB] = useState("");
  const [employeeRole, setEmployeeRole] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeEmergencyContact, setEmployeeEmergencyContact] = useState("");
  const [employeeGender, setEmployeeGender] = useState(""); // Add gender state
  const [fileUrls, setFileUrls] = useState([]);

  const handleFileUpload = async (files) => {
    try {
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          const { data, error } = await supabase.storage
            .from("employee-files")
            .upload(`public/${file.name}`, file);

          if (error) {
            throw error;
          }

          return data.Key;
        })
      );

      setFileUrls(uploadedFiles);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeId = generateEmployeeId(employeeRole);

    const newEmployee = {
      firstName: employeeFirstName,
      secondName: employeeSecondName,
      dob: employeeDOB,
      role: employeeRole,
      email: employeeEmail,
      phone: employeePhone,
      emergencyContact: employeeEmergencyContact, // Corrected field name
      gender: employeeGender, // Add gender to new employee object
      employeeId: employeeId,
      fileUrl: fileUrls.join(","), // Join file URLs into a single string
    };

    try {
      // Check if email already exists
      const { data: existingEmployee, error: fetchError } = await supabase
        .from("employees")
        .select("email")
        .eq("email", employeeEmail)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      if (existingEmployee) {
        toast.error("Email already exists. Please use a different email.");
        return;
      }

      const { error } = await supabase
        .from("employees")
        .insert([newEmployee]);

      if (error) {
        throw error;
      }

      toast.success("Employee created successfully");
      // Reset form fields
      setEmployeeFirstName("");
      setEmployeeSecondName("");
      setEmployeeDOB("");
      setEmployeeRole("");
      setEmployeeEmail("");
      setEmployeePhone("");
      setEmployeeEmergencyContact("");
      setEmployeeGender(""); // Reset gender field
      setFileUrls([]);
    } catch (error) {
      console.error("Error creating employee:", error.message);
      toast.error("Failed to create employee");
    }
  };

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-100 p-6">
        <ToastContainer />
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Employee</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-md">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={employeeFirstName}
              onChange={(e) => setEmployeeFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="secondName" className="block text-sm font-medium text-gray-700">
              Second Name
            </label>
            <input
              type="text"
              id="secondName"
              value={employeeSecondName}
              onChange={(e) => setEmployeeSecondName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={employeeDOB}
              onChange={(e) => setEmployeeDOB(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              value={employeeRole}
              onChange={(e) => setEmployeeRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              {Object.keys(rolePrefixes).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={employeePhone}
              onChange={(e) => setEmployeePhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
              Emergency Contact
            </label>
            <input
              type="tel"
              id="emergencyContact"
              value={employeeEmergencyContact}
              onChange={(e) => setEmployeeEmergencyContact(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              value={employeeGender}
              onChange={(e) => setEmployeeGender(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Files</label>
            <UploadButton
              endpoint="pdfUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                setFileUrls(res.map((file) => file.url)); // Set the file URLs when upload is successful
              }}
              onUploadError={(error) => {
                console.error("Error uploading file:", error);
                toast.error("Failed to upload file");
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Employee
          </button>
        </form>
      </div>
    </Sidebar>
  );
}