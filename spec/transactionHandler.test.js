const TransactionHandler = require("../lib/transactionHandler");

let handler;

describe("TransactionHandler class", () => {
  beforeEach(() => {
    handler = new TransactionHandler();
  });

  it("makes a transaction", () => {
    const transactionObject = {
      amount: 10.0,
      date: new Date(2022, 4, 4),
      type: "credit",
    };
    expect(
      handler.makeTransaction("credit", 10.0, new Date(2022, 4, 4))
    ).toMatchObject(transactionObject);
  });

  it("throws an error if transaction type is not credit or debit", () => {
    expect(() => {
      handler.makeTransaction("balloon", 100.0, new Date(2022, 4, 4));
    }).toThrow(
      new Error('Transaction type must be a string - "credit" or "debit"')
    );
  });

  it("throws an error if transaction amount is not an integer or float", () => {
    expect(() => {
      handler.makeTransaction("credit", "50", new Date(2022, 4, 4));
    }).toThrow(new Error("Transaction amount must be an integer or float"));
  });

  it("throws an error if transaction date is not a Date instance", () => {
    expect(() => {
      handler.makeTransaction("credit", 50, "4/4/2022");
    }).toThrow(new Error("Transaction date must be a date instance"));
  });

  it("throws an error if any transaction arguments are missing", () => {
    expect(() => {
      handler.makeTransaction("credit", 50);
    }).toThrow(new Error("Missing transaction arguments"));
    expect(() => {
      handler.makeTransaction("credit");
    }).toThrow(new Error("Missing transaction arguments"));
    expect(() => {
      handler.makeTransaction();
    }).toThrow(new Error("Missing transaction arguments"));
  });
});
