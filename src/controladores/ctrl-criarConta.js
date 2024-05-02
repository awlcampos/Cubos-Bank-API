const banco = require('../bancodedados');
const fs = require('fs');
const path = require('path');

function criarConta(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        res.status(400).send('Todos os campos são obrigatórios.');
        return;
    }

    if (banco.contas.some(conta => conta.usuario.cpf === cpf)) {
        res.status(400).send('Já existe uma conta com o CPF informado.');
        return;
    }

    if (banco.contas.some(conta => conta.usuario.email === email)) {
        res.status(400).send('Já existe uma conta com o e-mail informado.');
        return;
    }

    const ultNumConta = banco.contas.reduce((max, conta) => Math.max(max, Number(conta.numero)), 0);
    const numeroConta = (ultNumConta + 1).toString();

    const novaConta = {
        numero: numeroConta,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };

    banco.contas.push(novaConta);
    fs.writeFileSync(path.join(__dirname, '../bancodedados.js'), 'module.exports = ' + JSON.stringify(banco, null, 4));
    res.status(201).send('Conta criada com sucesso.');
}

module.exports = {
    criarConta
};
