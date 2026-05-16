import { useEffect, useState } from "react";

import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function Analytics() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");

      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const pieData = [
    {
      name: "Income",
      value: income,
    },

    {
      name: "Expense",
      value: expense,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  const monthlyData = [];

  transactions.forEach((item) => {
    const month = new Date(item.date).toLocaleString("default", {
      month: "short",
    });

    const existingMonth = monthlyData.find((m) => m.month === month);

    if (existingMonth) {
      if (item.type === "income") {
        existingMonth.income += item.amount;
      } else {
        existingMonth.expense += item.amount;
      }
    } else {
      monthlyData.push({
        month,
        income: item.type === "income" ? item.amount : 0,

        expense: item.type === "expense" ? item.amount : 0,
      });
    }
  });

  return (
    <div>
      <h1 className="text-4xl font-bold">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-5">Income vs Expense</h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-5">Monthly Analytics</h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar dataKey="income" fill="#22c55e" />

                <Bar dataKey="expense" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
