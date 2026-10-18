import type { Expense } from "../types/Expense";

interface ExpenseItemProps {
  expense: Expense;
}

const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  return (
    <>
      <p>Date: {expense.date}</p>
      <p>Description: {expense.description}</p>
      <p>Payer: {expense.payer}</p>
      <p>Amount: {expense.amount} $</p>
      <p>------------------------------------</p>
    </>
  );
};

export default ExpenseItem;
