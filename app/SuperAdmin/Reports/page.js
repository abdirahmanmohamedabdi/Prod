"use client";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Layout from '../components/Layout';
const FinancialReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState(null); 
  const [newReport, setNewReport] = useState({
    reportName: "",
    totalIncome: 0,
    totalExpenses: 0,
    netIncome: 0,
    date: new Date().toLocaleDateString(),
    createdBy: "Abdirahman", 
    createdDate: new Date().toLocaleDateString(),
  });


  const fetchReports = async () => {

    const data = [
      {
        reportName: "Quarter 1 Report",
        totalIncome: 100000,
        totalExpenses: 50000,
        netIncome: 50000,
        date: "2024-01-01",
        createdBy: "Abdirahman", 
        createdDate: "2024-01-01",
      },
      {
        reportName: "Quarter 2 Report",
        totalIncome: 120000,
        totalExpenses: 60000,
        netIncome: 60000,
        date: "2024-04-01",
        createdBy: "Abdirahman",
        createdDate: "2024-04-01",
      },
    
    ];
    setReports(data); 
  };

  useEffect(() => {
    fetchReports(); 
  }, []);


  const calculateTotal = (field) => {
    return reports.reduce((sum, report) => sum + report[field], 0);
  };


  const handleAddReport = (e) => {
    e.preventDefault();

    const newReportData = {
      ...newReport,
      createdDate: new Date().toLocaleDateString(),
    };
    setReports([...reports, newReportData]); 
    setNewReport({
      reportName: "",
      totalIncome: 0,
      totalExpenses: 0,
      netIncome: 0,
      date: new Date().toLocaleDateString(),
      createdBy: "Abdirahman", 
      createdDate: new Date().toLocaleDateString(),
    }); 
  };

  const [userRole, setUserRole] = useState('Finance'); // Set initial role to 'HR' for testing

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
    setNewReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();


    const currentDate = new Date().toLocaleDateString();
    const currentUser = user ? user.name : "Abdirahman"; 


    doc.setFontSize(14);
    doc.text(`Report Generated by: ${currentUser}`, 14, 20);
    doc.text(`Report Date: ${currentDate}`, 14, 30);


    doc.setFontSize(18);
    doc.text("Financial Reports", 14, 40);


    let y = 50; 
    const headers = [
      "Report Name",
      "Total Income (Ksh)",
      "Total Expenses (Ksh)",
      "Net Income (Ksh)",
      "Date",
      "Created By",
      "Created Date",
    ];
    const rows = reports.map((report) => [
      report.reportName,
      report.totalIncome.toLocaleString(),
      report.totalExpenses.toLocaleString(),
      report.netIncome.toLocaleString(),
      report.date,
      report.createdBy,
      report.createdDate,
    ]);


    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); 
    doc.setFillColor(0, 51, 102); 
    const headerHeight = 10;
    headers.forEach((header, i) => {
      doc.rect(14 + i * 40, y, 40, headerHeight, "F"); 
      doc.text(header, 14 + i * 40 + 2, y + 7); 
    });
    y += headerHeight; 

  
    doc.setTextColor(0, 0, 0); 
    rows.forEach((row) => {
      row.forEach((cell, i) => {
        doc.text(cell, 14 + i * 40, y + 7);
      });
      y += 10; 
      if (y >= 250) {
       
        doc.addPage();
        y = 20; 
      }
    });


    const totalIncome = calculateTotal("totalIncome").toLocaleString();
    const totalExpenses = calculateTotal("totalExpenses").toLocaleString();
    const netIncome = calculateTotal("netIncome").toLocaleString();

    doc.setFontSize(12);
    doc.text(`Total Income: ${totalIncome} Ksh`, 14, y + 10);
    y += 10;
    doc.text(`Total Expenses: ${totalExpenses} Ksh`, 14, y + 10);
    y += 10;
    doc.text(`Total Net Income: ${netIncome} Ksh`, 14, y + 10);


    doc.save("financial-reports.pdf");
  };

  return (
    <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Reports</h1>

      <form
        onSubmit={handleAddReport}
        className="bg-white p-4 rounded-md shadow-md mb-6"
      >
        <h2 className="text-lg font-semibold mb-4">Add New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="reportName"
              className="block text-sm font-medium text-gray-700"
            >
              Report Name
            </label>
            <input
              type="text"
              id="reportName"
              name="reportName"
              value={newReport.reportName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="totalIncome"
              className="block text-sm font-medium text-gray-700"
            >
              Total Income (Ksh)
            </label>
            <input
              type="number"
              id="totalIncome"
              name="totalIncome"
              value={newReport.totalIncome}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="totalExpenses"
              className="block text-sm font-medium text-gray-700"
            >
              Total Expenses (Ksh)
            </label>
            <input
              type="number"
              id="totalExpenses"
              name="totalExpenses"
              value={newReport.totalExpenses}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="netIncome"
              className="block text-sm font-medium text-gray-700"
            >
              Net Income (Ksh)
            </label>
            <input
              type="number"
              id="netIncome"
              name="netIncome"
              value={newReport.netIncome}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        <div className="mt-4 text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Add Report
          </button>
        </div>
      </form>

 
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Report Name</th>
            <th className="px-4 py-2 border-b">Total Income (Ksh)</th>
            <th className="px-4 py-2 border-b">Total Expenses (Ksh)</th>
            <th className="px-4 py-2 border-b">Net Income (Ksh)</th>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Created By</th>
            <th className="px-4 py-2 border-b">Created Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b">{report.reportName}</td>
              <td className="px-4 py-2 border-b">
                {report.totalIncome.toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b">
                {report.totalExpenses.toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b">
                {report.netIncome.toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b">{report.date}</td>
              <td className="px-4 py-2 border-b">{report.createdBy}</td>
              <td className="px-4 py-2 border-b">{report.createdDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <div className="mt-6 text-right">
        <button
          onClick={exportToPDF}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
        >
          Export to PDF
        </button>
      </div>
    </div>
  </Layout>
  );
};

export default FinancialReportsPage;
