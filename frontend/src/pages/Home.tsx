import ExpenseItem from "../components/ExpenseItem";
import ExpenseAdd from "../components/ExpenseAdd";
import useExpenses from "../hooks/useExpenses";
import type { Expense } from "../types/Expense";

const Home = () => {
  const {expenses, addExpense, resetExpenses, loading, error} = useExpenses();

  function handleAddExpense(): void {
    const nextId = (
      expenses.reduce(
        (maxId: number, expense: Expense) => Math.max(maxId, Number(expense.id)),
        0,
      ) + 1
    ).toString();
    const PAYERS = ["Alice", "Bob"];
    const newExpense: Expense = {
      id: nextId,
      date: new Date().toISOString(),
      description: `New expense ${nextId}`,
      payer: PAYERS[Math.floor(Math.random() * PAYERS.length)],
      amount: Math.round(Math.random() * 100 * 100) / 100,
    };

    addExpense(newExpense);
  }

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {error && <p>{error}</p>}

      <ExpenseAdd addExpense={handleAddExpense} />
      <button onClick={() => resetExpenses()}>Reset</button>
      <ul>
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense as Expense} />
        ))}
      </ul>
    </>
  );
};

export default Home;
