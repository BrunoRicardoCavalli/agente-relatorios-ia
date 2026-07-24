const db = require("../config/database");

async function listar() {
  const [atendimentos] = await db.query(
    "SELECT * FROM atendimentos ORDER BY data_atendimento DESC"
  );

  return atendimentos;
}

async function buscarPorId(id) {
  const [atendimentos] = await db.query(
    "SELECT * FROM atendimentos WHERE id = ?",
    [id]
  );

  return atendimentos[0];
}

async function criar(dados) {
  const {
    atendente,
    data_atendimento,
    chamadas,
    promessas,
    observacao,
  } = dados;

  const [resultado] = await db.query(
    `INSERT INTO atendimentos
      (atendente, data_atendimento, chamadas, promessas, observacao)
     VALUES (?, ?, ?, ?, ?)`,
    [
      atendente,
      data_atendimento,
      chamadas,
      promessas,
      observacao || null,
    ]
  );

  return {
    id: resultado.insertId,
    atendente,
    data_atendimento,
    chamadas,
    promessas,
    observacao: observacao || null,
  };
}

async function atualizar(id, dados) {
  const {
    atendente,
    data_atendimento,
    chamadas,
    promessas,
    observacao,
  } = dados;

  const [resultado] = await db.query(
    `UPDATE atendimentos
     SET atendente = ?,
         data_atendimento = ?,
         chamadas = ?,
         promessas = ?,
         observacao = ?
     WHERE id = ?`,
    [
      atendente,
      data_atendimento,
      chamadas,
      promessas,
      observacao || null,
      id,
    ]
  );

  return resultado.affectedRows;
}

async function excluir(id) {
  const [resultado] = await db.query(
    "DELETE FROM atendimentos WHERE id = ?",
    [id]
  );

  return resultado.affectedRows;
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir,
};