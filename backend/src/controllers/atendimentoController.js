const atendimentoService = require("../services/atendimentoService");
const {
  successResponse,
} = require("../utils/response");

async function listar(req, res, next) {
  try {
    const atendimentos = await atendimentoService.listar();

    return successResponse(
      res,
      200,
      "Atendimentos encontrados com sucesso.",
      atendimentos
    );
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const atendimento = await atendimentoService.buscarPorId(
      req.params.id
    );

    return successResponse(
      res,
      200,
      "Atendimento encontrado com sucesso.",
      atendimento
    );
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const atendimento = await atendimentoService.criar(req.body);

    return successResponse(
      res,
      201,
      "Atendimento criado com sucesso.",
      atendimento
    );
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

    return successResponse(
      res,
      200,
      "Atendimento atualizado com sucesso.",
      atendimento
    );
  } catch (erro) {
    return next(erro);
  }
}

async function excluir(req, res, next) {
  try {
    await atendimentoService.excluir(req.params.id);

    return successResponse(
      res,
      200,
      "Atendimento excluído com sucesso."
    );
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