const express = require('express');
const { senha_banco } = require('./intermediarios');
const bancoControle = require('./controladores/banco-controle');

const rotas = express();

rotas.get('/contas', senha_banco, bancoControle.listarContas);
rotas.post('/contas', bancoControle.criarConta);
rotas.put('/contas/:numeroConta/usuario', bancoControle.atualizarUsuario);
rotas.delete('/contas/:numeroConta', bancoControle.excluirConta);
rotas.post('/transacoes/depositar', bancoControle.deposito);
rotas.post('/transacoes/sacar', bancoControle.saque);
rotas.post('/transacoes/transferir', bancoControle.transferir);
rotas.get('/contas/saldo', bancoControle.saldo);
rotas.get('/contas/extrato', bancoControle.extrato);


module.exports = rotas;