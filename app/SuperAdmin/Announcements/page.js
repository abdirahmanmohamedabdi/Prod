"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../lib/supabaseClient"; // Ensure correct import path
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [sendToAllRoles, setSendToAllRoles] = useState(false);
  const { user } = useUser(); // Get the current user from Clerk
  const router = useRouter();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("date", { ascending: false }); // Order by date in descending order

      if (error) {
        console.error("Error fetching announcements:", error.message);
        toast.error("Failed to fetch announcements");
      } else {
        setAnnouncements(data);
      }
      setLoading(false);
    };

    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAnnouncement = {
      title,
      message,
      createdBy: user.fullName, // Set the createdBy field to the user's full name
      role: sendToAllRoles ? "All" : role,
      date: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("announcements")
      .insert([newAnnouncement]);

    if (error) {
      console.error("Error creating announcement:", error.message);
      toast.error("Failed to create announcement");
    } else {
      toast.success("Announcement created successfully");
      setTitle("");
      setMessage("");
      setRole("");
      setSendToAllRoles(false);
      window.location.reload(); // Reload the page
    }
  };

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

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-100 p-6">
        <ToastContainer />
        <h1 className="text-3xl font-bold text-gray-800 font-font mb-6">Announcements</h1>
        
        {/* Create Announcement Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-md">
          <div>
            <label htmlFor="title" className="block text-sm font-font font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 font-font rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-font font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 font-font rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium font-font text-gray-700">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 font-font rounded-md"
              required={!sendToAllRoles}
              disabled={sendToAllRoles}
            >
              <option value="" className="font-font">Select Role</option>
              <option value="HR" className="font-font">HR</option>
              <option value="Finance" className="font-font">Finance</option>
              <option value="SuperAdmin" className="font-font">SuperAdmin</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sendToAllRoles"
              checked={sendToAllRoles}
              onChange={(e) => setSendToAllRoles(e.target.checked)}
              className="h-4 w-4 text-indigo-600 font-font border-gray-300 rounded"
            />
            <label htmlFor="sendToAllRoles" className="ml-2 block text-sm font-font text-gray-900">
              Send to all roles 
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-font shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Announcement
          </button>
        </form>

        {/* Announcements List */}
        <h2 className="text-xl font-semibold mt-8">Announcements</h2>
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white p-6 shadow rounded-md mt-4 font-font cursor-pointer"
              onClick={() => router.push(`/SuperAdmin/Announcements/${announcement.id}`)}
            >
              <h3 className="text-lg font-font font-semibold">{announcement.title}</h3>
              <p className="text-sm font-font text-gray-600">
                {new Date(announcement.date).toLocaleString()}
              </p>
              <p className="mt-2 font-font">{announcement.message}</p>
              <p className="text-sm font-font text-gray-500">
                Posted by: {announcement.createdBy} (Role: {announcement.role})
              </p>
            </div>
          ))
        ) : (
          <p className="mt-4 font-font text-gray-500">No announcements available.</p>
        )}
      </div>
    </Sidebar>
  );
}