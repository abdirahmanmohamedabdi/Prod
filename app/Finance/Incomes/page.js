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

const IncomesPage = () => {
  const { user } = useUser();
  const [incomes, setIncomes] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const { data: operatingIncomes, error: operatingError } = await supabase.from('operating_incomes').select('*');
        if (operatingError) {
          throw operatingError;
        }

        const { data: nonOperatingIncomes, error: nonOperatingError } = await supabase.from('non_operating_incomes').select('*');
        if (nonOperatingError) {
          throw nonOperatingError;
        }

        // Add type to each income
        const combinedIncomes = [
          ...operatingIncomes.map(income => ({ ...income, type: 'Operating' })),
          ...nonOperatingIncomes.map(income => ({ ...income, type: 'Non-Operating' }))
        ];
        setIncomes(combinedIncomes);
      } catch (error) {
        console.error('Error fetching incomes:', error);
        toast.error('Failed to fetch incomes');
      }
    };

    fetchIncomes();
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
      doc.text('Incomes Report', pageWidth / 2, imgHeight + 80, { align: 'center' });

      // Add date
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Date: ${currentDate}`, 40, imgHeight + 90);

      // Table Configuration
      const tableColumn = ['Name', 'Amount (Ksh)', 'Date', 'Term', 'Uploaded By', 'Payment Method', 'Confirmation Message', 'Type'];
      const tableRows = filteredIncomes.map((income) => [
        income.name,
        income.amount.toLocaleString(),
        new Date(income.date).toLocaleDateString(),
        income.term,
        income.uploaded_by,
        income.payment_method,
        income.confirmation_message,
        income.type,
      ]);

      // Add Total Row
      const totalAmount = filteredIncomes.reduce((total, income) => total + parseFloat(income.amount), 0);
      tableRows.push(['Total', totalAmount.toLocaleString(), '', '', '', '', '', '']);

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
          0: { cellWidth: 'auto', overflow: 'linebreak' }, // Name
          1: { cellWidth: 'auto', halign: 'right', overflow: 'linebreak' }, // Amount
          2: { cellWidth: 'auto', overflow: 'linebreak' }, // Date
          3: { cellWidth: 'auto', overflow: 'linebreak' }, // Term
          4: { cellWidth: 'auto', overflow: 'linebreak' }, // Uploaded By
          5: { cellWidth: 'auto', overflow: 'linebreak' }, // Payment Method
          6: { cellWidth: 'auto', overflow: 'linebreak' }, // Confirmation Message
          7: { cellWidth: 'auto', overflow: 'linebreak' }, // Type
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
      doc.save(`incomes_reports_${currentDate}.pdf`);
    };
  };

  const filteredIncomes = incomes.filter((income) => {
    return (
      (filterCategory === "All" || income.category === filterCategory) &&
      (filterDate ? income.date.includes(filterDate) : true)
    );
  });

  const totalAmount = filteredIncomes.reduce(
    (total, income) => total + parseFloat(income.amount),
    0
  );

  const handleUploadComplete = async (res) => {
    try {
      const url = res[0].url;

      const { data, error } = await supabase.from('financial_reports').insert([{
        name: res[0].name,
        url: url,
        uploaded_by: `${user.firstName} ${user.lastName}`,
        report_type: 'Incomes' // Add the report type here
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
              <option value="Operating Income">Operating Income</option>
              <option value="Non-Operating Income">Non-Operating Income</option>
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

        {/* Incomes Table */}
        <div className="mt-8">
          <h3 className="text-xl font-font font-semibold">Incomes List</h3>
          <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Amount (Ksh)</th>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Term</th>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Uploaded By</th>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Payment Method</th>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Confirmation Message</th>
                  <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredIncomes.map((income, index) => (
                  <tr key={income.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{income.name}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{income.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{new Date(income.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{income.term}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{income.uploaded_by}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{income.payment_method}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{income.confirmation_message}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{income.type}</td>
                  </tr>
                ))}
                {/* Total Incomes Row */}
                <tr className="bg-green-100">
                  <td className="border font-font p-2 font-bold">Total</td>
                  <td className="border font-font p-2 font-bold">{totalAmount.toLocaleString()}</td>
                  <td className="border font-font p-2"></td>
                  <td className="border font-font p-2"></td>
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

export default IncomesPage;