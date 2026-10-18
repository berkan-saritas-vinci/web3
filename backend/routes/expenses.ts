import { Router } from "express";
import { addExpense, getAllExpenses, resetExpense } from "../services/expenses.ts";
import { ExpenseCondition } from "../utils/type-guard.ts";
import type { Expense, NewExpense } from "../types/Expense.ts";

const router = Router();

router.get("/", (req, res) => {
  try {
    const expenses = getAllExpenses();
    return res.json(expenses);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

router.post("/", (req, res) => {
  try {
    const expense: Expense = {id: String(Date.now()), ...req.body};

    if (!ExpenseCondition(expense)) {
      return res.sendStatus(400);
    }

    addExpense(expense);
    return res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

router.post("/reset", (req, res) => {
  try {

    const expenses = resetExpense();
    return res.status(200).json(expenses);

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

export default router;
