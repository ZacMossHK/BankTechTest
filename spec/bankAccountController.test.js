const BankAccountController = require("../lib/bankAccountController");

let bankAccountController, mockBankAccountModel;

describe("BankAccountController class", () => {
  beforeEach(() => {
    mockBankAccountModel = { saveToModel: jest.fn(), loadFromModel: jest.fn() };
    bankAccountController = new BankAccountController(mockBankAccountModel);
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

  it("returns a credit transaction as a statement string", () => {
    const transactionObject = {
      amount: 100.0,
      date: new Date(2022, 4, 4),
      type: "credit",
    };
    expect(
      bankAccountController.makeTransactionIntoStatementString(
        transactionObject
      )
    ).toBe("04/05/2022 || 100.00 || || 100.00");
  });

  it("returns a debit transaction as a statement string", () => {
    const transactionObject = {
      amount: 80.0,
      date: new Date(2022, 4, 5),
      type: "debit",
    };
    expect(
      bankAccountController.makeTransactionIntoStatementString(
        transactionObject
      )
    ).toBe("05/05/2022 || || 80.00 || -80.00");
  });

  it("returns two debit transactions with a balance reflecting the transactions", () => {
    const transactionObject1 = {
      amount: 100.0,
      date: new Date(2022, 4, 4),
      type: "credit",
    };
    const transactionObject2 = {
      amount: 80.0,
      date: new Date(2022, 4, 5),
      type: "debit",
    };
    expect(
      bankAccountController.makeTransactionIntoStatementString(
        transactionObject1
      )
    ).toBe("04/05/2022 || 100.00 || || 100.00");
    expect(
      bankAccountController.makeTransactionIntoStatementString(
        transactionObject2
      )
    ).toBe("05/05/2022 || || 80.00 || 20.00");
  });

  it("prints the statement with one transaction", () => {
    const transactionObject = {
      amount: 10.0,
      date: new Date(2022, 4, 4),
      type: "credit",
    };
    mockBankAccountModel.loadFromModel.mockReturnValueOnce([transactionObject]);
    expect(bankAccountController.printStatement()).toBe(
      "date || credit || debit || balance\n04/05/2022 || 10.00 || || 10.00"
    );
    expect(mockBankAccountModel.loadFromModel).toHaveBeenCalled();
  });

  it("prints the statement with two transactions", () => {
    const transactionObject1 = {
      amount: 100.0,
      date: new Date(2022, 4, 4),
      type: "credit",
    };
    const transactionObject2 = {
      amount: 80.0,
      date: new Date(2022, 4, 5),
      type: "debit",
    };
    mockBankAccountModel.loadFromModel.mockReturnValueOnce([
      transactionObject1,
      transactionObject2,
    ]);
    expect(bankAccountController.printStatement()).toBe(
      "date || credit || debit || balance\n05/05/2022 || || 80.00 || 20.00\n04/05/2022 || 100.00 || || 100.00"
    );
    expect(mockBankAccountModel.loadFromModel).toHaveBeenCalled();
  });
});
