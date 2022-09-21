class TransactionHandler {
  makeTransaction(type, amount, date) {
    this.validateTransaction(type, amount, date);
    return { amount: amount, date: date, type: type };
  }

  validateTransaction(type, amount, date) {
    this.#validateArguments(type, amount, date);
    this.#validateType(type);
    this.#validateAmount(amount);
    this.#validateDate(date);
  }

  #validateArguments(...args) {
    if (args.some((arg) => arg === undefined))
      throw new Error("Missing transaction arguments");
  }

  #validateType(type) {
    if (!["credit", "debit"].includes(type))
      throw new Error(
        'Transaction type must be a string - "credit" or "debit"'
      );
  }

  #validateAmount(amount) {
    if (!(typeof amount === "number" && amount > 0))
      throw new Error(
        "Transaction amount must be an integer or float greater than 0"
      );
  }

  #validateDate(date) {
    if (!(date instanceof Date))
      throw new Error("Transaction date must be a date instance");
  }
}

module.exports = TransactionHandler;
