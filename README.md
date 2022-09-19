## Requirements

You should be able to interact with your code via a REPL like IRB or Node. (You don't need to implement a command line interface that takes input from STDIN.)
Deposits, withdrawal.
Account statement (date, amount, balance) printing.
Data can be kept in memory (it doesn't need to be stored to a database or anything).

## Acceptance criteria

Given a client makes a deposit of 1000 on 10-01-2023
And a deposit of 2000 on 13-01-2023
And a withdrawal of 500 on 14-01-2023
When she prints her bank statement
Then she would see

date || credit || debit || balance
14/01/2023 || || 500.00 || 2500.00
13/01/2023 || 2000.00 || || 3000.00
10/01/2023 || 1000.00 || || 1000.00

## User stories

As a user,
Who wants to check my balance,
I want to be able to keep track of my balance

As a user,
Who wants to deposit funds,
I want to be able to deposit into my account

As a user,
Who wants to withdraw funds,
I want to be able to withdraw from my account

As a user,
Who wants to keep track of my spending,
I want to record what dates I am depositing and withdrawing

As a user,
Who wants to have a way of showing all this information,
I want to be able to print my balance

## class structure

```Javascript

// model class
// lib/bankAccountModel.js
class BankAccountModel {
  constructor() {
    // ...
  }

  saveToModel(transactionObject) { // transactionObject will be an Object
    // saves data from accountView to model set
    // returns nothing
  }

  loadFromModel() {
    // returns the model set
  }
}

// view class
// lib/bankAccountController.js

class BankAccountController {
  constructor() {
    // ...
  }
  deposit(amount, transactionDate) { // amount will be an integer, transactionDate will be a date
    // writes amount, date to an object
    // bankAccountModel.saveToModel(object)
    // returns nothing
  }

  withdraw(amount, transactionDate) {
    // amount will be an integer, transactionDate will be a date
    // writes amount, date to an object
    // bankAccountModel.saveToModel(object)
    // returns nothing
  }

  printStatement() {
    // prints the statement to the terminal
  }
}
```

## tests

```Javascript
// model
// model returns array with one object
bankAccountModel.saveToModel({amount: 10.0, transactionDate: new Date(2022, 4, 4), transactionType: "deposit"})
bankAccountModel.loadFromModel() => // [{amount: 10.0, transactionDate: new Date(2022, 4, 4), transactionType: "deposit"}]

// model returns array with two objects in array in order of submission
bankAccountModel.saveToModel({amount: 10.0, transactionDate: new Date(2022, 4, 4), transactionType: "deposit"})
bankAccountModel.saveToModel({amount: 8.00, transactionDate: new Date(2022, 5, 5), transactionType: "withdraw"})
bankAccountModel.loadFromModel() => // [{amount: 10.0, transactionDate: new Date(2022, 4, 4), transactionType: "deposit"}, {amount: 8.00, transactionDate: new Date(2022, 5, 5), transactionType: "withdraw"}]


// controller
bankAccountController.deposit(10, 2022, 4, 4)
mockBankAccountModel.saveToModel => // called with {amount: 10.0, transactionDate: new Date(2022, 4, 4), transactionType: "deposit"}

bankAccountController.withdraw(10, 2022, 4, 4)
mockBankAccountModel.saveToModel => // called with {amount: 10.0, transactionDate: new Date(2022, 4, 4), transactionType: "withdraw"}

bankAccountController.deposit(10, 2022, 4, 4)
mockBankAccountModel.saveToModel => // called with {amount: 10.0, transactionDate: new Date(2022, 4, 4), transactionType: "deposit"}
bankAccountController.printStatement() =>
/*
"date || credit || debit || balance\n
04/05/2022 || 10.00 || || 10.00
*/

bankAccountController.deposit(10, 2022, 4, 4)
mockBankAccountModel.saveToModel => // called with {amount: 10.0, transactionDate: new Date(2022, 4, 4), transactionType: "deposit"}
bankAccountController.withdraw(8, 2022, 4, 5)
bankAccountController.printStatement() =>
/*
"date || credit || debit || balance\n
05/05/2022 || || 8.00 || 2.00
04/05/2022 || 10.00 || || 10.00
*/

```
