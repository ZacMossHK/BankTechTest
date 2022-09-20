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
> const CreateStatement = require("./lib/createStatement");
> const HandleTransaction = require("./lib/handleTransaction");
> const BankAccountController = require("./lib/bankAccountController");
> const controller = new BankAccountController(new BankAccountModel(), new CreateStatement(), new HandleTransaction());
> controller.makeNewTransaction("credit", 1000, new Date(2023, 0, 10));
> controller.makeNewTransaction("credit", 2000, new Date(2023, 0, 13));
> controller.makeNewTransaction("debit", 500, new Date(2023, 0, 14));
> controller.printAccountStatement();
=>
"date || credit || debit || balance\n
14/01/2023 || || 500.00 || 2500.00\n
13/01/2023 || 2000.00 || || 3000.00\n
10/01/2023 || 1000.00 || || 1000.00"
```

I have approached building this program under the assumption that it will not be directly interacted with by the end user and is instead part of a larger program.

The program is structured into four classes:

BankAccountModel holds the user's transaction history in the form of objects in an array.

HandleTransaction returns validated transactions as objects containing the type of transaction, amount, and transaction date.

PrintStatement returns a statement created from the user's transaction history in the form of a string.

BankAccountController connects BankAccountModel to the other two classes.

To make a transaction call BankAccountController.makeNewTransaction(type, amount, date).
Type must be a string, "credit" or "debit".
Amount can be an integer or float.
Date must be a date instance.
Giving the wrong or missing arguments will invalidate the transaction and it will not be saved to the model.

To return the statement of transactions up to this point run BankAccountController.printAccountStatement().
