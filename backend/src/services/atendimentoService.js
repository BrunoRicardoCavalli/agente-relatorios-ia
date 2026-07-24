const atendimentoModel = require("../models/atendimentoModel");

function validarId(id) {
  const idNumerico = Number(id);

  if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
    const erro = new Error("O ID informado é inválido.");
    erro.statusCode = 400;

    throw erro;
  }

  return idNumerico;
}

function validarDados(dados) {
  const {
    atendente,
    data_atendimento,
    chamadas,
    promessas,
  } = dados;

  if (
    !atendente ||
    !data_atendimento ||
    chamadas === undefined ||
    promessas === undefined
  ) {
    const erro = new Error(
      "Atendente, data, chamadas e promessas são obrigatórios."
    );

    erro.statusCode = 400;

    throw erro;
  }

  if (typeof atendente !== "string" || atendente.trim().length < 2) {
    const erro = new Error(
      "O nome do atendente deve possuir pelo menos dois caracteres."
    );

    erro.statusCode = 400;

    throw erro;
  }

  const quantidadeChamadas = Number(chamadas);
  const quantidadePromessas = Number(promessas);

  if (
    !Number.isInteger(quantidadeChamadas) ||
    !Number.isInteger(quantidadePromessas)
  ) {
    const erro = new Error(
      "Chamadas e promessas devem ser números inteiros."
    );

    erro.statusCode = 400;

    throw erro;
  }

  if (quantidadeChamadas < 0 || quantidadePromessas < 0) {
    const erro = new Error(
      "Chamadas e promessas não podem ser negativas."
    );

    erro.statusCode = 400;

    throw erro;
  }

  if (quantidadePromessas > quantidadeChamadas) {
    const erro = new Error(
      "O número de promessas não pode ser maior que o de chamadas."
    );

    erro.statusCode = 400;

    throw erro;
  }

  return {
    atendente: atendente.trim(),
    data_atendimento,
    chamadas: quantidadeChamadas,
    promessas: quantidadePromessas,
    observacao: dados.observacao?.trim() || null,
  };
}

async function listar() {
  return atendimentoModel.listar();
}

async function buscarPorId(id) {
  const idValidado = validarId(id);
  const atendimento = await atendimentoModel.buscarPorId(idValidado);

  if (!atendimento) {
    const erro = new Error("Atendimento não encontrado.");
    erro.statusCode = 404;

    throw erro;
  }

  return atendimento;
}

async function criar(dados) {
  const dadosValidados = validarDados(dados);

  return atendimentoModel.criar(dadosValidados);
}

async function atualizar(id, dados) {
  const idValidado = validarId(id);
  const dadosValidados = validarDados(dados);

  await buscarPorId(idValidado);
  await atendimentoModel.atualizar(idValidado, dadosValidados);

  return buscarPorId(idValidado);
}

async function excluir(id) {
  const idValidado = validarId(id);

  await buscarPorId(idValidado);
  await atendimentoModel.excluir(idValidado);
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir,
};