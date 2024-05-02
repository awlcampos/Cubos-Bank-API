const fs = require('fs');
const path = require('path');
const banco = require('../bancodedados');

function depositar(req, res) {
    const { numero_conta, valor } = req.body;

    if (!numero_conta) {
        res.status(400).send('Número da conta é obrigatório.');
        return;
    }

    if (!valor) {
        res.status(400).send('O valor é obrigatório.');
        return;
    }

    if (isNaN(valor)) {
        res.status(400).send('Valor do depósito é inválido.');
        return;
    }

    if (valor <= 0) {
        res.status(400).send('O valor do depósito deve ser maior que 0.');
        return;
    }

    const conta = banco.contas.find(conta => conta.numero === numero_conta);

    if (!conta) {
        res.status(404).send('Conta não encontrada.');
        return;
    }

    const deposito = {
        data: new Date().toISOString(),
        numero_conta,
        valor: valor.toString()
    };
    banco.depositos.push(deposito);

    conta.saldo += Number(valor);

    const caminhoArquivo = path.join(__dirname, '../bancodedados.js');
    fs.writeFileSync(caminhoArquivo, 'module.exports = ' + JSON.stringify(banco, null, 4));

    res.status(200).send('Depósito realizado com sucesso.');
}

module.exports = {
    depositar
};
