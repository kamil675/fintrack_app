import { useEffect, useState } from "react";

import API from "../services/api";

import { CSVLink } from "react-csv";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [search, setSearch] = useState("");

  const [date, setDate] = useState("");

  const [type, setType] = useState("");

  const [editId, setEditId] = useState(null);

  const [editData, setEditData] = useState({
    category: "",
    amount: "",
  });

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");

      setTransactions(res.data);

      setFilteredData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    let data = [...transactions];

    if (search) {
      data = data.filter((item) =>
        item.category.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (date) {
      data = data.filter(
        (item) => new Date(item.date).toISOString().split("T")[0] === date,
      );
    }

    if (type) {
      data = data.filter((item) => item.type === type);
    }

    setFilteredData(data);
  }, [search, date, type, transactions]);

  const deleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);

      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);

    setEditData({
      category: item.category,
      amount: item.amount,
    });
  };

  const updateTransaction = async () => {
    try {
      await API.put(`/transactions/${editId}`, editData);

      setEditId(null);

      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between gap-5">
        <div>
          <h1 className="text-4xl font-bold">Transactions</h1>

          <p className="text-gray-500 mt-2">{filteredData.length} record(s)</p>
        </div>

        <CSVLink
          data={filteredData}
          filename={"transactions.csv"}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-base font-semibold flex items-center justify-center w-fit transition-all duration-200"
        >
          Export CSV
        </CSVLink>
      </div>

      <div className="bg-white p-5 rounded-xl shadow mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <input
            type="text"
            placeholder="Search category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">All</option>

            <option value="income">Income</option>

            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow mt-8 p-5 overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-3">
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td>{item.type}</td>

                <td>
                  {editId === item._id ? (
                    <input
                      type="text"
                      value={editData.category}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          category: e.target.value,
                        })
                      }
                      className="border p-2 rounded"
                    />
                  ) : (
                    item.category
                  )}
                </td>

                <td>
                  {editId === item._id ? (
                    <input
                      type="number"
                      value={editData.amount}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          amount: e.target.value,
                        })
                      }
                      className="border p-2 rounded"
                    />
                  ) : (
                    `₹${item.amount}`
                  )}
                </td>

                <td>{item.description}</td>

                <td className="space-x-2">
                  {editId === item._id ? (
                    <button
                      onClick={updateTransaction}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteTransaction(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
