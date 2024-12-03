"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../../components/Sidebar";

export default function FinancePage() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userRole, setUserRole] = useState('SuperAdmin');
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
  // Fetch finance reports (Replace with your backend API)
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const fetchedReports = [
          {
            id: 1,
            title: "Monthly Revenue Report",
            date: "2024-11-01",
            details: "Revenue for November 2024.",
            amount: "$10,000",
            creator: "John Doe",
            pdf: "monthly_revenue_report.pdf",
            category: "Income",
          },
          {
            id: 2,
            title: "Expense Report",
            date: "2024-11-15",
            details: "Expenses for November 2024.",
            amount: "$5,000",
            creator: "Jane Smith",
            pdf: "expense_report.pdf",
            category: "Expenses",
          },
          {
            id: 3,
            title: "Operating Income Report",
            date: "2024-11-20",
            details: "Operating income for November 2024.",
            amount: "$7,000",
            creator: "Alice Johnson",
            pdf: "operating_income_report.pdf",
            category: "Operating Income",
          },
          {
            id: 4,
            title: "Non-Operating Income Report",
            date: "2024-11-25",
            details: "Non-operating income for November 2024.",
            amount: "$3,000",
            creator: "Bob Brown",
            pdf: "non_operating_income_report.pdf",
            category: "Non-Operating Income",
          },
        ];
        setReports(fetchedReports);
        setFilteredReports(fetchedReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterReports(date, selectedYear, selectedCategory);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    filterReports(selectedDate, year, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterReports(selectedDate, selectedYear, category);
  };

  const filterReports = (date, year, category) => {
    let filtered = reports;

    if (date) {
      filtered = filtered.filter(
        (report) => new Date(report.date).toDateString() === date.toDateString()
      );
    }

    if (year !== "All") {
      filtered = filtered.filter(
        (report) => new Date(report.date).getFullYear().toString() === year
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((report) => report.category === category);
    }

    setFilteredReports(filtered);
  };

  // Extract unique years for the year dropdown
  const uniqueYears = [
    ...new Set(reports.map((report) => new Date(report.date).getFullYear())),
  ];

  // Extract unique categories for the category dropdown
  const uniqueCategories = [
    ...new Set(reports.map((report) => report.category)),
  ];

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Finance Reports</h1>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Date Picker */}
          <div className="flex items-center">
            <label className="mr-2 text-gray-700 font-medium">Filter by Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
              placeholderText="Select a date"
            />
            <button
              onClick={() => handleDateChange(null)}
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Clear Filter
            </button>
          </div>

          {/* Year Dropdown */}
          <div className="flex items-center">
            <label className="mr-2 text-gray-700 font-medium">Filter by Year:</label>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
              onChange={(e) => handleYearChange(e.target.value)}
            >
              <option value="All">All</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center">
            <label className="mr-2 text-gray-700 font-medium">Filter by Category:</label>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="All">All</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Reports</h2>
          {loading ? (
            <p>Loading...</p>
          ) : filteredReports.length === 0 ? (
            <p className="text-gray-600">No reports available.</p>
          ) : (
            uniqueCategories.map((category) => (
              <div key={category} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Title</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Date</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Amount</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Description</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Category</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports
                      .filter((report) => report.category === category)
                      .map((report) => (
                        <tr key={report.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{report.title}</td>
                          <td className="px-4 py-2">{report.date}</td>
                          <td className="px-4 py-2">{report.amount}</td>
                          <td className="px-4 py-2">{report.details}</td>
                          <td className="px-4 py-2">{report.category}</td>
                          <td className="px-4 py-2">
                            <a
                              href={`/path/to/pdf/${report.pdf}`}
                              download
                              className="text-blue-600 hover:underline"
                            >
                              Download PDF
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </div>
      </Sidebar>
  );
}