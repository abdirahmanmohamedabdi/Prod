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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create Expense</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 w-full"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Confirmation Message</label>
                    <input
                        type="text"
                        value={confirmationMessage}
                        onChange={(e) => setConfirmationMessage(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Submit
                </button>
            </form>
        </div>
        </Sidebar>
    );
}
