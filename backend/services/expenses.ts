import fs from "fs";
import type { Expense, NewExpense } from "../types/Expense.ts";
import path, {dirname} from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "../src/prisma/db.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonDbPath = path.join(__dirname, "../data/expenses.json");
const initDbPath = path.join(__dirname, "../data/expenses.init.json");

export async function getAllExpenses(): Promise<Expense[]> {
    //const expenses = fs.readFileSync(jsonDbPath, "utf-8");
    const expenses = await db.orm.public.Expense.all();

    return expenses.map((expense) => ({
        ...expense,
        id: String(expense.id),
    }));
}

export async function addExpense(expense: Expense): Promise<Expense> {
    const NewExpense = await db.orm.public.Expense.create({
    amount: expense.amount,
    date: expense.date,
    description: expense.description,
    payer: expense.payer,
  });

    return {
        ...NewExpense,
        id: String(NewExpense.id),
    };
}
export function resetExpense(): Expense[] {
   const init = fs.readFileSync(initDbPath, "utf-8");
   const defaultExpenses: Expense[] = JSON.parse(init);
   
   fs.writeFileSync(jsonDbPath, JSON.stringify(defaultExpenses, null, 2), "utf-8");

   return defaultExpenses;
}