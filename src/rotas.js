const {
    atualizarUsuarioConta,
} = require('./controladores/ctrl-atualizarUsuarioConta.js');

const {
    consultarSaldo,
} = require('./controladores/ctrl-consultarSaldo.js');

const {
    criarConta,
} = require('./controladores/ctrl-criarConta.js');

const {
    depositar,
} = require('./controladores/ctrl-depositar.js');

const {
    emitirExtrato,
} = require('./controladores/ctrl-emitirExtrato.js');

const {
    excluirConta,
} = require('./controladores/ctrl-excluirConta.js');

const {
    listarContas,
} = require('./controladores/ctrl-listarContas.js');

const {
    sacar,
} = require('./controladores/ctrl-Sacar.js');

const {
    transferir,
} = require('./controladores/ctrl-transferir.js');


module.exports = (app) => {
    app.get('/contas', listarContas);
    app.post('/contas', criarConta);
    app.put('/contas/:numeroConta/usuario', atualizarUsuarioConta);
    app.delete('/contas/:numeroConta', excluirConta);
    app.post('/transacoes/depositar', depositar);
    app.post('/transacoes/sacar', sacar);
    app.post('/transacoes/transferir', transferir);
    app.get('/contas/saldo', consultarSaldo);
    app.get('/contas/extrato', emitirExtrato);
};