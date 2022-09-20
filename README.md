## BankTech

To install:

```
$ npm install
```

To run tests:

```
$ jest
```

To run the program:

```
$ node
> const BankAccountModel = require("./lib/bankAccountModel");
> const BankAccountController = require("./lib/bankAccountController");
> const controller = new BankAccountController(new BankAccountModel);
> controller.makeTransaction("credit", 1000, new Date(2023, 0, 10));
> controller.makeTransaction("credit", 2000, new Date(2023, 0, 13));
> controller.makeTransaction("debit", 500, new Date(2023, 0, 14));
> controller.getStatement();
=>
"date || credit || debit || balance\n
14/01/2023 || || 500.00 || 2500.00\n
13/01/2023 || 2000.00 || || 3000.00\n
10/01/2023 || 1000.00 || || 1000.00"
```

The program is structured into two classses:

BankAccountModel holds the account's transaction history.

BankAccountController validates and then saves transactions to BankAccountModel and loads them for printing into a statement format.

To make a transaction call BankAccountController.makeTransaction(type, amount, date).
Type must be a string, "credit" or "debit".
Amount can be an integer or float.
Date must be a date instance.
Giving the wrong or missing arguments will invalidate the transaction and it will not be saved.

To return the statement of transactions up to this point run BankAccountController.getStatement().
