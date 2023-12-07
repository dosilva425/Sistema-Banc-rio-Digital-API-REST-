const { banco } = require('./bancodedados/bancoDeDados');

const senhaBanco = (req, res, next) => {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(401).json({ mensagem: 'Informe a senha!' });
    }
    else if (senha_banco !== banco.senha) {
        return res.status(400).json({ mensagem: 'A senha informada é incorreta!' });
    }
    next();
}

module.exports = {
    senhaBanco
}