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
    const transactionString = this.getTransactionString(transaction);
    const newBalance = this.updateBalance(transaction).toFixed(2);
    return `${dateString} || ${transactionString} || ${newBalance}`;
  }

  getDateString(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}/${date.getFullYear()}`;
  }

  getTransactionString(transaction) {
    if (transaction.type === "credit")
      return `${transaction.amount.toFixed(2)} ||`;
    return `|| ${transaction.amount.toFixed(2)}`;
  }

  updateBalance(transaction) {
    this.balance +=
      transaction.type === "credit" ? transaction.amount : -transaction.amount;
    return this.balance;
  }
}

module.exports = PrintStatement;
