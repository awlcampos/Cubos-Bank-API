const fs = require('fs');
const path = require('path');
const banco = require('../bancodedados');

function transferir(req, res) {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        res.status(400).send('Dados incompletos para realizar a transferência.');
        return;
    }

    const contaOrigem = banco.contas.find(conta => conta.numero === numero_conta_origem);
    const contaDestino = banco.contas.find(conta => conta.numero === numero_conta_destino);

    if (!contaOrigem) {
        res.status(404).send('Conta de origem não encontrada.');
        return;
    }

    if (!contaDestino) {
        res.status(404).send('Conta de destino não encontrada.');
        return;
    }

    if (contaOrigem.usuario.senha !== senha) {
        res.status(401).send('Senha incorreta.');
        return;
    }

    const valorTransferencia = Number(valor);

    if (isNaN(valorTransferencia) || valorTransferencia <= 0) {
        res.status(400).send('Valor da transferência inválido.');
        return;
    }

    if (contaOrigem.saldo < valorTransferencia) {
        res.status(400).send('Saldo insuficiente para realizar a transferência.');
        return;
    }

    contaOrigem.saldo -= valorTransferencia;
    contaDestino.saldo += valorTransferencia;

    banco.transferencias.push({
        data: new Date().toISOString(),
        numero_conta_origem,
        numero_conta_destino,
        valor: valorTransferencia.toString()
    });

    const caminhoArquivo = path.join(__dirname, '../bancodedados.js');
    fs.writeFileSync(caminhoArquivo, 'module.exports = ' + JSON.stringify(banco, null, 4));

    res.status(200).send('Transferência realizada com sucesso.');
}

module.exports = {
    transferir
};