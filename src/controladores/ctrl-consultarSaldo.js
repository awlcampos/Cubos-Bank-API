const banco = require('../bancodedados');

function consultarSaldo(req, res) {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        res.status(400).send('Número da conta e senha são obrigatórios.');
        return;
    }

    const conta = banco.contas.find(conta => conta.numero === numero_conta);

    if (!conta) {
        res.status(404).send('Conta não encontrada.');
        return;
    }

    if (conta.usuario.senha !== senha) {
        res.status(401).send('Senha incorreta.');
        return;
    }

    res.status(200).send(`Saldo: R$ ${Number(conta.saldo).toFixed(2)}.`);
}

module.exports = {
    consultarSaldo
};