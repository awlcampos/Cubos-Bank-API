const fs = require('fs');
const path = require('path');
const banco = require('../bancodedados');

function sacar(req, res) {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        res.status(400).json({ mensagem: 'Número da conta, valor do saque e senha são obrigatórios.' });
        return;
    }

    const conta = banco.contas.find(conta => conta.numero === numero_conta);

    if (!conta) {
        res.status(404).json({ mensagem: 'Conta não encontrada.' });
        return;
    }

    if (conta.usuario.senha !== senha) {
        res.status(401).json({ mensagem: 'Senha incorreta.' });
        return;
    }

    const valorSaque = Number(valor);

    if (isNaN(valorSaque) || valorSaque <= 0) {
        res.status(400).json({ mensagem: 'Valor do saque é inválido.' });
        return;
    }

    if (conta.saldo < valorSaque) {
        res.status(400).json({ mensagem: 'Saldo insuficiente.' });
        return;
    }

    conta.saldo -= valorSaque;

    const saque = {
        data: new Date().toISOString(),
        numero_conta,
        valor: valorSaque.toString()
    };
    banco.saques.push(saque);

    const caminhoArquivo = path.join(__dirname, '../bancodedados.js');
    fs.writeFileSync(caminhoArquivo, 'module.exports = ' + JSON.stringify(banco, null, 4));

    res.status(200).send('Saque realizado com sucesso');

}

module.exports = {
    sacar
};
