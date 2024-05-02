# Cubos-Bank-API
Este projeto consiste em uma RESTful API para um banco digital, que permite realizar diversas operações bancárias. A API foi desenvolvida como um desafio para o segundo módulo do curso de desenvolvimento de software full stack da Cubos Academy. O desenvolvimento se deu em Node.js com Express.js e os dados são persistidos em memória.

## Funcionalidades
* Criar conta bancária
* Listar contas bancárias
* Atualizar dados do usuário da conta bancária
* Excluir conta bancária
* Depositar em uma conta bancária
* Sacar de uma conta bancária
* Transferir valores entre contas bancárias
* Consultar saldo da conta bancária
* Emitir extrato bancário


## Instalação
Clone o repositório:

``` bash
git clone https://github.com/awlcampos/Cubos-Bank-API.git
```

Instale as dependências:
``` bash
npm install express
```

Inicie o servidor:
``` bash
npm start
```


## Status Codes
A API pode retornar os seguintes status codes:
```
200 (OK) = requisição bem sucedida
201 (Created) = requisição bem sucedida e algo foi criado
204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
401 (Unauthorized) = o usuário não está autenticado (logado)
403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
404 (Not Found) = o servidor não pode encontrar o recurso solicitado
500 (Internal Server Error) = falhas causadas pelo servidor
```

## Endpoints
````
GET /contas - Lista todas as contas bancárias
POST /contas - Cria uma nova conta bancária
PUT /contas/:numeroConta/usuario - Atualiza os dados do usuário da conta bancária
DELETE /contas/:numeroConta - Exclui uma conta bancária
POST /transacoes/depositar - Deposita em uma conta bancária
POST /transacoes/sacar - Saca de uma conta bancária
POST /transacoes/transferir - Transfere valores entre contas bancárias
GET /contas/saldo - Consulta o saldo da conta bancária
GET /contas/extrato - Emite o extrato bancário
````

## Como Testar
* Utilize o software de sua preferência para realizar requisições HTTP, como Insomnia ou HTTPie.
* Para cada endpoint, envie uma requisição HTTP com os parâmetros adequados conforme descrito na documentação.
* Verifique as respostas da API para garantir que as operações estão sendo realizadas corretamente.

### Listar contas bancárias
* Selecione o método GET e coloque a seguinte URL após o localhost: /contas?senha_banco=Cubos123Bank;
* O argumento "Cubos123Bank" é a senha de acesso ao banco, configurada no arquivo de banco de dados;
* Em caso de sucesso, o endpoint retornará com status code 200 e um corpo contendo a listagem de contas existentes na persistência de dados (arquivo bancodedados.js);
* Em caso de algum erro, haverá uma resposta com o status code apropriado e uma mensagem apontando o erro.


### Criar conta bancária
* Selecione o método POST e coloque a seguinte URL após o localhost: /contas
* No body da requisição, coloque as informações respeitando os seguintes nomes (todas as informações são obrigatórias):
``` JSON
{
    "nome": ":nome",
    "cpf": ":CPF",
    "data_nascimento": "aaaa.mm.dd",
    "telefone": ":telefone",
    "email": ":email"
    "senha": ":senha"
}
```
* Esse endpoint criará uma nova conta bancária com um número de conta único;
* O CPF e e-mail são campos únicos por cadastro. Caso haja alguma outra conta cadastrada com o mesmo CPF e/ou e-mail, o retorno será uma mensagem informando essa condição;
* O endpoint também verificará se todos os campos foram informados (todos são obrigatórios). Caso algo esteja faltando, o retorno será uma mensagem informando a ausencia de dados;
* A conta será criada com o saldo inicial sempre igual a 0 (zero);
* Em caso de sucesso, o endpoint inserirá os dados da conta na persistência de dados (arquivo bancodedados.js) e retornará apenas o status code 200;
* Em caso de algum erro, haverá uma resposta com o status code apropriado e uma mensagem apontando o erro.


### Atualizar usuário da conta bancária
* Selecione o método PUT e coloque a seguinte URL após o localhost: /contas/:numeroConta/usuario
* ":numeroConta" se refere ao número de identificação da conta que está tentando atualizar o usuário;
* No body da requisição, coloque as informações respeitando os seguintes nomes (todas as informações são obrigatórias):
``` JSON
{
    "nome": ":nome",
    "cpf": ":CPF",
    "data_nascimento": "aaaa.mm.dd",
    "telefone": ":telefone",
    "email": ":email"
    "senha": ":senha"
}
```
* Esse endpoint atualizará apenas os dados do usuário de uma conta bancária;
* O endpoint fará uma verificação se foram passados todos os campos no body da requição;
* Se o CPF ou e-mail informado já existirem no banco de dados, o retorno será um erro com uma mensagem informando o ocorrido;
* Em caso de sucesso, o endpoint atualizará a conta na persistência de dados (arquivo bancodedados.js) de acordo com os dados informados e retornará apenas o status code 204;
* Em caso de algum erro, haverá uma resposta com o status code apropriado e uma mensagem apontando o erro.


