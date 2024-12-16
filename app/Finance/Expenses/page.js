"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../../lib/supabaseClient'; // Ensure correct import path
import { useUser } from "@clerk/nextjs"; // Ensure correct import path
import { UploadButton } from "@uploadthing/react";
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the plugin
import { MoreHorizontal } from 'lucide-react';

const ExpensesPage = () => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data, error } = await supabase.from('expenses').select('*');
        if (error) {
          throw error;
        }
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        toast.error('Failed to fetch expenses');
      }
    };

    fetchExpenses();
  }, []);

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

      // Save the PDF with a random alphanumeric string in the filename
      handleSaveDocument(doc);
    };
  };

  const handleSaveDocument = (doc) => {
    const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
    
    // Function to generate a random alphanumeric string
    const generateRandomString = (length = 6) => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
    };

    const randomString = generateRandomString(); // Generate 6-character random string
    const fileName = `expenses_report_${randomString}_${currentDate}.pdf`;

    doc.save(fileName);
  };

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

      toast.success('Report uploaded successfully');
    } catch (error) {
      console.error('Error uploading report:', error);
      toast.error('Failed to upload report');
    }
  };

  return (
    <Sidebar>
      <div className="p-6 space-y-8">
        <ToastContainer />

        {/* Filters */}
        <div className="flex space-x-4 mt-8">
         
          <div>
            <label className="block text-sm font-medium">Filter by Date</label>
            <input
              type="month"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        </div>

        {/* Expenses Table */}
        <div className="mt-8">
          <h3 className="text-xl font-font font-semibold mb-4">Expenses List</h3>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium font-font text-gray-600 border border-gray-200">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium font-font text-gray-600 border border-gray-200">Amount (Ksh)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium font-font text-gray-600 border border-gray-200">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-medium font-font text-gray-600 border border-gray-200">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium font-font text-gray-600 border border-gray-200">Confirmation Message</th>
                  <th className="px-6 py-4 text-left text-sm font-medium font-font text-gray-600 border border-gray-200">Created At</th>

                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense, index) => (
                  <tr key={expense.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 py-6 text-sm text-gray-700  font-font border border-gray-200">{expense.category}</td>
                    <td className="px-6 py-6 text-sm text-gray-700 font-font border border-gray-200">{expense.amount.toLocaleString()}</td>
                    <td className="px-6 py-6 text-sm text-gray-700 font-font border border-gray-200">{expense.description}</td>
                    <td className="px-6 py-6 text-sm text-gray-700 font-font border border-gray-200">{new Date(expense.date).toLocaleDateString()}</td>
                    <td className="px-6 py-6 text-sm text-gray-700 font-font border border-gray-200">{expense.confirmation_message}</td>
                    <td className="px-6 py-6 text-sm text-gray-700 font-font border border-gray-200">{new Date(expense.created_at).toLocaleDateString()}</td>
                    
                  </tr>
                ))}
                {/* Total Expenses Row */}
                <tr className="bg-green-100">
                  <td className="px-6 py-6 text-sm font-font font-semibold border border-gray-200">Total</td>
                  <td className="px-6 py-6 text-sm font-font font-semibold border border-gray-200">{totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-6 border border-gray-200" colSpan="5"></td>
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