const BankAccountController = require("../lib/bankAccountController");

let bankAccountController, mockBankAccountModel, mockCreateStatement;

describe("BankAccountController class", () => {
  beforeEach(() => {
    mockBankAccountModel = { saveToModel: jest.fn(), loadFromModel: jest.fn() };
    mockCreateStatement = { getStatement: jest.fn() };
    bankAccountController = new BankAccountController(
      mockBankAccountModel,
      mockCreateStatement
    );
  });

  it("makes a transaction", () => {
    const transactionObject = {
      amount: 10.0,
      date: new Date(2022, 4, 4),
      type: "credit",
    };
    bankAccountController.makeTransaction("credit", 10.0, new Date(2022, 4, 4));
    expect(mockBankAccountModel.saveToModel).toHaveBeenCalledWith(
      transactionObject
    );
  });

  it("prints the statement with one transaction", () => {
    const transactionObject = {
      amount: 10.0,
      date: new Date(2022, 4, 4),
      type: "credit",
    };
    mockBankAccountModel.loadFromModel.mockReturnValueOnce([transactionObject]);
    mockCreateStatement.getStatement.mockReturnValueOnce(
      "date || credit || debit || balance\n04/05/2022 || 10.00 || || 10.00"
    );
    expect(bankAccountController.printStatement()).toBe(
      "date || credit || debit || balance\n04/05/2022 || 10.00 || || 10.00"
    );
    expect(mockCreateStatement.getStatement).toHaveBeenCalledWith([
      transactionObject,
    ]);
  });

  it("throws an error if transaction type is not credit or debit", () => {
    expect(() => {
      bankAccountController.makeTransaction(
        "balloon",
        100.0,
        new Date(2022, 4, 4)
      );
    }).toThrow(
      new Error('Transaction type must be a string - "credit" or "debit"')
    );
  });

  it("throws an error if transaction amount is not an integer or float", () => {
    expect(() => {
      bankAccountController.makeTransaction(
        "credit",
        "50",
        new Date(2022, 4, 4)
      );
    }).toThrow(new Error("Transaction amount must be an integer or float"));
  });

  it("throws an error if transaction date is not a Date instance", () => {
    expect(() => {
      bankAccountController.makeTransaction("credit", 50, "4/4/2022");
    }).toThrow(new Error("Transaction date must be a date instance"));
  });

  it("throws an error if any transaction arguments are missing", () => {
    expect(() => {
      bankAccountController.makeTransaction("credit", 50);
    }).toThrow(new Error("Missing transaction arguments"));
    expect(() => {
      bankAccountController.makeTransaction("credit");
    }).toThrow(new Error("Missing transaction arguments"));
    expect(() => {
      bankAccountController.makeTransaction();
    }).toThrow(new Error("Missing transaction arguments"));
  });
});
