const BankAccountModel = require("../lib/bankAccountModel");

let bankAccountModel;

describe("bankAccountModel class", () => {
  beforeEach(() => {
    bankAccountModel = new BankAccountModel();
  });

  it("saves an object to the model", () => {
    const transactionObject = {
      amount: 10.0,
      transactionDate: new Date(2022, 4, 4),
      transactionType: "deposit",
    };
    bankAccountModel.saveToModel(transactionObject);
    expect(bankAccountModel.loadFromModel()).toEqual([transactionObject]);
  });

  it("saves two objects to the model", () => {
    const transactionObject1 = {
      amount: 10.0,
      transactionDate: new Date(2022, 4, 4),
      transactionType: "deposit",
    };
    const transactionObject2 = {
      amount: 5.0,
      transactionDate: new Date(2022, 4, 5),
      transactionType: "withdraw",
    };
    bankAccountModel.saveToModel(transactionObject1);
    bankAccountModel.saveToModel(transactionObject2);
    expect(bankAccountModel.loadFromModel()).toEqual([
      transactionObject1,
      transactionObject2,
    ]);
  });
});
