const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Agente de Relatórios com IA",
      version: "1.0.0",
      description:
        "API para gerenciamento de atendimentos e geração de análises utilizando inteligência artificial.",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],

    components: {
      schemas: {
        Atendimento: {
          type: "object",

          properties: {
            id: {
              type: "integer",
              example: 1,
            },

            atendente: {
              type: "string",
              example: "Bruno Cavalli",
            },

            data_atendimento: {
              type: "string",
              format: "date",
              example: "2026-07-24",
            },

            chamadas: {
              type: "integer",
              example: 50,
            },

            promessas: {
              type: "integer",
              example: 20,
            },

            observacao: {
              type: "string",
              nullable: true,
              example: "Bom desempenho durante o atendimento.",
            },
          },
        },

        AtendimentoInput: {
          type: "object",

          required: [
            "atendente",
            "data_atendimento",
            "chamadas",
            "promessas",
          ],

          properties: {
            atendente: {
              type: "string",
              example: "Bruno Cavalli",
            },

            data_atendimento: {
              type: "string",
              format: "date",
              example: "2026-07-24",
            },

            chamadas: {
              type: "integer",
              example: 50,
            },

            promessas: {
              type: "integer",
              example: 20,
            },

            observacao: {
              type: "string",
              nullable: true,
              example: "Bom desempenho durante o atendimento.",
            },
          },
        },

        Erro: {
          type: "object",

          properties: {
            status: {
              type: "string",
              example: "error",
            },

            message: {
              type: "string",
              example: "Atendimento não encontrado.",
            },

            error: {
              nullable: true,
              example: null,
            },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;