class bankAccountController {
  constructor(model) {
    this.model = model;
  }

  makeTransaction(transactionType, amount, transactionDate) {
    this.model.saveToModel({
      amount: amount,
      transactionDate: transactionDate,
      transactionType: transactionType,
    });
  }

  makeTransactionIntoStatementString(transaction) {
    const day = transaction.transactionDate
      .getDate()
      .toString()
      .padStart(2, "0");
    const month = (transaction.transactionDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const year = transaction.transactionDate.getFullYear();
    let transactionString = `${day}/${month}/${year} || `;

    if (transaction.transactionType === "deposit") {
      this.balance += transaction.amount;
      transactionString += `${transaction.amount.toFixed(2)} ||`;
    } else {
      this.balance -= transaction.amount;
      transactionString += `|| ${transaction.amount.toFixed(2)}`;
    }
    return `${transactionString} || ${this.balance.toFixed(2)}`;
  }

  printStatement() {
    const result = this.model
      .loadFromModel()
      .map(this.makeTransactionIntoStatementString, this)
      .reverse();
    return ["date || credit || debit || balance", ...result].join("\n");
  }
}
module.exports = bankAccountController;
