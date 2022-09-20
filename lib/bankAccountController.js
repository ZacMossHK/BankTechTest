class BankAccountController {
  constructor(model, printStatement, handleTransaction) {
    this.model = model;
    this.printStatement = printStatement;
    this.handleTransaction = handleTransaction;
  }

  makeNewTransaction(type, amount, date) {
    this.model.saveToModel(
      this.handleTransaction.makeTransaction(type, amount, date)
    );
  }

  printAccountStatement() {
    return this.printStatement.getStatement(this.model.loadFromModel());
  }
}

module.exports = BankAccountController;
