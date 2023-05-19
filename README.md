# Tempo Frontend challenge

[typescript]: https://img.shields.io/static/v1?label=Typescript&message=5.0.4&color=0172b2
[node]: https://img.shields.io/static/v1?label=Node&message=16&color=0172b2
[docker]: https://img.shields.io/static/v1?label=Docker&message=23.0.5&color=0172b2
[postgresql]: https://img.shields.io/static/v1?label=PostgreSQL&message=15.3&color=0172b2
[mongodb]: https://img.shields.io/static/v1?label=MongoDB&message=6.0.5&color=0172b2
[rabbitmq]: https://img.shields.io/static/v1?label=RabbitMQ&message=3.11.10&color=0172b2

![typescript-version][typescript]
![node-version][node]
![docker-version][docker]
![postgresql-version][postgresql]
![mongodb-version][mongodb]
![rabbitmq-version][rabbitmq]

<h2 id="contents">📑 Conteudo</h2>

* [Pre-Requisitos](#prerequisites)
* [Sobre o projeto](#about)
* [Lista de Endpoints](#endpoints)
* [Como rodar o projeto](#execution)
* [Como executar os tests](#testing)
* [Lista de tarefas](#todo)

<h2 id="prerequisites">👨‍🔧 Pré-requisitos</h2>

* node
* docker-compose

[Back to top](#contents)

<h2 id="about">🧙‍♂️ Sobre o projeto</h2>

Projeto criado para seguir um fluxo simples de um pedido de uma compra com uso de filas de mensagens.

* **Docker** para conteinerização
* **NodeJS** com a utilização de Typescript
* **Express** usado para a criação das rotas
* **Hapi/joi** para verificação dos dados
* **Knex** para o gerenciamento do banco de dados relacional (PostgreSQL)
* **RabbitMQ** como o serviço de mensageria
* **Mongoose** para armazenamento de logs (MongoDB)
* **Winston** para controle de logs em arquivo de texto e no console

[Back to top](#contents)

<h2 id="endpoints"> Lista de Endpoints</h2>

<h3>Criar pedido</h3>

`POST /order/create/`

```json
  {
    "customer": {
        "name": "Fulano",
        "document": "25892913023"
    },
    "items": [
        {
            "id": "A624659A-009C-4A18-92BD-2EF1FEC06802",
            "amount": 2
        },
        {
            "id": "63BDA413-3693-434F-AFC9-8DD13B2B6107",
            "amount": 1
        }
    ],
    "address": {
        "zip_code": "06663289",
        "house_number": "743",
        "street": "Av. Sagitário",
        "neighborhood": "Alphaville Conde II",
        "city": "Barueri",
        "uf": "SP",
        "complement": "",
        "reference": "perto do posto de gasolina"
    }
  }
```

<h3>Response</h3>

```json
{
  "message": "Order placed successfully"
}
```

<h2 id="execution">👨‍💻 Como executar o projeto</h2>

```bash
$npm run docker
```

O endpoint ficará disponível na seguinte url: <http://localhost>

<h2 id="testing">👷‍♂️ Como rodar os tests</h2>

```bash
$npm run test
```

[Back to top](#contents)

<h2 id="todo">📝 Lista de tarefas</h2>

* [x] Modelagem e criação do banco de dados relacional (PostgreSQL)
* [x] Criação da rota para criação do pedido
* [x] Envio do pedido para a fila de mensagens
* [x] Controle dos logs em arquivo e no banco não relational (MongoDB)
* [x] Criar o consumidor para as mensagens de pedido na fila
* [x] Criar o consumidor para as mensagens de notificação na fila
* [ ] Testes unitários com cobertura de pelo mennos 75% (~50% atualmente)

[Back to top](#contents)
