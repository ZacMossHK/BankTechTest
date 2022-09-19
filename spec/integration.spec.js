const bankAccountController = require("../lib/bankAccountController");
const BankAccountController = require("../lib/bankAccountController");
const BankAccountModel = require("../lib/bankAccountModel");

describe("Integration", () => {
  beforeEach(() => {
    bankAccountModel = new BankAccountModel();
    bankAccountController = new BankAccountController();
  });
  it("prints the statement with one transaction", () => {
    bankAccountController.deposit(10, 2022, 4, 4);
    result =
      "date || credit || debit || balance\n04/05/2022 || 10.00 || || 10.00";
    expect(bankAccountController.printStatement()).toBe(result);
  });
});
