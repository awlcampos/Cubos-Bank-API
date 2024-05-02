module.exports = {
    "banco": {
        "nome": "Cubos Bank",
        "numero": "123",
        "agencia": "0001",
        "senha": "Cubos123Bank"
    },
    "contas": [
        {
            "numero": "1",
            "saldo": 800,
            "usuario": {
                "nome": "Foo Bar",
                "cpf": "00011122233",
                "data_nascimento": "2021-03-15",
                "telefone": "71999998888",
                "email": "foo@bar.com",
                "senha": "1234"
            }
        },
        {
            "numero": "2",
            "saldo": 3100,
            "usuario": {
                "nome": "Foo Bar 2",
                "cpf": "00011122234",
                "data_nascimento": "2021-03-15",
                "telefone": "71999998888",
                "email": "foo@bar2.com",
                "senha": "12345"
            }
        }
    ],
    "saques": [
        {
            "data": "2024-05-02T18:44:01.337Z",
            "numero_conta": "2",
            "valor": "1900"
        },
        {
            "data": "2024-05-02T18:44:57.501Z",
            "numero_conta": "2",
            "valor": "1900"
        },
        {
            "data": "2024-05-02T18:50:13.555Z",
            "numero_conta": "1",
            "valor": "1000"
        },
        {
            "data": "2024-05-02T18:50:18.262Z",
            "numero_conta": "2",
            "valor": "1000"
        }
    ],
    "depositos": [
        {
            "data": "2024-05-02T16:20:11.213Z",
            "numero_conta": "2",
            "valor": "1900"
        },
        {
            "data": "2024-05-02T16:22:29.735Z",
            "numero_conta": "2",
            "valor": "1900"
        },
        {
            "data": "2024-05-02T16:37:52.586Z",
            "numero_conta": "2",
            "valor": "1"
        },
        {
            "data": "2024-05-02T18:44:53.815Z",
            "numero_conta": "2",
            "valor": "1900"
        },
        {
            "data": "2024-05-02T18:49:49.934Z",
            "numero_conta": "1",
            "valor": "2000"
        },
        {
            "data": "2024-05-02T18:49:53.744Z",
            "numero_conta": "2",
            "valor": "2000"
        }
    ],
    "transferencias": [
        {
            "data": "2024-05-02T18:52:22.990Z",
            "numero_conta_origem": "1",
            "numero_conta_destino": "2",
            "valor": "200"
        },
        {
            "data": "2024-05-02T18:52:37.976Z",
            "numero_conta_origem": "2",
            "numero_conta_destino": "1",
            "valor": "200"
        },
        {
            "data": "2024-05-02T18:52:53.729Z",
            "numero_conta_origem": "1",
            "numero_conta_destino": "2",
            "valor": "200"
        }
    ]
}