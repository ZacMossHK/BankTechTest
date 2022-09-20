const BankAccountController = require("../lib/bankAccountController");

let bankAccountController,
  mockBankAccountModel,
  mockPrintStatement,
  mockHandleTransaction;

describe("BankAccountController class", () => {
  beforeEach(() => {
    mockBankAccountModel = { saveToModel: jest.fn(), loadFromModel: jest.fn() };
    mockPrintStatement = { getStatement: jest.fn() };
    mockHandleTransaction = { makeTransaction: jest.fn() };
    bankAccountController = new BankAccountController(
      mockBankAccountModel,
      mockPrintStatement,
      mockHandleTransaction
    );
  });

  it("makes a transaction", () => {
    const transactionObject = {
      amount: 10.0,
      date: new Date(2022, 4, 4),
      type: "credit",
    };
    mockHandleTransaction.makeTransaction.mockReturnValueOnce(
      transactionObject
    );
    bankAccountController.makeNewTransaction(
      "credit",
      10.0,
      new Date(2022, 4, 4)
    );
    expect(mockHandleTransaction.makeTransaction).toHaveBeenCalledWith(
      "credit",
      10.0,
      new Date(2022, 4, 4)
    );
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
    mockPrintStatement.getStatement.mockReturnValueOnce(
      "date || credit || debit || balance\n04/05/2022 || 10.00 || || 10.00"
    );
    expect(bankAccountController.printAccountStatement()).toBe(
      "date || credit || debit || balance\n04/05/2022 || 10.00 || || 10.00"
    );
    expect(mockPrintStatement.getStatement).toHaveBeenCalledWith([
      transactionObject,
    ]);
  });
});
