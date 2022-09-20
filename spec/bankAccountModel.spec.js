const BankAccountModel = require("../lib/bankAccountModel");

let bankAccountModel;

describe("bankAccountModel class", () => {
  beforeEach(() => {
    bankAccountModel = new BankAccountModel();
  });

  it("saves an object to the model", () => {
    const transactionObject = {
      amount: 10.0,
      date: new Date(2022, 4, 4),
      type: "credit",
    };
    bankAccountModel.saveToModel(transactionObject);
    expect(bankAccountModel.loadFromModel()).toEqual([transactionObject]);
  });

  it("saves two objects to the model", () => {
    const transactionObject1 = {
      amount: 10.0,
      date: new Date(2022, 4, 4),
      type: "credit",
    };
    const transactionObject2 = {
      amount: 5.0,
      date: new Date(2022, 4, 5),
      type: "debit",
    };
    bankAccountModel.saveToModel(transactionObject1);
    bankAccountModel.saveToModel(transactionObject2);
    expect(bankAccountModel.loadFromModel()).toEqual([
      transactionObject1,
      transactionObject2,
    ]);
  });
});
