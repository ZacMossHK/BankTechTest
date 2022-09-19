class bankAccountController {
  constructor(model) {
    this.model = model;
    this.balance = 0;
  }

  transaction(type, amount, date) {
    this.model.saveToModel({
      amount: amount,
      transactionDate: date,
      transactionType: type,
    });
  }

  transactionIntoStatementString(transaction) {
    let day = transaction.transactionDate.getDate().toString();
    let month = (transaction.transactionDate.getMonth() + 1).toString();
    const year = transaction.transactionDate.getFullYear();
    if (day.length === 1) day = `0${day}`;
    if (month.length === 1) month = `0${month}`;
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
      .map(this.transactionIntoStatementString, this)
      .reverse();
    return ["date || credit || debit || balance", ...result].join("\n");
  }
}
module.exports = bankAccountController;
