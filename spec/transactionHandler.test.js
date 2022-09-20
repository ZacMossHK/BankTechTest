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
});
