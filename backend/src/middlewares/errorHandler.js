function errorHandler(erro, req, res, next) {
  console.error("Erro capturado pelo middleware:", erro);

  const statusCode = erro.statusCode || 500;

  const mensagem =
    statusCode === 500
      ? "Ocorreu um erro interno no servidor."
      : erro.message;

  return res.status(statusCode).json({
    erro: mensagem,
  });
}

module.exports = errorHandler;