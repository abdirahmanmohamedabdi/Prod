"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "../../../lib/supabaseClient";
import { SortAsc, SortDesc } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
export default function ManageExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "ascending",
  });
  const { user } = useUser();

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase.from("expenses").select("*");

      if (error) {
        console.error("Error fetching expenses:", error);
      } else {
        setExpenses(data);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);

    if (error) {
      console.error("Error deleting expense:", error);
    } else {
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <Sidebar>
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-2xl font-extrabold font-font tracking-tight text-gray-900 sm:text-3xl">
            Expense history
          </h1>
          <p className="mt-2 text-sm font-font text-gray-500">
            Check the status of recent expenses, manage returns, and download
            invoices.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="sr-only font-font" >Recent expenses</h2>

          <div className="space-y-20">
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => requestSort("amount")}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-font text-sm font-medium rounded-md text-white bg-one hover:bg-one focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {sortConfig.key === "amount" &&
                sortConfig.direction === "ascending" ? (
                  <SortAsc className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                ) : (
                  <SortDesc className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                )}
                Sort by Amount
              </button>
              <button
                onClick={() => requestSort("date")}
                className="inline-flex items-center px-4 py-2 border border-transparent font-font shadow-sm text-base font-medium rounded-md text-white text-white bg-one hover:bg-one  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {sortConfig.key === "date" &&
                sortConfig.direction === "ascending" ? (
                  <SortAsc className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                ) : (
                  <SortDesc className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                )}
                Sort by Date
              </button>
            </div>
            {sortedExpenses.map((expense) => (
              <div key={expense.id}>
                <h3 className="sr-only font-font">
                  Expense recorded on{" "}
                  <time dateTime={expense.date}>
                    {new Date(expense.date).toLocaleDateString()}
                  </time>
                </h3>

                <table className="mt-4 w-full text-gray-500 font-font sm:mt-6">
                  <caption className="sr-only font-font">Details</caption>
                  <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                    <tr>
                      <th
                        scope="col"
                        className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-font font-normal"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="hidden w-1/5 pr-8 py-3 font-normal font-font sm:table-cell"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="hidden pr-8 py-3 font-normal font-font sm:table-cell"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="hidden pr-8 py-3 font-normal font-font sm:table-cell"
                      >
                        Confirmation Message
                      </th>
                      <th
                        scope="col"
                        className="hidden pr-8 py-3 font-normal font-font sm:table-cell"
                      >
                        Date
                      </th>
                     
                      <th
                        scope="col"
                        className="w-0 py-3 font-normal font-font text-right"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                    <tr key={expense.id}>
                      <td className="py-6 pr-8">
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium font-font text-gray-900">
                              {expense.description}
                            </div>
                            <div className="mt-1 font-font sm:hidden">
                              {expense.amount}
                            </div>
                            <div className="mt-1 font-font sm:hidden">
                              {expense.amount}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-6 pr-8 font-font sm:table-cell">
                        {expense.amount}
                      </td>
                      <td className="hidden py-6 pr-8 font-font sm:table-cell">
                      {expense.category}
                      </td>
                      <td className="hidden py-6 pr-8 font-font sm:table-cell">
                      {expense.confirmation_message}
                      </td>
                      <td className="hidden py-6 pr-8 font-font sm:table-cell">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                     
                      <td className="py-6 font-medium text-right whitespace-nowrap">
                        <button className="text-indigo-600 font-font hover:text-indigo-900 mr-4">
                          Edit
                        </button>
                        
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="text-red-600 font-font hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </Sidebar>
  );
}
