const BankAccountController = require("../lib/bankAccountController");
const BankAccountModel = require("../lib/bankAccountModel");
const CreateStatement = require("../lib/createStatement");
const TransactionHandler = require("../lib/transactionHandler");

let controller;

describe("Integration", () => {
  beforeEach(() => {
    controller = new BankAccountController(
      new BankAccountModel(),
      new CreateStatement(),
      new TransactionHandler()
    );
  });

  it("prints just the statement headers if there are no transactions", () => {
    expect(controller.printStatement()).toBe(
      "date || credit || debit || balance"
    );
  });

  it("prints the statement with one transaction", () => {
    controller.makeNewTransaction("credit", 10, new Date(2022, 4, 4));
    const result =
      "date || credit || debit || balance\n04/05/2022 || 10.00 || || 10.00";
    expect(controller.printStatement()).toBe(result);
  });

  it("prints the statement with three transactions", () => {
    controller.makeNewTransaction("credit", 1000, new Date(2023, 0, 10));
    controller.makeNewTransaction("credit", 2000, new Date(2023, 0, 13));
    controller.makeNewTransaction("debit", 500, new Date(2023, 0, 14));
    const result =
      "date || credit || debit || balance\n14/01/2023 || || 500.00 || 2500.00\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00";
    expect(controller.printStatement()).toBe(result);
  });

  it("prints the statement in the correct chronological order when transactions are not submitted in order", () => {
    controller.makeNewTransaction("credit", 2000, new Date(2023, 0, 13));
    controller.makeNewTransaction("credit", 1000, new Date(2023, 0, 10));
    controller.makeNewTransaction("debit", 500, new Date(2023, 0, 14));
    const result =
      "date || credit || debit || balance\n14/01/2023 || || 500.00 || 2500.00\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00";
    expect(controller.printStatement()).toBe(result);
  });

  it("throws an error if the transaction arguments are invalid", () => {
    expect(() => {
      controller.makeNewTransaction("fish", 200, new Date(2022, 0, 1));
    }).toThrow(
      new Error('Transaction type must be a string - "credit" or "debit"')
    );
    expect(() => {
      controller.makeNewTransaction("credit", "50", new Date(2022, 4, 4));
    }).toThrow(new Error("Transaction amount must be an integer or float"));
    expect(() => {
      controller.makeNewTransaction("credit", 50, "4/4/2022");
    }).toThrow(new Error("Transaction date must be a date instance"));
  });

  it("doesn't add anything to the model if an error is thrown", () => {
    try {
      controller.makeNewTransaction("fish", "200", "date");
    } catch {
      controller.makeNewTransaction("credit", 10, new Date(2022, 4, 4));
    }
    const result =
      "date || credit || debit || balance\n04/05/2022 || 10.00 || || 10.00";
    expect(controller.printStatement()).toBe(result);
  });

  it("throws an error if any transaction arguments are missing", () => {
    expect(() => {
      controller.makeNewTransaction("credit", 50);
    }).toThrow(new Error("Missing transaction arguments"));
    expect(() => {
      controller.makeNewTransaction("credit");
    }).toThrow(new Error("Missing transaction arguments"));
    expect(() => {
      controller.makeNewTransaction();
    }).toThrow(new Error("Missing transaction arguments"));
  });
});
