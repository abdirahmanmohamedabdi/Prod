"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/app/components/Layout";
const ExpenseForm = ({ addExpense }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Operating");
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [notes, setNotes] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({
      name,
      amount,
      category,
      date,
      paymentMethod,
      notes,
    });
    setName("");
    setAmount("");
    setCategory("Operating");
    setDate("");
    setPaymentMethod("Cash");
    setNotes("");
  };

  return (
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <div className="w-full">
          <label className="block text-sm font-font font-medium">Expense Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-font font-medium">Amount (Ksh)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-full">
          <label className="block text-sm font-font font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full font-font p-2 border rounded-md"
          >
            <option value="Operating">Operating</option>
            <option value="Non-Operating">Non-Operating</option>
          </select>
        </div>
        <div className="w-full">
          <label className="block text-sm font-font font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-full">
          <label className="block font-font text-sm font-medium">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1 w-full p-2 font-font border rounded-md"
          >
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Credit">Credit</option>
          </select>
        </div>
        <div className="w-full">
          <label className="block text-sm font-font font-medium">Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full mt-4 bg-blue-600 font-font text-white p-2 rounded-md"
      >
        Add Expense
      </button>
    </form>
  );
};

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([
    { name: "Office Supplies", amount: "500", category: "Operating", date: "2024-11-01", paymentMethod: "Cash", notes: "Pens and notebooks" },
    { name: "Travel", amount: "2000", category: "Non-Operating", date: "2024-11-05", paymentMethod: "Bank Transfer", notes: "Business trip to NYC" },
  ]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate, setFilterDate] = useState("");
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
    // Fetch expenses from an API
    const fetchExpenses = async () => {
      try {
        const response = await fetch('/api/expenses');
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const addExpense = async (expense) => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });

      if (response.ok) {
        const newExpense = await response.json();
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      } else {
        console.error('Error adding expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
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

  return (
    <Layout userRole={userRole}>
    <div className="p-6 space-y-8">
      {/* Expense Form */}
      <h2 className="text-2xl font-font font-semibold">Add New Expense</h2>
      <ExpenseForm addExpense={addExpense} />

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
        <table className="min-w-full mt-4 table-auto border-collapse">
          <thead>
            <tr>
              <th className="border font-font p-2">Expense Name</th>
              <th className="border font-font p-2">Amount (Ksh)</th>
              <th className="border font-font p-2">Category</th>
              <th className="border font-font p-2">Date</th>
              <th className="border font-font p-2">Payment Method</th>
              <th className="border font-font p-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense, index) => (
              <tr key={index}>
                <td className="border font-font p-2">{expense.name}</td>
                <td className="border font-font p-2">{expense.amount}</td>
                <td className="border font-font p-2">{expense.category}</td>
                <td className="border font-font p-2">{expense.date}</td>
                <td className="border font-font p-2">{expense.paymentMethod}</td>
                <td className="border font-font p-2">{expense.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Expenses */}
        <div className="mt-4">
          <p className="font-semibold font-font">Total Expenses: Ksh {totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ExpensesPage;