let { contas } = require('../bancodedados/bancoDeDados');

const validacaoCpfEEmailUnicos = (req, res) => {
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
const validacaoCamposPreenchidosUsuario = (req, res) => {
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
const validacaoCamposPreenchidosParams = (req, res) => {
    const { numeroConta } = req.params;

    const conta = contas.find((conta) => { return conta.numero === numeroConta });

    if (!conta) {
        return res.status(404).json({ mensagem: "Não existe uma conta bancária com o número informado!" });
    }
}
const validacaoCamposPreenchidosQuery = (req, res) => {
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
const validacaoNumeroContaEValorPreenchidosBody = (req, res) => {
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

module.exports = {
    validacaoCpfEEmailUnicos,
    validacaoCamposPreenchidosUsuario,
    validacaoCamposPreenchidosParams,
    validacaoCamposPreenchidosQuery,
    validacaoNumeroContaEValorPreenchidosBody
}