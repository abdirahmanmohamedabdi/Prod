"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "../../lib/supabaseClient";
import { SortAsc, SortDesc, Download, Filter, XCircle, MoreHorizontal } from "lucide-react";
import Sidebar from "../../components/Sidebar";

export default function FinancialReportsPage() {
  const [reports, setReports] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "created_at", direction: "ascending" });
  const { user } = useUser();
  const [editingReportId, setEditingReportId] = useState(null);
  const [newReportName, setNewReportName] = useState("");
  const [filters, setFilters] = useState({ uploadedBy: "", startDate: "", endDate: "", reportType: "" });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [uploadedByOptions, setUploadedByOptions] = useState([]);
  const [reportTypeOptions, setReportTypeOptions] = useState([]);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase.from("financial_reports").select("*");
      if (error) {
        console.error("Error fetching reports:", error);
      } else {
        setReports(data);
      }
    };

    const fetchFilterOptions = async () => {
      const { data: uploadedByData, error: uploadedByError } = await supabase
        .from("financial_reports")
        .select("uploaded_by", { distinct: true });
      if (uploadedByError) {
        console.error("Error fetching uploaded_by options:", uploadedByError);
      } else {
        setUploadedByOptions(uploadedByData.map((item) => item.uploaded_by));
      }

      const { data: reportTypeData, error: reportTypeError } = await supabase
        .from("financial_reports")
        .select("report_type", { distinct: true });
      if (reportTypeError) {
        console.error("Error fetching report_type options:", reportTypeError);
      } else {
        setReportTypeOptions(reportTypeData.map((item) => item.report_type));
      }
    };

    fetchReports();
    fetchFilterOptions();
  }, []);

  const applyFilters = () => {
    let filteredReports = [...reports];

    if (filters.uploadedBy) {
      filteredReports = filteredReports.filter((report) =>
        report.uploaded_by.toLowerCase().includes(filters.uploadedBy.toLowerCase())
      );
    }
    if (filters.startDate) {
      filteredReports = filteredReports.filter(
        (report) => new Date(report.created_at) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filteredReports = filteredReports.filter(
        (report) => new Date(report.created_at) <= new Date(filters.endDate)
      );
    }
    if (filters.reportType) {
      filteredReports = filteredReports.filter((report) =>
        report.report_type.toLowerCase().includes(filters.reportType.toLowerCase())
      );
    }
    return filteredReports;
  };

  const sortedReports = applyFilters().sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (report) => {
    setEditingReportId(report.id);
    setNewReportName(report.name);
    setActionMenuOpen(null);
  };

  const handleSave = async (reportId) => {
    const { error } = await supabase
      .from("financial_reports")
      .update({ name: newReportName })
      .eq("id", reportId);

    if (error) {
      console.error("Error updating report:", error);
    } else {
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId ? { ...report, name: newReportName } : report
        )
      );
      setEditingReportId(null);
    }
  };

  const handleCancel = () => {
    setEditingReportId(null);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("financial_reports").delete().eq("id", id);

    if (error) {
      console.error("Error deleting report:", error);
    } else {
      setReports((prev) => prev.filter((report) => report.id !== id));
      setActionMenuOpen(null);
    }
  };

  const clearFilters = () => {
    setFilters({ uploadedBy: "", startDate: "", endDate: "", reportType: "" });
  };

  const areFiltersApplied = () => {
    return filters.uploadedBy || filters.startDate || filters.endDate || filters.reportType;
  };

  return (
    <Sidebar>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
          <div className="max-w-xl">
            <h1 className="text-2xl font-extrabold font-font tracking-tight text-gray-900 sm:text-3xl">
              Financial Reports
            </h1>
            <p className="mt-2 text-sm font-font text-gray-500">
              Check the status of recent financial reports, manage them, and download reports.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="sr-only font-font">Recent reports</h2>

            <div className="space-y-20">
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => requestSort("uploaded_by")}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-font text-sm font-medium rounded-md text-white bg-one hover:bg-one focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {sortConfig.key === "uploaded_by" && sortConfig.direction === "ascending" ? (
                    <SortAsc className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <SortDesc className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  )}
                  Sort by Uploaded By
                </button>
                <button
                  onClick={() => requestSort("report_type")}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-font text-sm font-medium rounded-md text-white bg-one hover:bg-one focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {sortConfig.key === "report_type" && sortConfig.direction === "ascending" ? (
                    <SortAsc className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <SortDesc className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  )}
                  Sort by Type
                </button>
                <button
                  onClick={() => requestSort("created_at")}
                  className="inline-flex items-center px-4 py-2 border border-transparent font-font shadow-sm text-base font-medium rounded-md text-white bg-one hover:bg-one focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {sortConfig.key === "created_at" && sortConfig.direction === "ascending" ? (
                    <SortAsc className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <SortDesc className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                  )}
                  Sort by Date
                </button>
                <button
                  onClick={() => setIsFilterModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Filter className="mr-2 h-5 w-5" />
                  Advanced Filters
                </button>
                {areFiltersApplied() && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-2 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
              </div>
              {isFilterModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                  <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Advanced Filters
                          </h3>
                          <div className="mt-2">
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">Uploaded By</label>
                              <select
                                value={filters.uploadedBy}
                                onChange={(e) =>
                                  setFilters((prev) => ({ ...prev, uploadedBy: e.target.value }))
                                }
                                className="mt-1 block w-full border rounded px-2 py-1"
                              >
                                <option value="">All</option>
                                {uploadedByOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">Start Date</label>
                              <input
                                type="date"
                                value={filters.startDate}
                                onChange={(e) =>
                                  setFilters((prev) => ({ ...prev, startDate: e.target.value }))
                                }
                                className="mt-1 block w-full border rounded px-2 py-1"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">End Date</label>
                              <input
                                type="date"
                                value={filters.endDate}
                                onChange={(e) =>
                                  setFilters((prev) => ({ ...prev, endDate: e.target.value }))
                                }
                                className="mt-1 block w-full border rounded px-2 py-1"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">Report Type</label>
                              <select
                                value={filters.reportType}
                                onChange={(e) =>
                                  setFilters((prev) => ({ ...prev, reportType: e.target.value }))
                                }
                                className="mt-1 block w-full border rounded px-2 py-1"
                              >
                                <option value="">All</option>
                                {reportTypeOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setIsFilterModalOpen(false)}
                      >
                        Apply Filters
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setIsFilterModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {sortedReports.map((report) => (
                <div key={report.id}>
                  <h3 className="sr-only text-four font-font">
                    Report recorded on{" "}
                    <time dateTime={report.created_at}>
                      {new Date(report.created_at).toLocaleDateString()}
                    </time>
                  </h3>

                  <table className="mt-4 w-full text-gray-500 font-font sm:mt-6">
                    <caption className="sr-only text-four font-font">Details</caption>
                    <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                      <tr>
                        <th
                          scope="col"
                          className="sm:w-2/5 lg:w-1/3 pr-8 py-3 text-four font-font font-normal"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="hidden w-1/5 pr-8 py-3 font-normal text-four font-font sm:table-cell"
                        >
                          Uploaded By
                        </th> <th
                          scope="col"
                          className="hidden w-1/5 pr-8 py-3 font-normal text-four font-font sm:table-cell"
                        >
                          Report Type
                        </th>
                        <th
                          scope="col"
                          className="hidden pr-8 py-3 font-normal text-four font-font sm:table-cell"
                        >
                          Created At
                        </th>
                        <th
                          scope="col"
                          className="w-0 py-3 font-normal text-four font-font text-right"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                      <tr key={report.id}>
                        <td className="py-6 pr-8">
                          <div className="flex items-center">
                            <div>
                              {editingReportId === report.id ? (
                                <div className="flex items-center">
                                  <input
                                    type="text"
                                    value={newReportName}
                                    onChange={(e) => setNewReportName(e.target.value)}
                                    className="border rounded px-2 py-1 w-full mr-2 focus:ring-2 focus:ring-blue-500"
                                  />
                                  <button
                                    onClick={() => handleSave(report.id)}
                                    className="text-blue-600 font-medium hover:underline mr-2"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={handleCancel}
                                    className="text-gray-500 hover:underline"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="font-medium font-font text-four text-gray-900">
                                  {report.name}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="hidden py-6 pr-8 text-four font-font sm:table-cell">
                          {report.uploaded_by}
                        </td> <td className="hidden py-6 pr-8 text-four font-font sm:table-cell">
                          {report.report_type}
                        </td>
                        <td className="hidden py-6 pr-8 font-font text-four sm:table-cell">
                          {new Date(report.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-6 font-medium text-right whitespace-nowrap flex items-center justify-end space-x-4 relative">
                          <button
                            onClick={() => setActionMenuOpen(report.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
                          </button>
                          {actionMenuOpen === report.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                              <button
                                onClick={() => handleEdit(report)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(report.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Delete
                              </button>
                              <a
                                href={report.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setActionMenuOpen(null)}
                              >
                                Download
                              </a>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}