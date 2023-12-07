let { contas } = require('../bancodedados/bancoDeDados');
const { validacaoCpfEEmailUnicos, validacaoCamposPreenchidosUsuario, validacaoCamposPreenchidosParams } = require('../utilitarios/validacoesDadosRequisicao-utilitario');

const listarContas = (req, res) => {
    return res.json(contas);
}

let numeroInicial = 1;
const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    validacaoCpfEEmailUnicos(req, res);
    validacaoCamposPreenchidosUsuario(req, res);

    if (res.headersSent) {
        return;
    }

    const conta = {
        numero: `${numeroInicial++}`,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }
    contas.push(conta);

    return res.status(201).json();
}


const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const conta = contas.find((conta) => { return conta.numero === numeroConta });

    validacaoCamposPreenchidosParams(req, res);
    if ((conta.saldo) !== 0) {
        return res.status(403).json({ mensagem: "A conta bancária só pode ser removida se o seu saldo for zero!" });
    }

    if (res.headersSent) {
        return;
    }

    contas = contas.filter((conta) => {
        return conta.numero !== numeroConta;
    });

    return res.status(204).json();
}



module.exports = {
    listarContas,
    criarConta,
    excluirConta
}