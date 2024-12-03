"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Office Closed", content: "The office will be closed on Friday for maintenance.", date: "2024-11-01", role: "all" },
    { id: 2, title: "New Policy", content: "Please review the new company policy on remote work.", date: "2024-11-05", role: "all" },
    { id: 3, title: "Finance Meeting", content: "There will be a finance meeting on Monday.", date: "2024-11-07", role: "Finance" },
    { id: 4, title: "HR Training", content: "HR training session on Wednesday.", date: "2024-11-09", role: "HR" },
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    role: "all",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [userRole, setUserRole] = useState('SuperAdmin'); // Set initial role to 'HR' for testing

  useEffect(() => {
    // Fetch previous announcements from an API
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements');
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePostAnnouncement = async () => {
    try {
      // Mock POST response for testing purposes
      const createdAnnouncement = { ...newAnnouncement, id: announcements.length + 1, date: new Date().toISOString().split("T")[0] }; // Mock created announcement with an ID and date
      setAnnouncements((prevAnnouncements) => [...prevAnnouncements, createdAnnouncement]);
      setNewAnnouncement({ title: "", content: "", role: "all" });
      setSuccessMessage("Announcement posted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  const filteredAnnouncements = announcements.filter(
    (announcement) => announcement.role === "all" || announcement.role === userRole
  );

  return (
  <Sidebar>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Announcements</h1>

        {/* New Announcement Form */}
        <div className="space-y-4 bg-white p-6 shadow rounded-md">
          <h2 className="text-xl font-font font-semibold">Post New Announcement</h2>
          <div className="space-y-2">
            <label className="block text-sm font-font font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={newAnnouncement.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter announcement title"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block font-font text-sm font-medium">Content</label>
            <textarea
              name="content"
              value={newAnnouncement.content}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Enter announcement content"
              required
            ></textarea>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-font font-medium">Role</label>
            <select
              name="role"
              value={newAnnouncement.role}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="all">All</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          {/* Post Button */}
          <button
            onClick={handlePostAnnouncement}
            className="w-full bg-indigo-600 font-font text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post Announcement
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 p-4 bg-green-100 font-font text-green-800 rounded-md">
            {successMessage}
          </div>
        )}

        {/* Announcements List */}
        <div>
          <h2 className="text-xl font-font font-semibold">Previous Announcements</h2>
          {filteredAnnouncements.length === 0 ? (
            <p>No announcements available.</p>
          ) : (
            <div className="mt-4 font-font space-y-4">
              {filteredAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-white p-4 shadow rounded-md"
                >
                  <h3 className="text-lg font-font font-semibold">{announcement.title}</h3>
                  <p className="text-sm font-font text-gray-600">{announcement.date}</p>
                  <p className="mt-2 font-font">{announcement.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
   </Sidebar>
  );
};

export default AnnouncementsPage;