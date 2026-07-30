const aiService = require("./aiService");

async function analisar(req, res, next) {
  try {
    const { texto } = req.body;

    const resposta = await aiService.gerarResposta(texto);

    return res.status(200).json({
      status: "success",
      message: "Resposta gerada com sucesso.",
      data: {
        resposta,
      },
    });
  } catch (erro) {
    next(erro);
  }
}

module.exports = {
  analisar,
};