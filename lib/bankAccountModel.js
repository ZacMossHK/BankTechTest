class BankAccountModel {
  constructor() {
    this.transactions = [];
  }

  saveToModel(transaction) {
    this.transactions.push(transaction);
  }

  loadFromModel() {
    return this.transactions;
  }
}

module.exports = BankAccountModel;
