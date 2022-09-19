const { default: JSDOMEnvironment } = require("jest-environment-jsdom");
const BankAccountController = require("../lib/bankAccountController");

let bankAccountController;

describe("BankAccountController class", () => {
  beforeEach(() => {
    bankAccountController = new BankAccountController();
    const mockBankAccountModel = { saveToModel: jest.fn() };
  });
  it("makes a deposit", () => {
    const transactionObject = {
      amount: 10.0,
      transactionDate: new Date(2022, 4, 4),
      transactionType: "deposit",
    };
    expect(mockBankAccountModel.saveToModel).toHaveBeenCalledWith(
      transactionObject
    );
    bankAccountController.deposit(10, 2022, 4, 4);
  });
});
