"use client";
import React, { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';

const FuelExpenses = () => {
  const [fuelExpenses, setFuelExpenses] = useState([]);

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

  return (
    <div>
      <h2>Fuel Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Route Area Code</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {fuelExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.routes.area_code}</td>
              <td>{expense.amount}</td>
              <td>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FuelExpenses;