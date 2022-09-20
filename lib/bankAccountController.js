class BankAccountController {
  constructor(model, createStatement, handleTransaction) {
    this.model = model;
    this.createStatement = createStatement;
    this.handleTransaction = handleTransaction;
  }

  handleNewTransaction(type, amount, date) {
    this.handleTransaction.makeTransaction(type, amount, date, this.model);
  }

  printStatement() {
    return this.createStatement.getStatement(this.model.loadFromModel());
  }
}

module.exports = BankAccountController;
