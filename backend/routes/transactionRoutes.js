const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/", protect, addTransaction);

router.get("/", protect, getTransactions);

router.delete("/:id", protect, deleteTransaction);

router.put("/:id", protect, updateTransaction);

module.exports = router;
