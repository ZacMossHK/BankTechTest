class BankAccountController {
  constructor(model) {
    this.model = model;
    this.balance = 0;
  }

  makeTransaction(type, amount, date) {
    this.validateTransaction(type, amount, date);
    this.model.saveToModel({
      amount: amount,
      date: date,
      type: type,
    });
  }

  validateTransaction(type, amount, date) {
    if (!type || !amount || !date)
      throw new Error("Missing transaction arguments");
    if (!["credit", "debit"].includes(type))
      throw new Error(
        'Transaction type must be a string - "credit" or "debit"'
      );
    if (typeof amount !== "number")
      throw new Error("Transaction amount must be an integer or float");
    if (!(date instanceof Date))
      throw new Error("Transaction date must be a date instance");
  }

  getStatement() {
    this.balance = 0;
    return [
      "date || credit || debit || balance",
      ...this.getTransactionsAsStatementArray(),
    ].join("\n");
  }

  getTransactionsAsStatementArray() {
    return this.model
      .loadFromModel()
      .sort((a, b) => a.date - b.date)
      .map(this.getSingleStatementTransactionString, this)
      .reverse();
  }

  getSingleStatementTransactionString(transaction) {
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
    return `${day}/${month}/${date.getFullYear()}`;
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

module.exports = BankAccountController;
