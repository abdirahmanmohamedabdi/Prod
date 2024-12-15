"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../../../lib/supabaseClient'; // Ensure correct import path

export default function Payroll() {
  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [operatingIncomes, setOperatingIncomes] = useState([]);
  const [nonOperatingIncomes, setNonOperatingIncomes] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [payDate, setPayDate] = useState('');
  const [amount, setAmount] = useState('');
  const [socialSecurity, setSocialSecurity] = useState('');
  const [nhif, setNhif] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('');
  const [isEditable, setIsEditable] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase.from('employees').select('*');
      if (error) {
        console.error('Error fetching employees:', error.message);
        toast.error('Failed to fetch employees');
      } else {
        setEmployees(data);
      }
    };

    const fetchPayrolls = async () => {
      const { data, error } = await supabase.from('payroll').select('*');
      if (error) {
        console.error('Error fetching payrolls:', error.message);
        toast.error('Failed to fetch payrolls');
      } else {
        setPayrolls(data);
      }
    };

    const fetchOperatingIncomes = async () => {
      const { data, error } = await supabase.from('operating_incomes').select('*');
      if (error) {
        console.error('Error fetching operating incomes:', error.message);
        toast.error('Failed to fetch operating incomes');
      } else {
        setOperatingIncomes(data);
      }
    };

    const fetchNonOperatingIncomes = async () => {
      const { data, error } = await supabase.from('non_operating_incomes').select('*');
      if (error) {
        console.error('Error fetching non-operating incomes:', error.message);
        toast.error('Failed to fetch non-operating incomes');
      } else {
        setNonOperatingIncomes(data);
      }
    };

    fetchEmployees();
    fetchPayrolls();
    fetchOperatingIncomes();
    fetchNonOperatingIncomes();
  }, []);

  useEffect(() => {
    const fetchSalaryBand = async () => {
      if (employeeId) {
        const employee = employees.find((emp) => emp.id === employeeId);
        if (employee) {
          const { data, error } = await supabase
            .from('salary_bands')
            .select('*')
            .eq('role', employee.role)
            .single();
          if (error) {
            console.error('Error fetching salary band:', error.message);
            toast.error('Failed to fetch salary band');
          } else {
            setAmount(data.base_salary);
            setSocialSecurity(data.social_security);
            setNhif(data.nhif);
            setIsEditable(false); // Make fields non-editable after fetching
          }
        }
      }
    };

    fetchSalaryBand();
  }, [employeeId, employees]);

  const calculateBalance = (employeeId) => {
    const employeePayrolls = payrolls.filter((payroll) => payroll.employee_id === employeeId);
    const totalPaid = employeePayrolls.reduce((sum, payroll) => sum + parseFloat(payroll.amount), 0);
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee ? parseFloat(employee.salary) - totalPaid : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const balance = calculateBalance(employeeId);
    if (balance <= 0) {
      toast.error('Employee has already been fully paid.');
      return;
    }

    const newPayroll = {
      employee_id: employeeId,
      pay_date: payDate,
      amount: parseFloat(amount),
      social_security: parseFloat(socialSecurity),
      nhif: parseFloat(nhif),
      other_expenses: parseFloat(otherExpenses),
    };

    try {
      const { data, error } = await supabase.from('payroll').insert([newPayroll]);

      if (error) {
        throw error;
      }

      // Deduct the salary from the appropriate income source
      const totalIncome = operatingIncomes.reduce((sum, income) => sum + income.amount, 0) + nonOperatingIncomes.reduce((sum, income) => sum + income.amount, 0);
      if (totalIncome >= amount) {
        let remainingAmount = parseFloat(amount);
        for (let income of operatingIncomes) {
          if (remainingAmount <= 0) break;
          if (income.amount >= remainingAmount) {
            await supabase.from('operating_incomes').update({ amount: income.amount - remainingAmount }).eq('id', income.id);
            remainingAmount = 0;
          } else {
            remainingAmount -= income.amount;
            await supabase.from('operating_incomes').update({ amount: 0 }).eq('id', income.id);
          }
        }
        for (let income of nonOperatingIncomes) {
          if (remainingAmount <= 0) break;
          if (income.amount >= remainingAmount) {
            await supabase.from('non_operating_incomes').update({ amount: income.amount - remainingAmount }).eq('id', income.id);
            remainingAmount = 0;
          } else {
            remainingAmount -= income.amount;
            await supabase.from('non_operating_incomes').update({ amount: 0 }).eq('id', income.id);
          }
        }
      }

      toast.success('Payroll added successfully');
      setEmployeeId('');
      setPayDate('');
      setAmount('');
      setSocialSecurity('');
      setNhif('');
      setOtherExpenses('');
      setIsEditable(true); // Reset fields to be editable
      setPayrolls([...payrolls, ...data]);
    } catch (error) {
      console.error('Error adding payroll:', error.message);
      toast.error('Failed to add payroll');
    }
  };

  const handleOtherExpensesChange = async (payrollId, value) => {
    try {
      const { data, error } = await supabase
        .from('payroll')
        .update({ other_expenses: parseFloat(value) })
        .eq('id', payrollId);

      if (error) {
        throw error;
      }

      setPayrolls(payrolls.map((payroll) => (payroll.id === payrollId ? { ...payroll, other_expenses: parseFloat(value) } : payroll)));
      toast.success('Other expenses updated successfully');
    } catch (error) {
      console.error('Error updating other expenses:', error.message);
      toast.error('Failed to update other expenses');
    }
  };

  const filteredEmployees = employees.filter(employee => 
    employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.secondName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEmployeeSelect = (employeeId) => {
    const balance = calculateBalance(employeeId);
    if (balance <= 0) {
      toast.error('Employee has already been fully paid.');
      return;
    }
    setEmployeeId(employeeId);
    const employee = employees.find((emp) => emp.id === employeeId);
    setSearchQuery(`${employee.firstName} ${employee.secondName}`);
  };

  return (
    <Sidebar>
      <div className="p-6">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-6">Payroll System</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 font-font shadow rounded-md">
          <div>
            <label htmlFor="searchEmployee" className="block text-sm font-font font-medium text-gray-700">
              Search Employee
            </label>
            <input
              type="text"
              id="searchEmployee"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 font-font border border-gray-300 rounded-md"
            />
            {searchQuery && (
              <ul className="border border-gray-300 rounded-md mt-2 max-h-40 overflow-y-auto">
                {filteredEmployees.map((employee) => (
                  <li
                    key={employee.id}
                    onClick={() => handleEmployeeSelect(employee.id)}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    {employee.firstName} {employee.secondName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label htmlFor="payDate" className="block text-sm  font-font font-medium text-gray-700">
              Pay Date
            </label>
            <input
              type="date"
              id="payDate"
              value={payDate}
              onChange={(e) => setPayDate(e.target.value)}
              className="w-full px-3 py-2 border font-font border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block font-font text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              disabled={!isEditable}
            />
          </div>
          <div>
            <label htmlFor="socialSecurity" className="block text-sm font-medium font-font text-gray-700">
              Social Security
            </label>
            <input
              type="number"
              id="socialSecurity"
              value={socialSecurity}
              onChange={(e) => setSocialSecurity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              disabled={!isEditable}
            />
          </div>
          <div>
            <label htmlFor="nhif" className="block text-sm font-font font-medium text-gray-700">
              NHIF
            </label>
            <input
              type="number"
              id="nhif"
              value={nhif}
              onChange={(e) => setNhif(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 font-font rounded-md"
              required
              disabled={!isEditable}
            />
          </div>
          <div>
            <label htmlFor="otherExpenses" className="block text-sm font-font font-medium text-gray-700">
              Other Expenses
            </label>
            <input
              type="number"
              id="otherExpenses"
              value={otherExpenses}
              onChange={(e) => setOtherExpenses(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 font-font rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Payroll
          </button>
        </form>
        <div className="mt-8">
          <h2 className="text-xl font-bold font-font mb-4">Payroll Records</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Pay Date</th>
                <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Social Security</th>
                <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">NHIF</th>
                <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Other Expenses</th>
                <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider">Balance Pending</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrolls.map((payroll) => {
                const employee = employees.find((employee) => employee.id === payroll.employee_id);
                return (
                  <tr key={payroll.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee?.firstName} {employee?.secondName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-font text-sm text-gray-500">{payroll.pay_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-font text-sm text-gray-500">{payroll.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-font text-sm text-gray-500">{payroll.social_security}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-font text-sm text-gray-500">{payroll.nhif}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-font text-sm text-gray-500">{payroll.other_expenses}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-font text-sm text-gray-500">{calculateBalance(payroll.employee_id)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
}