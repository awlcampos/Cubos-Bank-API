const express = require('express');
const app = express();
const rotas = require('./rotas');

app.use(express.json());
rotas(app);

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});