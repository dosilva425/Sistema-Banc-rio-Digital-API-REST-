# Sistema Bancário Digital (API REST)

Este é um projeto piloto de criação da API REST de um banco digital. Ele foi concebido a partir do desafio do módulo 2 do curso de desenvolvimento de software back-end da Cubos Academy (Ifood).


<img src="https://github.com/dosilva425/Sistema-Bancario-Digital-API-REST-/blob/main/prints/print%201.png">
<img src="https://github.com/dosilva425/Sistema-Bancario-Digital-API-REST-/blob/main/prints/print%202.png">

# Funcionalidades

- Criação de conta bancária
- Listagem de contas bancárias
- Atualização dos dados do usuário de uma conta bancária
- Exclusão de conta bancária
- Depósito 
- Saque
- Transferência
- Saldo
- Extrato Bancário

# Tecnologias

- JavaScript
- NodeJS
- Express
- Date-fns

# Requisitos

- node instalado na sua máquina
- npm instalado na sua máquina

## Preparação

```

git clone git@github.com:dosilva425/sistema-bancario-digital-api-rest.git

cd sistema-bancario-digital-api-rest

npm install

```

#### Execução

```

npm run dev

```

# Rotas

- [GET]/contas
- [POST]/contas
- [PUT]/contas/:numeroConta/usuario
- [DELETE]/contas/:numeroConta
- [POST]/transacoes/depositar
- [POST]/transacoes/sacar
- [POST]/transacoes/transferir
- [GET]/contas/saldo
- [GET]/contas/extrato

# Exemplos de Requisição

- Rota Listagem de Contas Bancárias: `GET` `/contas?senha_banco=Cubos123Bank`
	- Informe a senha do banco (Cubos123Bank) como parâmetro de consulta. 
  
- Rota Criação de Conta Bancária: `POST` `/contas`

```javascript
// POST /contas
{
    "nome": "teste",
    "cpf": "00011122234",
    "data_nascimento": "1980-08-18",
    "telefone": "77999998888",
    "email": "teste@email.com",
    "senha": "123456"
}
```
- Rota Atualização de Usuário de Conta Bancária: `PUT` `/contas/:numeroConta/usuario`
	- Informe o número da conta a ser atualizada como parâmetro de url.

```javascript
// PUT /contas/:numeroConta/usuario
{
    "nome": "teste teste",
    "cpf": "00011122234",
    "data_nascimento": "1980-08-18",
    "telefone": "77999998888",
    "email": "testeteste@email.com",
    "senha": "12345678"
{
```

- Rota Exclusão de Conta Bancária: `DELETE` `/contas/:numeroConta`
	- Informe o número da conta a ser excluída como parâmetro da url.

- Rota Depósito: `POST` `/transacoes/depositar`

```javascript
// POST /transacoes/depositar
{
	"numero_conta": "1",
	"valor": 2000
}
```

- Rota Saque: `POST` `/transacoes/sacar`

```javascript
// POST /transacoes/sacar
{
	"numero_conta": "1",
	"valor": 500,
    	"senha": "12345678"
}
```

- Rota Transferência: `POST` `/transacoes/transferir`

```javascript
// POST /transacoes/transferir
{
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 500,
	"senha": "12345678"
}
```

- Rota Saldo: `GET` `/contas/saldo?numero_conta=123&senha=123`
	- Informe o número e a senha da respectiva conta como parâmetro de consulta.

- Rota Extrato: `GET` `/contas/extrato?numero_conta=123&senha=123`
	- Informe o número e a senha da respectiva conta como parâmetro de consulta.

```
