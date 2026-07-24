const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const atendimentoRoutes = require("./routes/atendimentoRoutes");
const errorHandler = require("./middlewares/errorHandler");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    mensagem: "API do Agente de Relatórios com IA funcionando!",
  });
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api/atendimentos", atendimentoRoutes);

app.use(errorHandler);

module.exports = app;