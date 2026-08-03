# 🤖 Agente Relatórios IA

API REST desenvolvida em **Node.js** para gerenciamento de atendimentos e preparação de relatórios inteligentes utilizando conceitos de Inteligência Artificial.

O projeto foi desenvolvido seguindo uma arquitetura em camadas, priorizando organização, escalabilidade, manutenção e boas práticas de desenvolvimento backend.

Atualmente a aplicação possui um módulo completo de gerenciamento de atendimentos, documentação automática da API, tratamento global de erros, testes automatizados e estrutura preparada para integração com modelos de Inteligência Artificial.

---

# 🚀 Tecnologias utilizadas

## Backend

- Node.js
- Express.js
- JavaScript
- MySQL
- mysql2/promise
- dotenv
- CORS
- Morgan

## Documentação

- Swagger
- OpenAPI

## Testes

- Jest
- Supertest
- Cross-env

## Versionamento

- Git
- GitHub

---

# 📁 Estrutura do projeto

```
backend
│
├── src
│   │
│   ├── ai
│   │   └── aiRoutes.js
│   │
│   ├── config
│   │   ├── database.js
│   │   └── swagger.js
│   │
│   ├── controllers
│   │   └── atendimentoController.js
│   │
│   ├── middlewares
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   │
│   ├── models
│   │   └── atendimentoModel.js
│   │
│   ├── routes
│   │   └── atendimentoRoutes.js
│   │
│   ├── services
│   │   └── atendimentoService.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests
│   ├── atendimento.criar.test.js
│   ├── atendimento.buscar.test.js
│   ├── atendimento.listar.test.js
│   ├── atendimento.atualizar.test.js
│   ├── atendimento.excluir.test.js
│   └── app.test.js
│
├── package.json
└── package-lock.json
```

---

# 🏗 Arquitetura

A aplicação utiliza arquitetura em camadas:

```
Cliente

↓

Routes

↓

Controller

↓

Service

↓

Model

↓

Banco MySQL
```

Cada camada possui uma responsabilidade específica.

---

## Routes

Responsável por definir os endpoints da API.

Exemplo:

```
GET    /api/atendimentos
POST   /api/atendimentos
PUT    /api/atendimentos/:id
DELETE /api/atendimentos/:id
```

---

## Controller

Responsável por receber as requisições HTTP e retornar as respostas.

Não contém regras de negócio.

---

## Service

Responsável pelas regras da aplicação.

Exemplos:

- validação dos dados;
- validação de IDs;
- regras de atendimento;
- tratamento de situações específicas.

---

## Model

Responsável pela comunicação com o banco de dados MySQL.

Realiza operações como:

- INSERT
- SELECT
- UPDATE
- DELETE

---

## Middlewares

Responsáveis por funcionalidades compartilhadas.

Atualmente:

- Tratamento global de erros;
- Tratamento de rotas inexistentes;
- Logs de requisições.

---

# 📦 Funcionalidades implementadas

## Gestão de atendimentos

✅ Cadastro de atendimentos

✅ Listagem de atendimentos

✅ Busca por ID

✅ Atualização de atendimentos

✅ Exclusão de atendimentos

---

## Validações

✅ Campos obrigatórios

✅ Validação de ID

✅ Chamadas maiores ou iguais a zero

✅ Promessas maiores ou iguais a zero

✅ Promessas não podem ultrapassar quantidade de chamadas

✅ Tratamento de registros inexistentes

---

## API

✅ API REST

✅ Documentação Swagger/OpenAPI

✅ Middleware global de erros

✅ Logs HTTP com Morgan

✅ Configuração CORS

---

## Testes automatizados

O projeto possui testes automatizados utilizando Jest e Supertest.

Cenários testados:

- criação de atendimento;
- busca por ID;
- busca de atendimento inexistente;
- validação de ID inválido;
- listagem;
- atualização;
- exclusão;
- rota inicial da API.

Resultado atual:

```
Test Suites: 6 passed
Tests: 9 passed
```

Também foi implementado o encerramento do pool de conexões MySQL após os testes para evitar conexões abertas no Jest.

---

# 📚 Documentação da API

Após iniciar a aplicação:

```
http://localhost:3000/api-docs
```

A documentação interativa é disponibilizada através do Swagger/OpenAPI.

É possível:

- visualizar endpoints;
- consultar modelos;
- testar requisições diretamente pelo navegador.

---

# ⚙️ Como executar o projeto

## Clone o repositório

```bash
git clone https://github.com/BrunoRicardoCavalli/agente-relatorios-ia.git
```

---

## Acesse a pasta

```bash
cd agente-relatorios-ia/backend
```

---

## Instale as dependências

```bash
npm install
```

---

## Configure as variáveis de ambiente

Crie um arquivo `.env` dentro da pasta backend:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=agente_relatorios_ia
PORT=3000
```

---

## Execute o projeto

Modo produção:

```bash
npm start
```

Modo desenvolvimento:

```bash
npm run dev
```

---

# 🧪 Executar testes

Para executar os testes:

```bash
npm test
```

Para analisar conexões abertas:

```bash
npm test -- --detectOpenHandles
```

---

# 🗄 Banco de dados

Tabela principal:

```
atendimentos
```

Estrutura:

| Campo | Tipo |
|---|---|
| id | INT |
| atendente | VARCHAR |
| data_atendimento | DATE |
| chamadas | INT |
| promessas | INT |
| observacao | TEXT |

---

# 🤖 Estrutura preparada para Inteligência Artificial

O projeto possui uma estrutura dedicada:

```
src/ai
```

Responsável futuramente por funcionalidades como:

- geração automática de relatórios;
- análise dos atendimentos;
- identificação de padrões;
- criação de insights utilizando IA.

---

# 🔥 Próximas implementações

- Integração completa com OpenAI
- Geração automática de relatórios inteligentes
- Dashboard frontend em React
- Autenticação JWT
- Cadastro de usuários
- Controle de permissões
- Exportação de relatórios
- Métricas e indicadores analíticos

---

# 👨‍💻 Autor

## Bruno Ricardo Cavalli

GitHub:

https://github.com/BrunoRicardoCavalli

LinkedIn:

https://www.linkedin.com/in/bruno-cavalli/

---

# ⭐ Objetivo

Este projeto foi desenvolvido para compor meu portfólio como Desenvolvedor Backend/Full Stack e demonstrar conhecimentos em:

- Desenvolvimento de APIs REST;
- Node.js e Express;
- Arquitetura em camadas;
- Integração com banco MySQL;
- Testes automatizados;
- Documentação com Swagger;
- Tratamento de erros;
- Organização profissional de projetos;
- Versionamento com Git;
- Preparação de sistemas para integração com Inteligência Artificial.