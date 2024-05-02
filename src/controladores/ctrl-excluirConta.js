const banco = require('../bancodedados');

function excluirConta(req, res) {
    const { numeroConta } = req.params;

    const conta = banco.contas.find(conta => conta.numero === numeroConta);

    if (!conta) {
        res.status(404).send('Conta não encontrada.');
        return;
    }

    if (conta.saldo !== 0) {
        res.status(400).send('A conta só pode ser removida se o saldo for zero.');
        return;
    }

    banco.contas = banco.contas.filter(conta => conta.numero !== numeroConta);

    res.status(200).send('Conta removida com sucesso.');
}

module.exports = {
    excluirConta
};
