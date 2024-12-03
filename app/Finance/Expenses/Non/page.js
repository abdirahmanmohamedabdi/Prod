"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
// Example of fetching non-operating income data (simulated)
const fetchNonOperatingIncome = () => {
    
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "Donations", amount: 20000, year: 2024, term: "Fall" },
        { name: "Sponsorships", amount: 15000, year: 2023, term: "Spring" },
        { name: "Rental Income", amount: 10000, year: 2024, term: "Fall" },
        { name: "Investment Returns", amount: 5000, year: 2023, term: "Spring" },
      ]);
    }, 1000); // Simulate a network delay
  });
};

export default function NonOperatingIncome() {
  const [incomes, setIncomes] = useState([]);
  const [newIncome, setNewIncome] = useState({ name: "", amount: "", year: "", term: "" });
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
  // Fetch non-operating income data and sort by year
  useEffect(() => {
    const getData = async () => {
      const data = await fetchNonOperatingIncome();
      const sortedData = data.sort((a, b) => b.year - a.year); // Sort by year descending
      setIncomes(sortedData);
    };

    getData();
  }, []);

  const addIncome = () => {
    if (newIncome.name && newIncome.amount && newIncome.year && newIncome.term) {
      setIncomes([
        ...incomes,
        { name: newIncome.name, amount: parseFloat(newIncome.amount), year: parseInt(newIncome.year), term: newIncome.term },
      ]);
      setNewIncome({ name: "", amount: "", year: "", term: "" });
    }
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <Sidebar>
    <div className="p-6  min-h-screen">
      <h1 className="text-2xl font-bold font-font  mb-4 text-center">Non-Operating Income</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 font-font  text-left text-gray-600 border-b font-medium">Income Source</th>
            <th className="px-4 py-2 font-font  text-left text-gray-600 border-b font-medium">Amount (Ksh)</th>
            <th className="px-4 py-2 font-font  text-left text-gray-600 border-b font-medium">Year</th>
            <th className="px-4 py-2 font-font  text-left text-gray-600 border-b font-medium">Term</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income, index) => (
            <tr key={index}>
              <td className="px-4 py-2 font-font  border-b font-normal">{income.name}</td>
              <td className="px-4 py-2 font-font  border-b font-normal">{income.amount.toLocaleString()}</td>
              <td className="px-4 py-2 font-font  border-b font-normal">{income.year}</td>
              <td className="px-4 py-2 font-font  border-b font-normal">{income.term}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="px-4 font-font  py-2 font-bold">Total</td>
            <td className="px-4 font-font  py-2 font-bold">{totalIncome.toLocaleString()}</td>
            <td className="px-4 font-font  py-2 font-bold"></td>
            <td className="px-4 font-font  py-2 font-bold"></td>
          </tr>
        </tfoot>
      </table>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Add New Income</h2>
        <div className="flex flex-wrap sm:flex-nowrap gap-4">
          <input
            type="text"
            placeholder="Income Name"
            value={newIncome.name}
            onChange={(e) => setNewIncome({ ...newIncome, name: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newIncome.amount}
            onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
          />
          <input
            type="number"
            placeholder="Year"
            value={newIncome.year}
            onChange={(e) => setNewIncome({ ...newIncome, year: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
          />
          <input
            type="text"
            placeholder="Term"
            value={newIncome.term}
            onChange={(e) => setNewIncome({ ...newIncome, term: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
          />
          <button
            onClick={addIncome}
            className="bg-one font-font text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Income
          </button>
        </div>
      </div>
    </div>
    </Sidebar>
  );
}
