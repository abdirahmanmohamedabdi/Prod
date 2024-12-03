"use client";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import Sidebar from "../../components/Sidebar";

const HRReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({
    title: "",
    type: "Announcement", // Default report type
    description: "",
    date: new Date().toISOString().split("T")[0], // Default to current date
    author: "Abdirahman", // Default author for testing purposes
  });
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('HR'); // Set initial role to 'HR' for testing

  // Fetch reports from backend (dummy fetch for now)
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        // Mock fetch response for testing purposes
        const data = []; // Replace with your backend API endpoint
        setReports(data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Fetch user role and name from an API or another source
  useEffect(() => {
    const fetchUserRoleAndName = async () => {
      try {
        const response = await fetch('/api/user-role');
        const data = await response.json();
        setUserRole(data.role);
        setNewReport((prev) => ({
          ...prev,
          author: data.name || "Abdirahman", // Use fetched name or default to "Abdirahman"
        }));
      } catch (error) {
        console.error('Error fetching user role and name:', error);
      }
    };

    fetchUserRoleAndName();
  }, []);

  // Handle input changes for creating a new report
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit new report to backend (mocked for testing purposes)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock POST response for testing purposes
      const createdReport = { ...newReport, id: reports.length + 1 }; // Mock created report with an ID
      setReports((prevReports) => [...prevReports, createdReport]);
      setNewReport({
        title: "",
        type: "Announcement",
        description: "",
        date: new Date().toISOString().split("T")[0],
        author: "Abdirahman",
      }); // Reset form
    } catch (error) {
      console.error("Error posting report:", error);
    }
  };

  // Generate PDF using jsPDF
  const generatePDF = (report) => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text(report.title, 10, 20);

    doc.setFontSize(12);
    doc.text(`Type: ${report.type}`, 10, 30);
    doc.text(`Author: ${report.author}`, 10, 40);
    doc.text(`Date: ${report.date}`, 10, 50);

    doc.setFont("Helvetica", "normal");
    doc.text("Description:", 10, 60);
    doc.text(report.description, 10, 70, { maxWidth: 180 });

    doc.save(`${report.title}.pdf`);
  };

  return (
    <Sidebar>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">HR Reports</h1>

        {/* New Report Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-md">
          <h2 className="text-xl font-font font-semibold">Create New Report</h2>
          <div className="space-y-2">
            <label className="block text-sm font-font font-medium">Report Title</label>
            <input
              type="text"
              name="title"
              value={newReport.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter report title"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-font font-medium">Report Type</label>
            <select
              name="type"
              value={newReport.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Announcement">Announcement</option>
              <option value="Warning">Warning</option>
              <option value="Performance">Performance Review</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-font font-medium">Description</label>
            <textarea
              name="description"
              value={newReport.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Enter report description"
              required
            ></textarea>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-font font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={newReport.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-one text-white font-font p-2 rounded-md hover:bg-blue-700"
          >
            Submit Report
          </button>
        </form>

        {/* Reports List */}
        <div>
          <h2 className="text-xl font-font font-semibold">Existing Reports</h2>
          {loading ? (
            <p>Loading reports...</p>
          ) : reports.length === 0 ? (
            <p>No reports available.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white p-4 shadow rounded-md flex justify-between items-start"
                >
                  <div>
                    <h3 className="text-lg font-font font-semibold">{report.title}</h3>
                    <p className="text-sm font-font text-gray-600">Type: {report.type}</p>
                    <p className="text-sm font-font text-gray-600">Author: {report.author}</p>
                    <p className="text-sm font-font text-gray-600">Date: {report.date}</p>
                    <p className="mt-2 font-font">{report.description}</p>
                  </div>
                  <button
                    onClick={() => generatePDF(report)}
                    className="bg-one text-white font-font px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Export as PDF
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

export default HRReportsPage;