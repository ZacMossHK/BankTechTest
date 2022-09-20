const BankAccountController = require("../lib/bankAccountController");

let bankAccountController,
  mockBankAccountModel,
  mockCreateStatement,
  mockHandleTransaction;

describe("BankAccountController class", () => {
  beforeEach(() => {
    mockBankAccountModel = { saveToModel: jest.fn(), loadFromModel: jest.fn() };
    mockCreateStatement = { getStatement: jest.fn() };
    mockHandleTransaction = { makeTransaction: jest.fn() };
    bankAccountController = new BankAccountController(
      mockBankAccountModel,
      mockCreateStatement,
      mockHandleTransaction
    );
  });

  it("makes a transaction", () => {
    bankAccountController.handleNewTransaction(
      "credit",
      10.0,
      new Date(2022, 4, 4)
    );
    expect(mockHandleTransaction.makeTransaction).toHaveBeenCalledWith(
      "credit",
      10.0,
      new Date(2022, 4, 4),
      mockBankAccountModel
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
});
