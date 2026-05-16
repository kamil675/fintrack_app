import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
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

  const balance = income - expense;

  return (
    <div>
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <p className="text-gray-500 mt-2">Overview of your finances</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Total Income</h2>

          <h1 className="text-3xl font-bold text-green-500 mt-3">₹{income}</h1>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Total Expense</h2>

          <h1 className="text-3xl font-bold text-red-500 mt-3">₹{expense}</h1>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Balance</h2>

          <h1 className="text-3xl font-bold text-blue-500 mt-3">₹{balance}</h1>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Transactions</h2>

          <h1 className="text-3xl font-bold text-purple-500 mt-3">
            {transactions.length}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
