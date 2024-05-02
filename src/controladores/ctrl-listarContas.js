// http://localhost:3000/contas?senha_banco=Cubos123Bank

const banco = require('../bancodedados');

function listarContas(req, res) {
    const { senha_banco } = req.query;

    if (!senha_banco || senha_banco !== banco.banco.senha) {
        res.status(401).json({ mensagem: "A senha do banco informada é inválida!" });
        return;
    }

    const contas = banco.contas.map(conta => ({
        numero: conta.numero,
        saldo: conta.saldo,
        usuario: conta.usuario
    }));

    res.status(200).send(contas);
}

module.exports = {
    listarContas
};