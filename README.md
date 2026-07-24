# 🤖 Agente Relatórios IA

API REST desenvolvida em **Node.js** para gerenciamento de atendimentos e geração de relatórios inteligentes.

O projeto foi construído seguindo uma arquitetura em camadas, com foco em organização, escalabilidade e boas práticas de desenvolvimento. Além do gerenciamento dos atendimentos, a aplicação está preparada para futuramente integrar modelos de Inteligência Artificial para geração automática de análises e insights.

---

# 🚀 Tecnologias utilizadas

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- Swagger (OpenAPI)
- JavaScript
- Git e GitHub

---

# 📁 Estrutura do projeto

```
backend
│
├── src
│   ├── config
│   │   ├── database.js
│   │   └── swagger.js
│   │
│   ├── controllers
│   │   └── atendimentoController.js
│   │
│   ├── middlewares
│   │   └── errorHandler.js
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
├── package.json
└── package-lock.json
```

---

# 🏗 Arquitetura

A aplicação segue o padrão de arquitetura em camadas:

```
Cliente

↓

Rotas

↓

Controller

↓

Service

↓

Model

↓

MySQL
```

Cada camada possui uma responsabilidade específica.

### Routes

Responsável pelo mapeamento das rotas da API.

### Controller

Recebe as requisições HTTP e envia as respostas.

### Service

Contém toda a regra de negócio da aplicação.

### Model

Realiza o acesso ao banco de dados.

### Middleware

Centraliza o tratamento de erros da aplicação.

---

# 📦 Funcionalidades

Atualmente a API possui:

- Cadastro de atendimentos
- Listagem de atendimentos
- Busca por ID
- Atualização de atendimentos
- Exclusão de atendimentos
- Validações de negócio
- Tratamento global de erros
- Documentação automática com Swagger

---

# 📚 Documentação da API

Após iniciar a aplicação, acesse:

```
http://localhost:3000/api-docs
```

A documentação é gerada automaticamente utilizando Swagger/OpenAPI.

---

# ⚙️ Como executar o projeto

## Clone o repositório

```bash
git clone https://github.com/BrunoRicardoCavalli/agente-relatorios-ia.git
```

## Acesse a pasta

```bash
cd agente-relatorios-ia/backend
```

## Instale as dependências

```bash
npm install
```

## Configure as variáveis de ambiente

Crie um arquivo `.env` na pasta `backend` contendo:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=agente_relatorios_ia
PORT=3000
```

## Execute o projeto

```bash
npm start
```

ou

```bash
npm run dev
```

---

# 🗄 Banco de dados

Tabela utilizada:

```
atendimentos
```

Campos:

| Campo | Tipo |
|--------|------|
| id | INT |
| atendente | VARCHAR |
| data_atendimento | DATE |
| chamadas | INT |
| promessas | INT |
| observacao | TEXT |

---

# ✔ Validações implementadas

- Campos obrigatórios
- Chamadas maiores ou iguais a zero
- Promessas maiores ou iguais a zero
- Promessas não podem ser maiores que chamadas
- Validação de ID
- Tratamento para atendimento inexistente

---

# 🔥 Próximas implementações

- Autenticação JWT
- Cadastro de usuários
- Dashboard em React
- Integração com OpenAI
- Geração automática de relatórios inteligentes
- Dashboard analítico
- Exportação de relatórios

---

# 👨‍💻 Autor

**Bruno Ricardo Cavalli**

GitHub

https://github.com/BrunoRicardoCavalli

LinkedIn

https://www.linkedin.com/in/bruno-cavalli/

---

# ⭐ Objetivo

Este projeto foi desenvolvido para compor meu portfólio como Desenvolvedor Full Stack e demonstrar conhecimentos em:

- Arquitetura em camadas
- Desenvolvimento de APIs REST
- Organização de projetos
- Boas práticas em Node.js
- Documentação com Swagger
- Integração com banco de dados MySQL
- Versionamento com Git
- Futuras integrações com Inteligência Artificial