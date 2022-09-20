class PrintStatement {
  constructor() {
    this.balance = 0;
  }

  getStatement(transactions) {
    this.balance = 0;
    return [
      "date || credit || debit || balance",
      ...this.getTransactionsAsStatementArray(transactions),
    ].join("\n");
  }

  getTransactionsAsStatementArray(transactions) {
    return transactions
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

module.exports = PrintStatement;
