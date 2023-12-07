let { contas, saques, depositos, transferencias } = require('../bancodedados/bancoDeDados');
const formatarDataIso = require('../utilitarios/formatacaoData-utilitario');
const { validacaoCamposPreenchidosQuery, validacaoNumeroContaEValorPreenchidosBody } = require('../utilitarios/validacoesDadosRequisicao-utilitario');

const deposito = (req, res) => {
    const { numero_conta, valor } = req.body;

    const conta = contas.find((conta) => { return conta.numero === numero_conta });

    validacaoNumeroContaEValorPreenchidosBody(req, res);

    if (res.headersSent) {
        return;
    }

    conta.saldo += valor;
    const depositoRegistro = {
        data: formatarDataIso(req, res),
        numero_conta,
        valor
    }
    depositos.push(depositoRegistro);

    return res.status(204).json();
}

const saque = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    const conta = contas.find((conta) => { return conta.numero === numero_conta });

    validacaoNumeroContaEValorPreenchidosBody(req, res);
    if (!senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios, certifique-se de preenchê-los! Informe a senha!' });
    }
    if (senha !== conta.usuario.senha) {
        return res.status(400).json({ mensagem: "A senha informada é incorreta!" });
    }
    if (conta.saldo < valor) {
        return res.status(400).json({ mensagem: "Não há saldo suficiente na conta bancária para a realização da transação!" });
    }

    if (res.headersSent) {
        return;
    }

    conta.saldo -= valor;
    const saqueRegistro = {
        data: formatarDataIso(req, res),
        numero_conta,
        valor
    }
    saques.push(saqueRegistro);

    return res.status(204).json();
}

const transferencia = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    const conta_origem = contas.find((conta) => { return conta.numero === numero_conta_origem });
    const conta_destino = contas.find((conta) => { return conta.numero === numero_conta_destino });

    if (!numero_conta_origem) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios, certifique-se de preenchê-los! Informe o número da conta de origem da transação.' });
    }
    if (!numero_conta_destino) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios, certifique-se de preenchê-los! Informe o número da conta de destino da transação.' });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios, certifique-se de preenchê-los! Informe o valor da transação.' });
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor da transação não pode ser negativo ou zerado! Digite algum valor válido para a transação." });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios, certifique-se de preenchê-los! Informe a senha!' });
    }
    if (!conta_origem) {
        return res.status(404).json({ mensagem: "Não existe uma conta bancária de origem com o número informado!" });
    }
    if (!conta_destino) {
        return res.status(404).json({ mensagem: "Não existe uma conta bancária de destino com o número informado!" });
    }
    if (senha !== conta_origem.usuario.senha) {
        return res.status(400).json({ mensagem: "A senha informada é incorreta!" });
    }
    if (conta_origem.saldo < valor) {
        return res.status(400).json({ mensagem: "Não há saldo suficiente na conta bancária de origem para a realização da transação!" });
    }

    if (res.headersSent) {
        return;
    }

    conta_origem.saldo -= valor;
    conta_destino.saldo += valor;
    const transferenciaRegistro = {
        data: formatarDataIso(req, res),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }
    transferencias.push(transferenciaRegistro);

    return res.status(204).json();
}

const saldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    const conta = contas.find((conta) => { return conta.numero === numero_conta });

    validacaoCamposPreenchidosQuery(req, res);

    if (res.headersSent) {
        return;
    }

    return res.json({ saldo: conta.saldo });
}

const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    const conta = contas.find((conta) => { return conta.numero === numero_conta });

    validacaoCamposPreenchidosQuery(req, res);

    if (res.headersSent) {
        return;
    }

    let depositoUsuario = [];
    for (let depositoRegistro of depositos) {
        if (depositoRegistro.numero_conta === numero_conta) {
            depositoUsuario.push(depositoRegistro);
        }
    }
    let saqueUsuario = [];
    for (let saqueRegistro of saques) {
        if (saqueRegistro.numero_conta === numero_conta) {
            saqueUsuario.push(saqueRegistro);
        }
    }
    let tranferenciasEnviadasUsuario = [];
    let transferenciasRecebidasUsuario = [];
    for (let transferenciaRegistro of transferencias) {
        if (transferenciaRegistro.numero_conta_origem === numero_conta) {
            tranferenciasEnviadasUsuario.push(transferenciaRegistro);
        }
        if (transferenciaRegistro.numero_conta_destino === numero_conta) {
            transferenciasRecebidasUsuario.push(transferenciaRegistro);
        }
    }

    return res.json({
        depositos: depositoUsuario,
        saques: saqueUsuario,
        transferenciasEnviadas: tranferenciasEnviadasUsuario,
        transferenciasRecebidas: transferenciasRecebidasUsuario
    });
}

module.exports = {
    deposito,
    saque,
    transferencia,
    saldo,
    extrato
}