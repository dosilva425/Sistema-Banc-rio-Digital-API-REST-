const { banco } = require('./bancodedados/banco-de-dados');
const format = require('date-fns/format');

const senha_banco = (req, res, next) => {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(401).json({ mensagem: 'Informe a senha!' });
    }
    else if (senha_banco !== banco.senha) {
        return res.status(400).json({ mensagem: 'A senha informada é incorreta!' });
    }
    next();
}

const formatarDataIso = (req, res) => {
    const dataIso = format(new Date(), 'yyyy-MM-dd kk:mm:ss');
    return dataIso;
}

module.exports = {
    senha_banco,
    formatarDataIso
}