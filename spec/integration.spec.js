const BankAccountController = require("../lib/bankAccountController");
const BankAccountModel = require("../lib/bankAccountModel");

let bankAccountModel, bankAccountController;

describe("Integration", () => {
  beforeEach(() => {
    bankAccountModel = new BankAccountModel();
    bankAccountController = new BankAccountController(bankAccountModel);
  });

  it("prints the statement with no transactions", () => {
    expect(bankAccountController.getStatement()).toBe(
      "date || credit || debit || balance"
    );
  });

  it("prints the statement with one transaction", () => {
    bankAccountController.makeTransaction("credit", 10, new Date(2022, 4, 4));
    const result =
      "date || credit || debit || balance\n04/05/2022 || 10.00 || || 10.00";
    expect(bankAccountController.getStatement()).toBe(result);
  });

  it("prints the statement with three transactions", () => {
    bankAccountController.makeTransaction(
      "credit",
      1000,
      new Date(2023, 0, 10)
    );
    bankAccountController.makeTransaction(
      "credit",
      2000,
      new Date(2023, 0, 13)
    );
    bankAccountController.makeTransaction("debit", 500, new Date(2023, 0, 14));
    const result =
      "date || credit || debit || balance\n14/01/2023 || || 500.00 || 2500.00\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00";
    expect(bankAccountController.getStatement()).toBe(result);
  });

  it("prints the statement in the correct chronological order when transactions are not submitted in order", () => {
    bankAccountController.makeTransaction(
      "credit",
      2000,
      new Date(2023, 0, 13)
    );
    bankAccountController.makeTransaction(
      "credit",
      1000,
      new Date(2023, 0, 10)
    );
    bankAccountController.makeTransaction("debit", 500, new Date(2023, 0, 14));
    const result =
      "date || credit || debit || balance\n14/01/2023 || || 500.00 || 2500.00\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00";
    expect(bankAccountController.getStatement()).toBe(result);
  });
});
