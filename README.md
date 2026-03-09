# 📦 node-orders-api
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Docs-Swagger-85EA2D?logo=swagger&logoColor=black)

API REST para gerenciamento de pedidos com **Node.js**, **Express** e **MongoDB**.

## 🚀 Funcionalidades
- Criar, listar, buscar, atualizar e deletar pedidos
- Mapeamento de campos (request → banco de dados)
- Autenticação JWT
- Documentação Swagger em `/api-docs`

## ⚙️ Instalação

```bash
git clone https://github.com/alessandrolsdev/node-orders-api.git
cd node-orders-api
npm install
cp .env.example .env
npm run dev
```

## 🔐 Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## 📋 Endpoints

| Método | URL | Descrição |
|--------|-----|-----------|
| POST | `/auth/login` | Retorna token JWT |
| POST | `/order` | Cria pedido |
| GET | `/order/list` | Lista todos os pedidos |
| GET | `/order/:orderId` | Busca pedido pelo ID |
| PUT | `/order/:orderId` | Atualiza pedido |
| DELETE | `/order/:orderId` | Deleta pedido |

## 🔄 Mapeamento de Campos

| Request | Banco de Dados |
|---------|----------------|
| `numeroPedido` | `orderId` |
| `valorTotal` | `value` |
| `dataCriacao` | `creationDate` |
| `items[].idItem` | `items[].productId` |
| `items[].quantidadeItem` | `items[].quantity` |
| `items[].valorItem` | `items[].price` |

## 💡 Criar pedido (exemplo)
```bash
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [{ "idItem": "2434", "quantidadeItem": 1, "valorItem": 1000 }]
  }'
```

## 🛠️ Tecnologias
Node.js · Express · MongoDB · Mongoose · JWT · bcryptjs · Swagger · dotenv
