class BankAccountModel {
  constructor() {}
  saveToModel() {}

  loadFromModel() {
    return [
      {
        amount: 10.0,
        transactionDate: new Date(2022, 4, 4),
        transactionType: "deposit",
      },
    ];
  }
}

module.exports = BankAccountModel;
