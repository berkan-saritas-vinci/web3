import { useEffect, useState } from "react";
import type { Expense } from "../types/Expense";

const host = import.meta.env.VITE_API_URL || 'http://unknown-api-url.com';

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${host}/api/expenses`);
      if (!response.ok) {
        throw new Error(`Failed to fetch expenses (${response.status})`);
      }
      const data = (await response.json()) as Expense[];
      setExpenses(data);
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchExpenses();
  }, []);

  const addExpense =
    async (expense: Expense) => {
      try {
        setError(null);
        const response = await fetch(`${host}/api/expenses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expense),
        });
        if (!response.ok) {
          throw new Error(`Failed to add expense (${response.status})`);
        }
        await fetchExpenses();
      } catch (error) {
        setError(errorMessage(error));
      }
    };

  const resetExpenses = async () => {
    try {
      setError(null);
      const response = await fetch(`${host}/api/expenses/reset`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Failed to reset expenses (${response.status})`);
      }
      await fetchExpenses();
    } catch (error) {
      setError(errorMessage(error));
    }
  };

  return {expenses, loading, error, addExpense, resetExpenses}
};

export default useExpenses;