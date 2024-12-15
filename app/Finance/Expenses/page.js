"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../../lib/supabaseClient'; // Ensure correct import path
import { useUser } from "@clerk/nextjs"; // Ensure correct import path
import { UploadButton } from "@uploadthing/react"; // Ensure correct import path
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the plugin

const ExpensesPage = () => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data: operatingExpenses, error: operatingError } = await supabase.from('operating_expenses').select('*');
        if (operatingError) {
          throw operatingError;
        }

        const { data: nonOperatingExpenses, error: nonOperatingError } = await supabase.from('non_operating_expenses').select('*');
        if (nonOperatingError) {
          throw nonOperatingError;
        }

        // Add type to each expense
        const combinedExpenses = [
          ...operatingExpenses.map(expense => ({ ...expense, type: 'Operating' })),
          ...nonOperatingExpenses.map(expense => ({ ...expense, type: 'Non-Operating' }))
        ];
        setExpenses(combinedExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        toast.error('Failed to fetch expenses');
      }
    };

    fetchExpenses();
  }, [user]);

  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4', true); // Portrait, points, A4 size, compress
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const now = new Date();
    const currentDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`; // DD/MM/YYYY format

    // Add logo and title
    const img = new Image();
    img.src = '/logo1.png'; // Update path if necessary
    img.onload = () => {
      const imgWidth = 80; // Logo width
      const imgHeight = (img.height * imgWidth) / img.width;
      const centerX = (pageWidth - imgWidth) / 2;

      // Add logo and title
      doc.addImage(img, 'PNG', centerX, 40, imgWidth, imgHeight, undefined, 'FAST'); // Use 'FAST' to reduce quality
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('Expenses Report', pageWidth / 2, imgHeight + 80, { align: 'center' });

      // Add date
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Date: ${currentDate}`, 40, imgHeight + 90);

      // Table Configuration
      const tableColumn = ['Category', 'Amount (Ksh)', 'Description', 'Date', 'Confirmation Message', 'Created At'];
      const tableRows = filteredExpenses.map((expense) => [
        expense.category,
        expense.amount.toLocaleString(),
        expense.description,
        new Date(expense.date).toLocaleDateString(),
        expense.confirmation_message,
        new Date(expense.created_at).toLocaleDateString(),
      ]);

      // Add Total Row
      const totalAmount = filteredExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
      tableRows.push(['Total', totalAmount.toLocaleString(), '', '', '', '']);

      // Table Styling and Rendering
      doc.autoTable({
        startY: imgHeight + 100,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped', // Striped theme for better readability
        styles: {
          font: 'helvetica',
          fontSize: 10,
          textColor: [0, 0, 0],
          cellPadding: 5,
          minCellHeight: 20, // Ensure enough height for cells
        },
        headStyles: {
          fillColor: [0, 57, 107], // Dark blue header
          textColor: [255, 255, 255],
          fontSize: 12,
          fontStyle: 'bold',
        },
        bodyStyles: {
          fillColor: (rowIndex) => (rowIndex % 2 === 0 ? [245, 245, 245] : [255, 255, 255]),
          textColor: [0, 0, 0],
          lineWidth: 0.1,
          lineColor: [200, 200, 200],
        },
        columnStyles: {
          0: { cellWidth: 'auto', overflow: 'linebreak' }, // Category
          1: { cellWidth: 'auto', halign: 'right', overflow: 'linebreak' }, // Amount
          2: { cellWidth: 'auto', overflow: 'linebreak' }, // Description
          3: { cellWidth: 'auto', overflow: 'linebreak' }, // Date
          4: { cellWidth: 'auto', overflow: 'linebreak' }, // Confirmation Message
          5: { cellWidth: 'auto', overflow: 'linebreak' }, // Created At
        },
        margin: { top: 40, left: 20, right: 20 },
        didDrawPage: (data) => {
          // Footer with page number
          const pageCount = doc.internal.getNumberOfPages();
          const footerText = `Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`;
          doc.setFontSize(8);
          doc.text(footerText, pageWidth - 100, pageHeight - 30);
        },
      });

      // Save the PDF
      doc.save(`expenses_reports_${currentDate}.pdf`);
    };
  };

  const filteredExpenses = expenses.filter((expense) => {
    return (
      (filterCategory === "All" || expense.category === filterCategory) &&
      (filterDate ? expense.date.includes(filterDate) : true)
    );
  });

  const totalAmount = filteredExpenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );

  const handleUploadComplete = async (res) => {
    try {
      const url = res[0].url;

      const { data, error } = await supabase.from('financial_reports').insert([{
        name: res[0].name,
        url: url,
        uploaded_by: `${user.firstName} ${user.lastName}`,
        report_type: 'Expenses' // Add the report type here
      }]);

      if (error) {
        throw error;
      }

      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    }
  };

  return (
    <Sidebar>
      <div className="p-6 space-y-8">
        <ToastContainer />

        {/* Filters */}
        <div className="flex space-x-4 mt-8">
          <div>
            <label className="block text-sm font-font font-medium">Filter by Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="mt-1 p-2 border rounded-md"
            >
              <option value="All">All</option>
              <option value="Operating">Operating</option>
              <option value="Non-Operating">Non-Operating</option>
              <option value="Operating Expense">Operating Expense</option>
              <option value="Non-Operating Expense">Non-Operating Expense</option>
            </select>
          </div>
          <div>
            <label className="block font-font text-sm font-medium">Filter by Date</label>
            <input
              type="month"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="mt-1 p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Expenses Table */}
        <div className="mt-8">
          <h3 className="text-xl font-font font-semibold">Expenses List</h3>
          <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Amount (Ksh)</th>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Confirmation Message</th>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredExpenses.map((expense, index) => (
                  <tr key={expense.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{expense.category}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{expense.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{expense.description}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{new Date(expense.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{expense.confirmation_message}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{new Date(expense.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {/* Total Expenses Row */}
                <tr className="bg-green-100">
                  <td className="border font-font p-2 font-bold">Total</td>
                  <td className="border font-font p-2 font-bold">{totalAmount.toLocaleString()}</td>
                  <td className="border font-font p-2"></td>
                  <td className="border font-font p-2"></td>
                  <td className="border font-font p-2"></td>
                  <td className="border font-font p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Generate PDF Button */}
        <button
          onClick={generatePDF}
          className="mt-4 bg-green-600 font-font text-white p-2 rounded-md"
        >
          Generate PDF
        </button>

        {/* Upload Button */}
        <div className="mt-4">
          <label className="block text-sm font-font font-medium">Upload Financial Report</label>
          <UploadButton
            endpoint="pdfUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error) => {
              console.error("Error uploading file:", error);
              toast.error("Failed to upload file");
            }}
          />
        </div>
      </div>
    </Sidebar>
  );
};

export default ExpensesPage;