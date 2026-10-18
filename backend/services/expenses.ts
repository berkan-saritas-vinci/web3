import fs from "fs";
import type { Expense, NewExpense } from "../types/Expense.ts";
import path, {dirname} from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonDbPath = path.join(__dirname, "../data/expenses.json");
const initDbPath = path.join(__dirname, "../data/expenses.init.json");

export function getAllExpenses(): Expense[] {
    const expenses = fs.readFileSync(jsonDbPath, "utf-8");

    return JSON.parse(expenses);
}

export function addExpense(expense: Expense): Expense {
    const expenses = getAllExpenses();
    const updatedExpenses = [...expenses, expense];

    fs.writeFileSync(jsonDbPath, JSON.stringify(updatedExpenses, null, 2)); 

    return expense;
}
export function resetExpense(): Expense[] {
   const init = fs.readFileSync(initDbPath, "utf-8");
   const defaultExpenses: Expense[] = JSON.parse(init);
   
   fs.writeFileSync(jsonDbPath, JSON.stringify(defaultExpenses, null, 2), "utf-8");

   return defaultExpenses;
}