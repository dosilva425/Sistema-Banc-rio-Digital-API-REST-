# Digital Banking System (REST API)

This is a pilot project to create the REST API for a digital bank. This project was conceived from a challenge in the Cubos Academy backend software development course.

<img src="https://github.com/dosilva425/Sistema-Bancario-Digital-API-REST-/blob/main/prints/print%201.png">
<img src="https://github.com/dosilva425/Sistema-Bancario-Digital-API-REST-/blob/main/prints/print%202.png">

# Features:

- Bank account creation
- Listing of bank accounts
- Updating bank account user data
- Deleting a bank account
- Depositing into a bank account
- Withdrawing from a bank account
- Transferring money between bank accounts
- Checking the balance of a bank account
- Issuing a bank statement

# Technologies

- JavaScript
- NodeJS
- Express
- Date-fns

# Requirements

- node installed on your machine
- npm installed on your machine

## Prepare

```
git clone git@github.com:dosilva425/Sistema-Bancario-Digital-API-REST-.git

cd sistema-bancario-digital-api-rest

npm install express

npm install date-fns --save
```

#### Run

```

npm run dev

```

# Routes

- [GET]/contas
- [POST]/contas
- [PUT]/contas/:numeroConta/usuario
- [DELETE]/contas/:numeroConta
- [POST]/transacoes/depositar
- [POST]/transacoes/sacar
- [POST]/transacoes/transferir
- [GET]/contas/saldo
- [GET]/contas/extrato
