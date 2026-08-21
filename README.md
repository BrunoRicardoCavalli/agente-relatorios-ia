# 🤖 Agente Relatórios IA

Sistema web desenvolvido para **gerenciamento e análise de atendimentos**, utilizando **Node.js, Express, MySQL e React**.

O projeto possui uma API REST desenvolvida em Node.js e um frontend em React responsável pelo dashboard, gerenciamento dos atendimentos, filtros, indicadores e visualização dos dados.

O projeto foi desenvolvido seguindo uma arquitetura em camadas no backend, priorizando organização, escalabilidade, manutenção e boas práticas de desenvolvimento.

Atualmente a aplicação possui um módulo completo de gerenciamento de atendimentos, dashboard de indicadores, gráficos, filtros por período, busca por atendente, documentação automática da API, tratamento global de erros, testes automatizados e estrutura preparada para integração com modelos de Inteligência Artificial.

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

## Frontend

- React
- Vite
- JavaScript
- Axios
- CSS

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

```text
agente-relatorios-ia
│
├── backend
│   │
│   ├── src
│   │   │
│   │   ├── ai
│   │   │   └── aiRoutes.js
│   │   │
│   │   ├── config
│   │   │   ├── database.js
│   │   │   └── swagger.js
│   │   │
│   │   ├── controllers
│   │   │   └── atendimentoController.js
│   │   │
│   │   ├── middlewares
│   │   │   ├── errorHandler.js
│   │   │   └── notFound.js
│   │   │
│   │   ├── models
│   │   │   └── atendimentoModel.js
│   │   │
│   │   ├── routes
│   │   │   └── atendimentoRoutes.js
│   │   │
│   │   ├── services
│   │   │   └── atendimentoService.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── tests
│   │   ├── atendimento.criar.test.js
│   │   ├── atendimento.buscar.test.js
│   │   ├── atendimento.listar.test.js
│   │   ├── atendimento.atualizar.test.js
│   │   ├── atendimento.excluir.test.js
│   │   └── app.test.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── frontend
│   │
│   ├── src
│   │   │
│   │   ├── api
│   │   │   └── axios.js
│   │   │
│   │   ├── components
│   │   │   ├── AtendimentoTable.jsx
│   │   │   ├── Card.css
│   │   │   ├── Card.jsx
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── DesempenhoAtendentes.jsx
│   │   │   ├── FiltroPeriodo.jsx
│   │   │   ├── FormularioAtendimento.jsx
│   │   │   ├── GraficoDesempenho.jsx
│   │   │   ├── Navbar.css
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Atendimentos.jsx
│   │   │   └── CadastroAtendimento.jsx
│   │   │
│   │   ├── services
│   │   │   ├── api.js
│   │   │   └── atendimentoService.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── README.md
└── .gitignore

🏗 Arquitetura

A aplicação utiliza arquitetura em camadas:

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

Cada camada possui uma responsabilidade específica.

Routes

Responsável por definir os endpoints da API.

Exemplo:

GET    /api/atendimentos
GET    /api/atendimentos/:id
POST   /api/atendimentos
PUT    /api/atendimentos/:id
DELETE /api/atendimentos/:id

Controller

Responsável por receber as requisições HTTP e retornar as respostas.

O controller encaminha as operações para a camada de serviço e não concentra as regras de negócio.

Service

Responsável pelas regras da aplicação.

Exemplos:

validação dos dados;
validação de IDs;
conversão de valores;
regras de atendimento;
tratamento de registros inexistentes;
preparação dos dados para o model.
Model

Responsável pela comunicação com o banco de dados MySQL.

Realiza operações como:

INSERT
SELECT
UPDATE
DELETE
Middlewares

Responsáveis por funcionalidades compartilhadas.

Atualmente:

Tratamento global de erros;
Tratamento de rotas inexistentes;
Logs de requisições.
📦 Funcionalidades implementadas
Gestão de atendimentos

✅ Cadastro de atendimentos

✅ Listagem de atendimentos

✅ Busca por ID

✅ Busca por atendente

✅ Atualização de atendimentos

✅ Exclusão de atendimentos

✅ CRUD completo pelo frontend

Dashboard

✅ Dashboard de acompanhamento

✅ Total de atendimentos

✅ Total de chamadas

✅ Total de promessas

✅ Taxa de promessas

✅ Desempenho dos atendentes

✅ Gráfico de desempenho

✅ Filtro por período

Filtros disponíveis:

Todos;
Últimos 7 dias;
Últimos 30 dias;
Últimos 90 dias.
Frontend

✅ Navegação por páginas

✅ Página de atendimentos

✅ Página de cadastro

✅ Edição de atendimentos

✅ Exclusão de atendimentos

✅ Busca por atendente

✅ Atualização dos dados após operações do CRUD

✅ Integração com a API REST

Validações

✅ Campos obrigatórios

✅ Validação de ID

✅ Nome do atendente com pelo menos dois caracteres

✅ Chamadas devem ser números inteiros

✅ Promessas devem ser números inteiros

✅ Chamadas maiores ou iguais a zero

✅ Promessas maiores ou iguais a zero

✅ Promessas não podem ultrapassar quantidade de chamadas

✅ Tratamento de registros inexistentes

API

✅ API REST

✅ Documentação Swagger/OpenAPI

✅ Middleware global de erros

✅ Logs HTTP com Morgan

✅ Configuração CORS

Testes automatizados

O projeto possui testes automatizados utilizando Jest e Supertest.

Cenários testados:

criação de atendimento;
busca por ID;
busca de atendimento inexistente;
validação de ID inválido;
listagem;
atualização;
exclusão;
rota inicial da API.

Resultado atual:

Test Suites: 6 passed
Tests: 9 passed

Os testes também foram executados utilizando:

npm test -- --detectOpenHandles

O objetivo foi verificar possíveis operações assíncronas ou conexões que permanecessem abertas após a execução dos testes.

📚 Documentação da API

Após iniciar a aplicação:

http://localhost:3000/api-docs

A documentação interativa é disponibilizada através do Swagger/OpenAPI.

É possível:

visualizar endpoints;
consultar modelos;
visualizar respostas;
testar requisições diretamente pelo navegador.

⚙️ Como executar o projeto
Clone o repositório

git clone https://github.com/BrunoRicardoCavalli/agente-relatorios-ia.git

Acesse a pasta:

cd agente-relatorios-ia

🖥️ Backend

Entre na pasta:

cd backend

Instale as dependências:

npm install

Configure as variáveis de ambiente

Crie um arquivo .env dentro da pasta backend:

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=agente_relatorios_ia
PORT=3000

Execute o projeto

Modo produção:

npm start

Modo desenvolvimento:

npm run dev

🧪 Executar testes

Para executar os testes:

npm test

Para analisar possíveis conexões abertas:

npm test -- --detectOpenHandles

🎨 Frontend

Abra outro terminal e acesse:

cd agente-relatorios-ia/frontend

Instale as dependências

npm install

Execute o projeto

npm run dev

O Vite exibirá no terminal o endereço local para acessar a aplicação.

🧹 Verificar qualidade do código

Para executar o ESLint:

npm run lint

Resultado atual:

0 erros

🗄 Banco de dados

Tabela principal:

atendimentos

| Campo            | Tipo    |
| ---------------- | ------- |
| id               | INT     |
| atendente        | VARCHAR |
| data_atendimento | DATE    |
| chamadas         | INT     |
| promessas        | INT     |
| observacao       | TEXT    |


backend/src/ai

Responsável futuramente por funcionalidades como:

geração automática de relatórios;
análise dos atendimentos;
identificação de padrões;
criação de insights utilizando IA;
geração de resumos;
análise de desempenho.

A integração com modelos de Inteligência Artificial ainda não faz parte da versão atual do sistema.

🔥 Próximas implementações
Integração completa com modelos de Inteligência Artificial
Geração automática de relatórios inteligentes
Geração de insights com IA
Autenticação JWT
Cadastro de usuários
Controle de permissões
Exportação de relatórios
Métricas e indicadores analíticos avançados
👨‍💻 Autor
Bruno Ricardo Cavalli

GitHub:

https://github.com/BrunoRicardoCavalli

LinkedIn:

https://www.linkedin.com/in/bruno-cavalli/

⭐ Objetivo

Este projeto foi desenvolvido para compor meu portfólio como Desenvolvedor Backend/Full Stack e demonstrar conhecimentos em:

Desenvolvimento de APIs REST;
Node.js e Express;
React e Vite;
Arquitetura em camadas;
Integração com banco MySQL;
Desenvolvimento de CRUD;
Desenvolvimento de dashboards;
Integração entre frontend e backend;
Testes automatizados;
Documentação com Swagger;
Tratamento de erros;
Validação de dados;
Organização profissional de projetos;
Versionamento com Git;
Preparação de sistemas para integração com Inteligência Artificial.