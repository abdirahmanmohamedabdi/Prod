"use client";
import { useState, useEffect } from "react";
import { UilArrowUp, UilArrowDown, UilDollarSign } from "@iconscout/react-unicons";
import Layout from "@/app/components/Sidebar";
// Example of fetching financial data (simulated)
const fetchFinanceData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalIncome: 100000,
        totalExpenses: 60000,
        netIncome: 40000,
        transactions: [
          { id: 1, type: "Income", amount: 20000, date: "2024-11-01", description: "Tuition Fees" },
          { id: 2, type: "Expense", amount: 15000, date: "2024-11-02", description: "Hostel Maintenance" },
          { id: 3, type: "Income", amount: 25000, date: "2024-11-03", description: "Transportation Fees" },
          { id: 4, type: "Expense", amount: 10000, date: "2024-11-04", description: "Books Purchase" },
        ],
      });
    }, 1000); // Simulate a network delay
  });
};

export default function FinanceDashboard() {
  const [financeData, setFinanceData] = useState(null);
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
  useEffect(() => {
    const getData = async () => {
      const data = await fetchFinanceData();
      setFinanceData(data);
    };

    getData();
  }, []);

  if (!financeData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout userRole={userRole}>
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold font-font text-center mb-6">Finance Dashboard</h1>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Income */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-green-500">
            <UilArrowUp className="inline-block mr-2" />
            {financeData.totalIncome.toLocaleString()}
          </div>
          <p className="text-xl font-medium font-font text-gray-600">Total Income</p>
        </div>

        {/* Total Expenses */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-red-500">
            <UilArrowDown className="inline-block mr-2" />
            {financeData.totalExpenses.toLocaleString()}
          </div>
          <p className="text-xl font-medium font-font text-gray-600">Total Expenses</p>
        </div>

        {/* Net Income */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-blue-500">
            <UilDollarSign className="inline-block mr-2" />
            {financeData.netIncome.toLocaleString()}
          </div>
          <p className="text-xl font-medium font-font text-gray-600">Net Income</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold font-font mb-4">Recent Transactions</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-font text-gray-600 font-medium">Date</th>
              <th className="px-4 py-2 text-left font-font text-gray-600 font-medium">Description</th>
              <th className="px-4 py-2 text-left font-font text-gray-600 font-medium">Amount (Ksh)</th>
              <th className="px-4 py-2 text-left font-font text-gray-600 font-medium">Type</th>
            </tr>
          </thead>
          <tbody>
            {financeData.transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b hover:bg-gray-50">
                <td className="px-4 font-font py-2">{transaction.date}</td>
                <td className="px-4 font-font py-2">{transaction.description}</td>
                <td className="px-4 font-font py-2">{transaction.amount.toLocaleString()}</td>
                <td className="px-4 font-font py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      transaction.type === "Income" ? "bg-green-100 font-font text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
}
