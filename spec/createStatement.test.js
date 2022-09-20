const CreateStatement = require("../lib/createStatement");

let createStatement;

describe("CreateStatement class", () => {
  beforeEach(() => {
    createStatement = new CreateStatement();
  });
  it("returns just the statement headers with an empty transactions array", () => {
    expect(createStatement.getStatement([])).toBe(
      "date || credit || debit || balance"
    );
  });

  it("returns a debit transaction as a statement string", () => {
    const transactionObject = {
      amount: 80.0,
      date: new Date(2022, 4, 5),
      type: "debit",
    };
    expect(
      createStatement.getSingleStatementTransactionString(transactionObject)
    ).toBe("05/05/2022 || || 80.00 || -80.00");
  });

  it("returns a credit transaction as a statement string", () => {
    const transactionObject = {
      amount: 100.0,
      date: new Date(2022, 4, 4),
      type: "credit",
    };
    expect(
      createStatement.getSingleStatementTransactionString(transactionObject)
    ).toBe("04/05/2022 || 100.00 || || 100.00");
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
      createStatement.getSingleStatementTransactionString(transactionObject1)
    ).toBe("04/05/2022 || 100.00 || || 100.00");
    expect(
      createStatement.getSingleStatementTransactionString(transactionObject2)
    ).toBe("05/05/2022 || || 80.00 || 20.00");
  });

  it("prints the statement with one transaction", () => {
    const transactionObject = {
      amount: 10.0,
      date: new Date(2022, 4, 4),
      type: "credit",
    };
    expect(createStatement.getStatement([transactionObject])).toBe(
      "date || credit || debit || balance\n04/05/2022 || 10.00 || || 10.00"
    );
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
    expect(
      createStatement.getStatement([transactionObject1, transactionObject2])
    ).toBe(
      "date || credit || debit || balance\n05/05/2022 || || 80.00 || 20.00\n04/05/2022 || 100.00 || || 100.00"
    );
  });

  it("will sort transactions by date when printing statement if transactions are not submitted in chronological order", () => {
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
      createStatement.getStatement([transactionObject2, transactionObject1])
    ).toBe(
      "date || credit || debit || balance\n05/05/2022 || || 80.00 || 20.00\n04/05/2022 || 100.00 || || 100.00"
    );
  });

  it("will allow the user to make further transactions after getting the statement", () => {
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
    expect(createStatement.getStatement([transactionObject1])).toBe(
      "date || credit || debit || balance\n04/05/2022 || 100.00 || || 100.00"
    );
    expect(
      createStatement.getStatement([transactionObject1, transactionObject2])
    ).toBe(
      "date || credit || debit || balance\n05/05/2022 || || 80.00 || 20.00\n04/05/2022 || 100.00 || || 100.00"
    );
  });
});
