const banco = require('../bancodedados');

function emitirExtrato(req, res) {
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

    const extrato = {
        numeroConta: conta.numero,
        saldo: conta.saldo,
        transacoes: []
    };

    const depositos = banco.depositos.filter(deposito => deposito.numero_conta === numero_conta);
    const saques = banco.saques.filter(saque => saque.numero_conta === numero_conta);
    const transfsEnviadasErecebidas = banco.transferencias.filter(transf =>
        transf.numero_conta_origem === numero_conta || transf.numero_conta_destino === numero_conta
    );

    depositos.forEach(deposito => {
        extrato.transacoes.push({
            tipo: 'Depósito',
            valor: deposito.valor,
            data: deposito.data
        });
    });

    transfsEnviadasErecebidas.forEach(transf => {
        if (transf.numero_conta_origem === numero_conta) {
            extrato.transacoes.push({
                tipo: 'Transferência Enviada',
                valor: -transf.valor,
                data: transf.data,
                contaDestino: transf.numero_conta_destino
            });
        } else {
            extrato.transacoes.push({
                tipo: 'Transferência Recebida',
                valor: transf.valor,
                data: transf.data,
                contaOrigem: transf.numero_conta_origem
            });
        }
    });

    saques.forEach(saque => {
        extrato.transacoes.push({
            tipo: 'Saque',
            valor: -saque.valor,
            data: saque.data
        });
    });

    extrato.transacoes.sort((a, b) => new Date(a.data) - new Date(b.data));

    res.status(200).send(extrato);
}

module.exports = {
    emitirExtrato
};
