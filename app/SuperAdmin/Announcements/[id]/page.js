"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../../lib/supabaseClient"; // Ensure correct import path

export default function AnnouncementDetailsPage() {
  const { id } = useParams(); // Get the id parameter from the URL
  const [announcement, setAnnouncement] = useState(null); // Store the fetched announcement
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching announcement:", error.message);
        toast.error("Failed to fetch announcement");
      } else {
        setAnnouncement(data);
      }
      setLoading(false);
    };

    fetchAnnouncement();
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

  if (!announcement) {
    return (
      <Sidebar>
        <div className="min-h-screen bg-gray-100 p-6">
          <ToastContainer />
          <h1 className="text-3xl font-bold font-font text-gray-800 mb-6">Announcement not found</h1>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-font font-medium text-gray-900">Announcement Details</h3>
          <p className="mt-1 max-w-2xl text-sm font-font text-gray-500">Details of the announcement.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium font-font text-gray-500">Title</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{announcement.title}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium font-font text-gray-500">Date</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{new Date(announcement.date).toLocaleString()}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium font-font text-gray-500">Message</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{announcement.message}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium font-font text-gray-500">Posted by</dt>
              <dd className="mt-1 text-sm font-font text-gray-900">{announcement.createdBy} </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium font-font text-gray-500">Role</dt>
              <dd className="mt-1 text-sm font-font text-gray-900"> {announcement.role}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Sidebar>
  );
}