import React from 'react';

const PrintableContent = React.forwardRef(({ pdfTitle, pdfSubtitle, filteredExpenses, totalAmount }, ref) => (
  <div ref={ref} className="p-6 space-y-8">
    <h1 className="text-3xl font-bold mb-6 font-font text-center text-gray-900">{pdfTitle}</h1>
    <p className="text-center text-gray-700">{pdfSubtitle}</p>
    <div className="mt-8">
      <h3 className="text-xl font-font font-semibold">Expenses List</h3>
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Expense Name</th>
              <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Amount (Ksh)</th>
              <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Category</th>
              <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Date</th>
              <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Payment Method</th>
              <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Term</th>
              <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Uploaded By</th>
              <th className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Confirmation Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredExpenses.map((expense, index) => (
              <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-gray-800">{expense.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{expense.amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{expense.category}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{expense.date}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{expense.paymentMethod}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{expense.notes}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{expense.uploaded_by}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm font-font text-blue-900">{expense.confirmationMessage}</td>
              </tr>
            ))}
            {/* Total Expenses Row */}
            <tr className="bg-green-100">
              <td className="border font-font p-2 font-bold">Total</td>
              <td className="border font-font p-2 font-bold">{totalAmount.toLocaleString()}</td>
              <td className="border font-font p-2"></td>
              <td className="border font-font p-2"></td>
              <td className="border font-font p-2"></td>
              <td className="border font-font p-2"></td>
              <td className="border font-font p-2"></td>
              <td className="border font-font p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
));

export default PrintableContent;