function notFound(req, res) {
  return res.status(404).json({
    status: "error",
    message: `Rota ${req.method} ${req.originalUrl} não encontrada.`,
    error: null,
  });
}

module.exports = notFound;