const express = require('express');
const { senhaBanco } = require('./intermediarios');
const { listarContas, criarConta, excluirConta } = require('./controladores/conta-controle');
const { atualizarUsuario } = require('./controladores/usuario-controle');
const { deposito, saque, transferencia, saldo, extrato } = require('./controladores/operacoesBancarias-controle');

const rotas = express();

rotas.get('/contas', senhaBanco, listarContas);
rotas.post('/contas', criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.post('/transacoes/depositar', deposito);
rotas.post('/transacoes/sacar', saque);
rotas.post('/transacoes/transferir', transferencia);
rotas.get('/contas/saldo', saldo);
rotas.get('/contas/extrato', extrato);


module.exports = rotas;