const atendimentoService = require("../services/atendimentoService");

async function listar(req, res, next) {
  try {
    const atendimentos = await atendimentoService.listar();

    return res.status(200).json(atendimentos);
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const atendimento = await atendimentoService.buscarPorId(
      req.params.id
    );

    return res.status(200).json(atendimento);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const atendimento = await atendimentoService.criar(req.body);

    return res.status(201).json(atendimento);
  } catch (erro) {
    return next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const atendimento = await atendimentoService.atualizar(
      req.params.id,
      req.body
    );

    return res.status(200).json(atendimento);
  } catch (erro) {
    return next(erro);
  }
}

async function excluir(req, res, next) {
  try {
    await atendimentoService.excluir(req.params.id);

    return res.status(200).json({
      mensagem: "Atendimento excluído com sucesso.",
    });
  } catch (erro) {
    return next(erro);
  }
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir,
};
