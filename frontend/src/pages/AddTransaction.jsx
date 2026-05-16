import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function AddTransaction() {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/transactions", formData);

      toast.success("Transaction Added");

      setFormData({
        type: "expense",
        amount: "",
        category: "",
        date: "",
        description: "",
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-4xl font-bold mb-8 text-green-500">
        Add Transaction
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option value="expense">Expense</option>

          <option value="income">Income</option>
        </select>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-3 rounded-lg h-28"
        />

        <button className="bg-green-500 text-white px-6 py-3 rounded-lg w-full">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
