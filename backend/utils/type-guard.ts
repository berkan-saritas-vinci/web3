export const ExpenseCondition = (body: unknown): Boolean => {

    if (
    !body ||
    typeof body !== "object" ||
    !("date" in body) ||
    !("description" in body) ||
    !("payer" in body) ||
    !("amount" in body) ||
    typeof body.date !== "string" ||
    typeof body.description !== "string" ||
    typeof body.payer !== "string" ||
    typeof body.amount !== "number" ||
    !body.date.trim() ||
    !body.description.trim() ||
    !body.payer.trim() ||
    body.amount <= 0
  ) {
    return false;
  } else {
    return true;
  }

}