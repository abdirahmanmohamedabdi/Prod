"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs"; // Ensure correct import path
import Sidebar from "../../../components/Sidebar";
import supabase from "../../../lib/supabaseClient"; // Ensure correct import path
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NonOperatingIncome() {
  const { user } = useUser();
  const [incomes, setIncomes] = useState([]);
  const [newIncome, setNewIncome] = useState({ name: "", amount: "", date: "", term: "", payment_method: "", confirmation_message: "" });

  useEffect(() => {
    const fetchNonOperatingIncome = async () => {
      const { data, error } = await supabase.from('non_operating_incomes').select('*');
      if (error) {
        console.error('Error fetching non-operating incomes:', error.message);
      } else {
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
        setIncomes(sortedData);
      }
    };

    fetchNonOperatingIncome();
  }, []);

  const addIncome = async () => {
    if (newIncome.name && newIncome.amount && newIncome.date && newIncome.term && newIncome.payment_method) {
      // Validate that name is not a number
      if (!isNaN(newIncome.name)) {
        toast.error("Name should not be a number");
        return;
      }

      const uploadedBy = user.username || user.firstName || user.lastName || "Unknown";

      const { data, error } = await supabase.from('non_operating_incomes').insert([{
        name: newIncome.name,
        amount: parseFloat(newIncome.amount),
        date: newIncome.date,
        term: newIncome.term,
        payment_method: newIncome.payment_method,
        confirmation_message: newIncome.confirmation_message,
        uploaded_by: uploadedBy
      }]);

      if (error) {
        console.error('Error adding income:', error.message);
        toast.error('Failed to add income');
      } else {
        toast.success('Income added successfully');
        setNewIncome({ name: "", amount: "", date: "", term: "", payment_method: "", confirmation_message: "" });
        setTimeout(() => {
          window.location.reload(); // Reload the page after a short delay
        }, 2000);
      }
    }
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <Sidebar>
      <div className="p-6 min-h-screen">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-4 font-font text-center">Non-Operating Income</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-font text-gray-600 border-b font-medium">Income Source</th>
              <th className="px-4 py-2 text-left font-font text-gray-600 border-b font-medium">Amount (Ksh)</th>
              <th className="px-4 py-2 text-left font-font text-gray-600 border-b font-medium">Date</th>
              <th className="px-4 py-2 text-left font-font text-gray-600 border-b font-medium">Term</th>
              <th className="px-4 py-2 text-left font-font text-gray-600 border-b font-medium">Payment Method</th>
              <th className="px-4 py-2 text-left font-font text-gray-600 border-b font-medium">Confirmation Message</th>
              <th className="px-4 py-2 text-left font-font text-gray-600 border-b font-medium">Uploaded By</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income, index) => (
              <tr key={index}>
                <td className="px-4 py-2 font-font border-b">{income.name}</td>
                <td className="px-4 py-2  font-font border-b">{income.amount.toLocaleString()}</td>
                <td className="px-4 py-2 font-font border-b">{income.date}</td>
                <td className="px-4 py-2  font-font border-b">{income.term}</td>
                <td className="px-4 py-2 font-font border-b">{income.payment_method}</td>
                <td className="px-4 py-2 font-font border-b">{income.confirmation_message}</td>
                <td className="px-4 py-2 font-font border-b">{income.uploaded_by}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-4 py-2 font-font font-bold">Total</td>
              <td className="px-4 py-2 font-font font-bold">{totalIncome.toLocaleString()}</td>
              <td className="px-4 py-2 font-font font-bold"></td>
              <td className="px-4 py-2 font-font font-bold"></td>
              <td className="px-4 py-2 font-font font-bold"></td>
              <td className="px-4 py-2 font-font font-bold"></td>
              <td className="px-4 py-2 font-font font-bold"></td>
            </tr>
          </tfoot>
        </table>

        <div className="mt-6">
          <h2 className="text-xl font-semibold font-font mb-2">Add New Income</h2>
          <div className="flex flex-wrap sm:flex-nowrap gap-4">
            <input
              type="text"
              placeholder="Income Name"
              value={newIncome.name}
              onChange={(e) => setNewIncome({ ...newIncome, name: e.target.value })}
              className="border border-gray-300 font-font rounded px-4 py-2 w-full sm:w-auto"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newIncome.amount}
              onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
              className="border border-gray-300 font-font rounded px-4 py-2 w-full sm:w-auto"
            />
            <input
              type="date"
              placeholder="Date"
              value={newIncome.date}
              onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
              className="border border-gray-300 font-font rounded px-4 py-2 w-full sm:w-auto"
            />
            <input
              type="text"
              placeholder="Term"
              value={newIncome.term}
              onChange={(e) => setNewIncome({ ...newIncome, term: e.target.value })}
              className="border border-gray-300 font-font rounded px-4 py-2 w-full sm:w-auto"
            />
            <select
              value={newIncome.payment_method}
              onChange={(e) => setNewIncome({ ...newIncome, payment_method: e.target.value })}
              className="border border-gray-300 rounded font-font px-4 py-2 w-full sm:w-auto"
            >
              <option value="">Select Payment Method</option>
              <option value="M-Pesa">M-Pesa</option>
              <option value="Airtel Money">Airtel Money</option>
              <option value="T-Kash">T-Kash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit/Debit Card">Credit/Debit Card</option>
              <option value="Cheque">Cheque</option>
            </select>
            <input
              type="text"
              placeholder="Confirmation Message"
              value={newIncome.confirmation_message}
              onChange={(e) => setNewIncome({ ...newIncome, confirmation_message: e.target.value })}
              className="border border-gray-300 rounded font-font px-4 py-2 w-full sm:w-auto"
            />
            <button
              onClick={addIncome}
              className="bg-one text-white font-font px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Income
            </button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}