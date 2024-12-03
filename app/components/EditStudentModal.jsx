"use client"
import { useState } from "react";

export default function EditStudentModal({
  showModal,
  setShowModal,
  handleAddPayment,
  paymentMethods,
}) {
  const [newPayment, setNewPayment] = useState({
    amount: "",
    date: "",
    method: paymentMethods[0]?.name || "",
  });

  const handleSubmit = () => {
    handleAddPayment(newPayment);
    setShowModal(false);
    setNewPayment({ amount: "", date: "", method: paymentMethods[0]?.name });
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Add Payment</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            className="w-full border rounded-md p-2"
            value={newPayment.amount}
            onChange={(e) =>
              setNewPayment({ ...newPayment, amount: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            className="w-full border rounded-md p-2"
            value={newPayment.date}
            onChange={(e) =>
              setNewPayment({ ...newPayment, date: e.target.value })
            }
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Submit Payment
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="mt-2 w-full bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
