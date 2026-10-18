interface ExpenseAddProps {
    addExpense: () => void;
}

const ExpenseAdd = ({addExpense}: ExpenseAddProps) => {

    return (
        <>
        <button onClick={() => addExpense()}>Add Expense</button>
        </>
    )
}

export default ExpenseAdd;