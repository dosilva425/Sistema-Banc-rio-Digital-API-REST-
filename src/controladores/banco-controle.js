let { contas, saques, depositos, transferencias } = require('../bancodedados/banco-de-dados');
const { formatarDataIso } = require('../intermediarios');


const verificadorCpfEEmailUnicos = (req, res) => {
    const { cpf, email } = req.body;

    for (let indice = 0; indice < contas.length; indice++) {
        if (cpf === contas[indice].usuario.cpf) {
            return res.status(400).json({ mensagem: 'Já existe uma conta cadastrada com o cpf informado!' });
        }
        if (email === contas[indice].usuario.email) {
            return res.status(400).json({ mensagem: 'Já existe uma conta cadastrada com o e-mail informado!' });
        }
    }
}
const verificadorCamposPreenchidosUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios, certifique-se de preenchê-los! Informe o nome.' });
    }
    if (!cpf) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios, certifique-se de preenchê-los! Informe o cpf.' });
    }
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios, certifique-se de preenchê-los! Informe a data de nascimento.' });
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios, certifique-se de preenchê-los! Informe o telefone.' });
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios, certifique-se de preenchê-los! Informe o e-mail.' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios, certifique-se de preenchê-los! Informe a senha.' });
    }
}
const verificadorCamposPreenchidosParams = (req, res) => {
    const { numeroConta } = req.params;

    const conta = contas.find((conta) => { return conta.numero === numeroConta });

    if (!conta) {
        return res.status(404).json({ mensagem: "Não existe uma conta bancária com o número informado!" });
    }
}
const verificadorCamposPreenchidosQuery = (req, res) => {
    const { numero_conta, senha } = req.query;

    const conta = contas.find((conta) => { return conta.numero === numero_conta });

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'Informe o número da conta!' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'Informe a senha!' });
    }
    if (!conta) {
        return res.status(404).json({ mensagem: "Não existe uma conta bancária com o número informado!" });
    }
    if (senha !== conta.usuario.senha) {
        return res.status(400).json({ mensagem: "A senha informada é incorreta!" });
    }

}
const verificadorNumeroContaEValorPreenchidosBody = (req, res) => {
    const { numero_conta, valor } = req.body;

    const conta = contas.find((conta) => { return conta.numero === numero_conta });

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios, certifique-se de preenchê-los! Informe o número da conta.' });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios, certifique-se de preenchê-los! Informe o valor da transação.' });
    }
    if (!conta) {
        return res.status(404).json({ mensagem: "Não existe uma conta bancária com o número informado!" });
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor da transação não pode ser negativo ou zerado! Digite algum valor válido para a transação." });
    }
}


const listarContas = (req, res) => {
    return res.json(contas);
}

let numeroInicial = 1;
const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    verificadorCpfEEmailUnicos(req, res);
    verificadorCamposPreenchidosUsuario(req, res);

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

const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const conta = contas.find((conta) => { return conta.numero === numeroConta });

    verificadorCamposPreenchidosUsuario(req, res);
    verificadorCamposPreenchidosParams(req, res);
    verificadorCpfEEmailUnicos(req, res);

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

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const conta = contas.find((conta) => { return conta.numero === numeroConta });

    verificadorCamposPreenchidosParams(req, res);
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

const deposito = (req, res) => {
    const { numero_conta, valor } = req.body;

    const conta = contas.find((conta) => { return conta.numero === numero_conta });

    verificadorNumeroContaEValorPreenchidosBody(req, res);

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

    verificadorNumeroContaEValorPreenchidosBody(req, res);
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

const transferir = (req, res) => {
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

    verificadorCamposPreenchidosQuery(req, res);

    if (res.headersSent) {
        return;
    }

    return res.json({ saldo: conta.saldo });
}

const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    const conta = contas.find((conta) => { return conta.numero === numero_conta });

    verificadorCamposPreenchidosQuery(req, res);

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
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    deposito,
    saque,
    transferir,
    saldo,
    extrato
}