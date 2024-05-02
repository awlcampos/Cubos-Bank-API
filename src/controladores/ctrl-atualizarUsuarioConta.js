const banco = require('../bancodedados');

function atualizarUsuarioConta(req, res) {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const conta = banco.contas.find(conta => conta.numero === numeroConta);

    if (!conta) {
        res.status(404).send('Conta não encontrada.');
        return;
    }

    conta.usuario.nome = nome || conta.usuario.nome;
    conta.usuario.cpf = cpf || conta.usuario.cpf;
    conta.usuario.data_nascimento = data_nascimento || conta.usuario.data_nascimento;
    conta.usuario.telefone = telefone || conta.usuario.telefone;
    conta.usuario.email = email || conta.usuario.email;
    conta.usuario.senha = senha || conta.usuario.senha;

    res.status(200).send('Usuário da conta atualizado com sucesso.');
}

module.exports = {
    atualizarUsuarioConta
};
