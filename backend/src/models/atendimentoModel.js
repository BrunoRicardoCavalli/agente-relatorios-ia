const db = require("../config/database");

async function listar() {
  const [atendimentos] = await db.query(
    "SELECT * FROM atendimentos ORDER BY data_atendimento DESC",
  );

  return atendimentos;
}

async function buscarPorId(id) {
  const [atendimentos] = await db.query(
    "SELECT * FROM atendimentos WHERE id = ?",
    [id],
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
    ],
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
    ],
  );

  return resultado.affectedRows;
}

async function excluir(id) {
  const [resultado] = await db.query(
    "DELETE FROM atendimentos WHERE id = ?",
    [id],
  );

  return resultado.affectedRows;
}

async function buscarMaiorNumeroChamadas() {
  const [atendimentos] = await db.query(`
    SELECT
      atendente,
      SUM(chamadas) AS total_chamadas
    FROM atendimentos
    GROUP BY atendente
    ORDER BY total_chamadas DESC
    LIMIT 1
  `);

  return atendimentos[0];
}

async function buscarMaiorNumeroPromessas() {
  const [atendimentos] = await db.query(`
    SELECT
      atendente,
      SUM(promessas) AS total_promessas
    FROM atendimentos
    GROUP BY atendente
    ORDER BY total_promessas DESC
    LIMIT 1
  `);

  return atendimentos[0];
}

async function buscarTaxasConversao() {
  const [atendimentos] = await db.query(`
    SELECT
      atendente,
      SUM(chamadas) AS total_chamadas,
      SUM(promessas) AS total_promessas,
      ROUND(
        (SUM(promessas) / NULLIF(SUM(chamadas), 0)) * 100,
        2
      ) AS taxa_conversao
    FROM atendimentos
    GROUP BY atendente
    ORDER BY taxa_conversao DESC
  `);

  return atendimentos;
}

async function buscarTotais() {
  const [totais] = await db.query(`
    SELECT
      COUNT(*) AS total_registros,
      COUNT(DISTINCT atendente) AS total_atendentes,
      COALESCE(SUM(chamadas), 0) AS total_chamadas,
      COALESCE(SUM(promessas), 0) AS total_promessas,
      ROUND(
        (
          COALESCE(SUM(promessas), 0)
          / NULLIF(COALESCE(SUM(chamadas), 0), 0)
        ) * 100,
        2
      ) AS taxa_conversao_geral
    FROM atendimentos
  `);

  return totais[0];
}

async function buscarResumoPorAtendente() {
  const [atendimentos] = await db.query(`
    SELECT
      atendente,
      COUNT(*) AS total_registros,
      SUM(chamadas) AS total_chamadas,
      SUM(promessas) AS total_promessas,
      ROUND(
        (SUM(promessas) / NULLIF(SUM(chamadas), 0)) * 100,
        2
      ) AS taxa_conversao
    FROM atendimentos
    GROUP BY atendente
    ORDER BY total_chamadas DESC
  `);

  return atendimentos;
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir,
  buscarMaiorNumeroChamadas,
  buscarMaiorNumeroPromessas,
  buscarTaxasConversao,
  buscarTotais,
  buscarResumoPorAtendente,
};