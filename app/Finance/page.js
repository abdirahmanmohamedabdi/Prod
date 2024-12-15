"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { TrendingUp, CreditCard, Wallet, Users } from "lucide-react";
import supabase from "../lib/supabaseClient";

export default function FinanceDashboard() {
  const [stats, setStats] = useState([
    { name: "Total Income", value: "0", icon: TrendingUp },
    { name: "Total Expenses", value: "0", icon: CreditCard },
    { name: "Net Profit", value: "0", icon: Wallet },
    { name: "Employees Paid", value: "0", icon: Users },
  ]);

  const quickLinks = [
    { name: "Add Expense", href: "/Finance/Expenses/Create" },
    { name: "Manage Expenses", href: "/Finance/Expenses/Manage" },
    { name: "Operating Income", href: "/Finance/Incomes/Operating" },
    { name: "Non-Operating Income", href: "/Finance/Incomes/Non" },
  ];

  const [chartData, setChartData] = useState({});
  const [selectedChart, setSelectedChart] = useState("all");
  const [totals, setTotals] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalNonOperatingIncome: 0,
    totalOperatingIncome: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: expensesData, error: expensesError } = await supabase
        .from("expenses")
        .select("amount, category");
      const { data: nonOperatingIncomes, error: nonOperatingError } =
        await supabase.from("non_operating_incomes").select("amount, name");
      const { data: operatingIncomes, error: operatingError } = await supabase
        .from("operating_incomes")
        .select("amount, name");
      const { data: employeesPaidData, error: employeesPaidError } =
        await supabase.from("payroll").select("id");

      if (
        expensesError ||
        nonOperatingError ||
        operatingError ||
        employeesPaidError
      ) {
        console.error({
          expensesError,
          nonOperatingError,
          operatingError,
          employeesPaidError,
        });
        return;
      }

      const expensesAmounts = expensesData.map((item) => item.amount);
      const expensesCategories = expensesData.map((item) => item.category);
      const nonOperatingAmounts = nonOperatingIncomes.map(
        (item) => item.amount
      );
      const nonOperatingNames = nonOperatingIncomes.map((item) => item.name);
      const operatingAmounts = operatingIncomes.map((item) => item.amount);
      const operatingNames = operatingIncomes.map((item) => item.name);

      const totalExpenses = expensesAmounts.reduce((a, b) => a + b, 0);
      const totalNonOperatingIncome = nonOperatingAmounts.reduce(
        (a, b) => a + b,
        0
      );
      const totalOperatingIncome = operatingAmounts.reduce((a, b) => a + b, 0);
      const totalIncome = totalNonOperatingIncome + totalOperatingIncome;
      const netProfit = totalIncome - totalExpenses;
      const employeesPaid = employeesPaidData.length;

      setStats([
        {
          name: "Total Income",
          value: `${totalIncome.toLocaleString()}`,
          icon: TrendingUp,
        },
        {
          name: "Total Expenses",
          value: `${totalExpenses.toLocaleString()}`,
          icon: CreditCard,
        },
        {
          name: "Net Profit",
          value: `${netProfit.toLocaleString()}`,
          icon: Wallet,
        },
        {
          name: "Employees Paid",
          value: employeesPaid.toString(),
          icon: Users,
        },
      ]);

      setTotals({
        totalIncome,
        totalExpenses,
        totalNonOperatingIncome,
        totalOperatingIncome,
      });

      setChartData({
        all: [
          { name: "Expenses", value: totalExpenses },
          { name: "Non-Operating Incomes", value: totalNonOperatingIncome },
          { name: "Operating Incomes", value: totalOperatingIncome },
        ].sort((a, b) => b.value - a.value),
        expenses: expensesCategories
          .map((category, index) => ({
            name: category,
            value: expensesAmounts[index],
          }))
          .sort((a, b) => b.value - a.value),
        nonOperatingIncomes: nonOperatingNames
          .map((name, index) => ({ name, value: nonOperatingAmounts[index] }))
          .sort((a, b) => b.value - a.value),
        operatingIncomes: operatingNames
          .map((name, index) => ({ name, value: operatingAmounts[index] }))
          .sort((a, b) => b.value - a.value),
      });
    };

    fetchData();
  }, []);

  return (
    <Sidebar>
      <div className="p-12 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-semibold font-font text-gray-900 mb-6">
          Finance Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <stat.icon className="h-8 w-8 text-gray-600" />
                <h2 className="text-xl font-semibold font-font text-gray-800">
                  {stat.name}
                </h2>
              </div>
              <p className="mt-4 text-3xl font-bold font-font text-gray-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-end mb-6">
          <select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            className="p-3 border-2 border-gray-300 font-font rounded-md shadow-md focus:ring-2 focus:ring-blue-500"
          >
            <option className="font-font" value="all">
              All
            </option>
            <option className="font-font" value="expenses">
              Expenses
            </option>
            <option className="font-font" value="nonOperatingIncomes">
              Non-Operating Incomes
            </option>
            <option className="font-font" value="operatingIncomes">
              Operating Incomes
            </option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-6 mb-8">
          {selectedChart === "all" && chartData.all && (
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold font-font text-gray-800 mb-4">
                All Data
              </h2>
              <div className="space-y-4">
                {chartData.all.map((data) => (
                  <div
                    key={data.name}
                    className="flex justify-between items-center"
                  >
                    <span className="text-lg font-font text-gray-700 w-1/3">
                      {data.name}
                    </span>
                    <span className="text-lg font-font text-gray-700 w-1/3 text-right">
                      {data.value.toLocaleString()}
                    </span>
                    <div className="w-1/3 bg-gray-200 rounded-full h-4 ml-4">
                      <div
                        className="bg-one h-4 rounded-full"
                        style={{
                          width: `${(data.value / totals.totalIncome) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedChart === "expenses" && chartData.expenses && (
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold font-font text-gray-800 mb-4">
                Expenses
              </h2>
              <div className="space-y-4">
                {chartData.expenses.map((data) => (
                  <div
                    key={data.name}
                    className="flex justify-between items-center"
                  >
                    <span className="text-lg font-font text-gray-700 w-1/3">
                      {data.name}
                    </span>
                    <span className="text-lg font-font text-gray-700 w-1/3 text-right">
                      {data.value.toLocaleString()}
                    </span>
                    <div className="w-1/3 bg-gray-200 rounded-full h-4 ml-4">
                      <div
                        className="bg-two h-4 rounded-full"
                        style={{
                          width: `${
                            (data.value / totals.totalExpenses) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedChart === "nonOperatingIncomes" &&
            chartData.nonOperatingIncomes && (
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold font-font text-gray-800 mb-4">
                  Non-Operating Incomes
                </h2>
                <div className="space-y-4">
                  {chartData.nonOperatingIncomes.map((data) => (
                    <div
                      key={data.name}
                      className="flex justify-between items-center"
                    >
                      <span className="text-lg font-font text-gray-700 w-1/3">
                        {data.name}
                      </span>
                      <span className="text-lg font-font text-gray-700 w-1/3 text-right">
                        {data.value.toLocaleString()}
                      </span>
                      <div className="w-1/3 bg-gray-200 rounded-full h-4 ml-4">
                        <div
                          className="bg-green-500 h-4 rounded-full"
                          style={{
                            width: `${
                              (data.value / totals.totalNonOperatingIncome) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          {selectedChart === "operatingIncomes" &&
            chartData.operatingIncomes && (
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold font-font text-gray-800 mb-4">
                  Operating Incomes
                </h2>
                <div className="space-y-4">
                  {chartData.operatingIncomes.map((data) => (
                    <div
                      key={data.name}
                      className="flex justify-between items-center"
                    >
                      <span className="text-lg font-font text-gray-700 w-1/3">
                        {data.name}
                      </span>
                      <span className="text-lg font-font text-gray-700 w-1/3 text-right">
                        {data.value.toLocaleString()}
                      </span>
                      <div className="w-1/3 bg-gray-200 rounded-full h-4 ml-4">
                        <div
                          className="bg-yellow-500 h-4 rounded-full"
                          style={{
                            width: `${
                              (data.value / totals.totalOperatingIncome) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="bg-blue-500 text-white p-5 font-font rounded-lg shadow-md hover:bg-blue-600 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </Sidebar>
  );
}
