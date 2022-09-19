const { default: JSDOMEnvironment } = require("jest-environment-jsdom");
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
      transactionDate: new Date(2022, 4, 4),
      transactionType: "deposit",
    };
    bankAccountController.transaction("deposit", 10.0, new Date(2022, 4, 4));
    expect(mockBankAccountModel.saveToModel).toHaveBeenCalledWith(
      transactionObject
    );
  });

  it("returns a deposit transaction as a statement string", () => {
    const transactionObject = {
      amount: 100.0,
      transactionDate: new Date(2022, 4, 4),
      transactionType: "deposit",
    };
    expect(
      bankAccountController.transactionIntoStatementString(transactionObject)
    ).toBe("04/05/2022 || 100.00 || || 100.00");
  });

  it("returns a withdraw transaction as a statement string", () => {
    const transactionObject = {
      amount: 80.0,
      transactionDate: new Date(2022, 4, 5),
      transactionType: "withdraw",
    };
    expect(
      bankAccountController.transactionIntoStatementString(transactionObject)
    ).toBe("05/05/2022 || || 80.00 || -80.00");
  });

  it("returns two withdraw transactions with a balance reflecting the transactions", () => {
    const transactionObject1 = {
      amount: 100.0,
      transactionDate: new Date(2022, 4, 4),
      transactionType: "deposit",
    };
    const transactionObject2 = {
      amount: 80.0,
      transactionDate: new Date(2022, 4, 5),
      transactionType: "withdraw",
    };
    expect(
      bankAccountController.transactionIntoStatementString(transactionObject1)
    ).toBe("04/05/2022 || 100.00 || || 100.00");
    expect(
      bankAccountController.transactionIntoStatementString(transactionObject2)
    ).toBe("05/05/2022 || || 80.00 || 20.00");
  });

  it("prints the statement with one transaction", () => {
    const transactionObject = {
      amount: 10.0,
      transactionDate: new Date(2022, 4, 4),
      transactionType: "deposit",
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
      transactionDate: new Date(2022, 4, 4),
      transactionType: "deposit",
    };
    const transactionObject2 = {
      amount: 80.0,
      transactionDate: new Date(2022, 4, 5),
      transactionType: "withdraw",
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
