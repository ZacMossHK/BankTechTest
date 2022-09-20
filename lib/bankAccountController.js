class bankAccountController {
  constructor(model) {
    this.model = model;
    this.balance = 0;
  }

  makeTransaction(type, amount, date) {
    this.model.saveToModel({
      amount: amount,
      date: date,
      type: type,
    });
  }

  printStatement() {
    const result = this.model
      .loadFromModel()
      .map(this.makeTransactionIntoStatementString, this)
      .reverse();
    return ["date || credit || debit || balance", ...result].join("\n");
  }

  makeTransactionIntoStatementString(transaction) {
    const dateString = this.getDateString(transaction.date);
    const transactionString =
      this.getTransactionStringAndUpdateBalance(transaction);
    return `${dateString} || ${transactionString} || ${this.balance.toFixed(
      2
    )}`;
  }

  getDateString(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getTransactionStringAndUpdateBalance(transaction) {
    if (transaction.type === "credit") {
      this.balance += transaction.amount;
      return `${transaction.amount.toFixed(2)} ||`;
    }
    this.balance -= transaction.amount;
    return `|| ${transaction.amount.toFixed(2)}`;
  }
}
module.exports = bankAccountController;