## Excluir conta
* Selecione o método DELETE e coloque a seguinte URL após o localhost: /contas/:numeroConta
* ":numeroConta" se refere ao número de identificação da conta que está tentando excluir;
* Esse endpoint excluirá o registro de uma conta bancária;
* O endpoint fará uma verificação se o número da conta passado como parâmetro na URL é válido;
* Só é permitido excluir uma conta bancária se o saldo for 0 (zero);
* Em caso de sucesso, o endpoint excluíra a conta informada da persistência de dados e retornará apenas o status code 200.
* Em caso de algum erro, haverá uma resposta com o status code apropriado e uma mensagem apontando o erro.


## Depositar
* Selecione o método POST e coloque a seguinte URL após o localhost: /transacoes/depositar
* Esse endpoint somará o valor do depósito ao saldo de uma conta válida, enquanto registrará a transação na persistência de dados (arquivo bancodedados.js);
* No body da requisição, deve haver as seguintes propriedades (respeitando tais nomes):
``` JSON
  {
	"numero_conta": ":numero_conta",
	"valor": :valor
}
```
* O número da conta deve ser passado em string enqto o valor do depósito deve ser em valor numérico;
* O endpoint fará uma verificação se o número da conta e o valor do depósito foram informados corretamente no body da requisição;
* O endpoint fará ainda uma verificação se o número da conta é válido e se o valor é maior do que 0 (zero). O valor não pode ser 0 (zero), negativo, vazio ou um valor que não seja um valor numérico;
* Em caso de sucesso, o endpoint somará o valor do depósito no saldo da conta e retornará apenas o status code 200.
* Em caso de falha, o endpoint retornará como resposta um status code apropriado e em seu corpo (body) uma mensagem explicando o motivo da falha.


## Sacar
* Selecione o método POST e coloque a seguinte URL após o localhost: /transacoes/sacar
* Esse endpoint debitará o valor do saque no saldo de uma conta válida, enquanto registrará a transação na persistência de dados (arquivo bancodedados.js);
* No body da requisição, deve haver as seguintes propriedades (respeitando tais nomes):
``` JSON
{
	"numero_conta": ":numero_conta",
	"valor": :valor,
    "senha": ":senha"
}
```
* O endpoint fará uma verificação se o número da conta, senha e valor foram informados corretamente no body da requisição
* O número e senha da conta devem ser passados em string enqto o valor do saque deve ser em valor numérico;
* O endpoint verificará se a conta bancária existe, e em caso positivo, se há saldo disponível nela;
* Em caso de sucesso, o endpoint subtrairá o valor sacado do saldo da conta encontrada e retornará apenas o statis code 200.
* Em caso de falha, o endpoint retornará como resposta um status code apropriado e em seu corpo (body) uma mensagem explicando o motivo da falha.


## Transferir
* Seleciuone o médoto POST e coloque o seguinte URL após o localhost: /transacoes/sacar
* Esse endpoint realizará a transferência de uma conta informada para outra, registrando esse evento na persistência de dados;
* No body da requisição, deve haver as seguintes propriedades (respeitando tais nomes):
``` JSON
{
	"numero_conta_origem": ":numero_conta_origem",
	"numero_conta_destino": ":numero_conta_destino",
	"valor": :valor,
	"senha": ":senha"
}
```
* O endpoint fará a verificação se o número da conta de origem, de destino, senha da conta de origem e valor da transferência foram informados corretamente no body;
* Em seguinda, ele verificará se as contas de origem e destino existem no banco de dados;
* Verificará ainda se existe saldo disponível na conta de origem para transferência;
* Em caso de sucesso, o endpoint subtrairá o valor da conta de origem e somará na conta de destino, persistindo na memória através do arquivo bancodedados.js, e retornará apenas o status code 200;
* Em caso de falha, o endpoint retornará como resposta um status code apropriado e em seu corpo (body) uma mensagem explicando o motivo da falha.


## Consultar saldo
* Selecione o método GET e coloque o seguinte URL após o localhost: /contas/saldo?numero_conta=:numero_conta&senha=:senha
* ":numeroConta" se refere ao número de identificação da conta que está tentando consultar;
* ":senha" se refere à senha da conta que está tentando consultar;
* O endpoint verificará se o número da conta e senha foram passados corretamente como parâmetro;
* Em seguida verificará se a conta informada existe e se a senha informada é válida para aquela conta;
* Em caso de sucesso, o endpoint retornará o status code 200 e uma mensagem com o saldo da conta informada como parâmetro;
* Em caso de falha, o endpoint retornará como resposta um status code apropriado e em seu corpo (body) uma mensagem explicando o motivo da falha.


# Consultar extrato
* Selecione o método GET e coloque o seguinte URL após o localhost: /contas/extrato?numero_conta=123&senha=123
* ":numeroConta" se refere ao número de identificação da conta que está tentando consultar;
* ":senha" se refere à senha da conta que está tentando consultar;
* O endpoint verificará se o número da conta e senha foram passados corretamente como parâmetro;
* Em seguida verificará se a conta informada existe e se a senha informada é válida para aquela conta;
* Em caso de sucesso, o endpoint retornará o status code 200 e uma mensagem com o relatório de todas as transações da conta informada como parâmetro;
* Em caso de falha, o endpoint retornará como resposta um status code apropriado e em seu corpo (body) uma mensagem explicando o motivo da falha.


























