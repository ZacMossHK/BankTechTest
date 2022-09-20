class BankAccountController {
  constructor(model, createStatement, handleTransaction) {
    this.model = model;
    this.createStatement = createStatement;
    this.handleTransaction = handleTransaction;
  }

  makeNewTransaction(type, amount, date) {
    this.model.saveToModel(
      this.handleTransaction.makeTransaction(type, amount, date)
    );
  }

  printStatement() {
    return this.createStatement.getStatement(this.model.loadFromModel());
  }
}

module.exports = BankAccountController;
