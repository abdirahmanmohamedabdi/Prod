"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Payroll() {
  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [payDate, setPayDate] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const fetchPayrolls = async () => {
      try {
        const response = await fetch('/api/payroll');
        const data = await response.json();
        setPayrolls(data);
      } catch (error) {
        console.error('Error fetching payrolls:', error);
      }
    };

    fetchEmployees();
    fetchPayrolls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/payroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employee_id: employeeId, pay_date: payDate, amount }),
      });

      if (response.ok) {
        toast.success('Payroll added successfully');
        setEmployeeId('');
        setPayDate('');
        setAmount('');
        const data = await response.json();
        setPayrolls([...payrolls, ...data]);
      } else {
        toast.error('Error adding payroll');
      }
    } catch (error) {
      console.error('Error adding payroll:', error);
      toast.error('Error adding payroll');
    }
  };

  return (
    <Sidebar>
      <div className="p-6">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-6">Payroll System</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-md">
          <div>
            <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
              Employee
            </label>
            <select
              id="employee"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.secondName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="payDate" className="block text-sm font-medium text-gray-700">
              Pay Date
            </label>
            <input
              type="date"
              id="payDate"
              value={payDate}
              onChange={(e) => setPayDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Payroll
          </button>
        </form>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Payroll Records</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrolls.map((payroll) => (
                <tr key={payroll.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employees.find((employee) => employee.id === payroll.employee_id)?.firstName}{' '}
                    {employees.find((employee) => employee.id === payroll.employee_id)?.secondName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payroll.pay_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payroll.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
}