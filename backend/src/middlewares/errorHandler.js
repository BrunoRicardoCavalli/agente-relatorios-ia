const {
  errorResponse,
} = require("../utils/response");

function errorHandler(erro, req, res, next) {
  console.error("Erro capturado pelo middleware:", erro);

  const statusCode = erro.statusCode || 500;

  const message =
    statusCode === 500
      ? "Ocorreu um erro interno no servidor."
      : erro.message;

  return errorResponse(
    res,
    statusCode,
    message
  );
}

module.exports = errorHandler;