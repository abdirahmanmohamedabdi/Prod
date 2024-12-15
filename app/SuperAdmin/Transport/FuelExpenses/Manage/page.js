"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import supabase from '../../../lib/supabaseClient';

const ManageFuelExpenses = () => {
  const [fuelExpenses, setFuelExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchFuelExpenses = async () => {
      const { data, error } = await supabase
        .from('fuel_expenses')
        .select('*, routes(area_code)');
      if (error) console.error('Error fetching fuel expenses:', error);
      else setFuelExpenses(data);
    };

    fetchFuelExpenses();
  }, []);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setAmount(expense.amount);
    setDate(expense.date);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('fuel_expenses')
      .update({ amount: parseFloat(amount), date })
      .eq('id', editingExpense.id);

    if (error) {
      console.error('Error updating fuel expense:', error);
    } else {
      setFuelExpenses(fuelExpenses.map((expense) =>
        expense.id === editingExpense.id ? data[0] : expense
      ));
      setEditingExpense(null);
      setAmount('');
      setDate('');
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('fuel_expenses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting fuel expense:', error);
    } else {
      setFuelExpenses(fuelExpenses.filter((expense) => expense.id !== id));
    }
  };

  return (
    <Sidebar>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Fuel Expenses</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-font text-gray-600 border-b font-medium">Route Area Code</th>
              <th className="px-4 py-2 text-left font-font text-gray-600 border-b font-medium">Amount</th>
              <th className="px-4 py-2 text-left font-font text-gray-600 border-b font-medium">Date</th>
              <th className="px-4 py-2 text-left font-font text-gray-600 border-b font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fuelExpenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-4 py-2 font-font border-b">{expense.routes.area_code}</td>
                <td className="px-4 py-2 font-font border-b">{expense.amount}</td>
                <td className="px-4 py-2 font-font border-b">{expense.date}</td>
                <td className="px-4 py-2 font-font border-b">
                  <button
                    onClick={() => handleEdit(expense)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingExpense && (
          <div className="mt-6">
            <h2 className="text-xl font-font font-semibold mb-2">Edit Fuel Expense</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditingExpense(null)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default ManageFuelExpenses;