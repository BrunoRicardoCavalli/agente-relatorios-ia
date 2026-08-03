function errorHandler(erro, req, res, next) {

  if (process.env.NODE_ENV !== "test") {
    console.error("ERRO CAPTURADO:", erro);
  }

  const statusCode = erro.statusCode || 500;

  res.status(statusCode).json({
    erro: erro.message
  });
}

module.exports = errorHandler;