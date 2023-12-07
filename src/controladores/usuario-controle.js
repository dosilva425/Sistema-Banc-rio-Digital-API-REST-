let { contas } = require('../bancodedados/bancoDeDados');
const { validacaoCpfEEmailUnicos, validacaoCamposPreenchidosUsuario, validacaoCamposPreenchidosParams } = require('../utilitarios/validacoesDadosRequisicao-utilitario');

const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const conta = contas.find((conta) => { return conta.numero == numeroConta });

    validacaoCamposPreenchidosUsuario(req, res);
    validacaoCamposPreenchidosParams(req, res);
    validacaoCpfEEmailUnicos(req, res);

    if (res.headersSent) {
        return;
    }

    conta.usuario.nome = nome;
    conta.usuario.cpf = cpf;
    conta.usuario.data_nascimento = data_nascimento;
    conta.usuario.telefone = telefone;
    conta.usuario.email = email;
    conta.usuario.senha = senha;

    return res.status(204).json();
}

module.exports = {
    atualizarUsuario
}