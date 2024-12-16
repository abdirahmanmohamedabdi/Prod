"use client";
import { useState } from 'react';
import supabase from '../../../lib/supabaseClient';
import Sidebar from '../../../components/Sidebar';

export default function CreateExpense() {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('expenses').insert([
            {
                category,
                amount: parseFloat(amount),
                description,
                confirmation_message: confirmationMessage,
            },
        ]);

        if (error) {
            console.error('Error creating expense:', error);
            alert('Error creating expense. Please try again.');
        } else {
            alert('Expense created successfully!');
            setCategory('');
            setAmount('');
            setDescription('');
            setConfirmationMessage('');
        }
    };

    return (
        <Sidebar>
            <div className="p-6 space-y-8 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Create Expense</h1>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter category"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter amount"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter description"
                            rows="4"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirmation Message</label>
                        <input
                            type="text"
                            value={confirmationMessage}
                            onChange={(e) => setConfirmationMessage(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter confirmation message"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Sidebar>
    );
}
