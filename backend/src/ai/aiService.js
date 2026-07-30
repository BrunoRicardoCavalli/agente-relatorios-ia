const atendimentoModel = require("../models/atendimentoModel");

function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

async function buscarDadosPorIntencao(texto) {
  const pergunta = normalizarTexto(texto);

  if (
    pergunta.includes("mais chamadas") ||
    pergunta.includes("maior numero de chamadas") ||
    pergunta.includes("maior quantidade de chamadas")
  ) {
    const resultado =
      await atendimentoModel.buscarMaiorNumeroChamadas();

    return {
      tipo: "maior_numero_chamadas",
      dados: resultado,
    };
  }

  if (
    pergunta.includes("mais promessas") ||
    pergunta.includes("maior numero de promessas") ||
    pergunta.includes("maior quantidade de promessas")
  ) {
    const resultado =
      await atendimentoModel.buscarMaiorNumeroPromessas();

    return {
      tipo: "maior_numero_promessas",
      dados: resultado,
    };
  }

  if (
    pergunta.includes("taxa de conversao") ||
    pergunta.includes("taxas de conversao") ||
    pergunta.includes("melhor conversao") ||
    pergunta.includes("maior conversao")
  ) {
    const resultado =
      await atendimentoModel.buscarTaxasConversao();

    return {
      tipo: "taxas_conversao",
      dados: resultado,
    };
  }

  if (
    pergunta.includes("relatorio") ||
    pergunta.includes("resumo") ||
    pergunta.includes("desempenho da equipe") ||
    pergunta.includes("comparar") ||
    pergunta.includes("compare")
  ) {
    const [totais, resumoPorAtendente] = await Promise.all([
      atendimentoModel.buscarTotais(),
      atendimentoModel.buscarResumoPorAtendente(),
    ]);

    return {
      tipo: "relatorio_executivo",
      dados: {
        totais,
        resumoPorAtendente,
      },
    };
  }

  const resumoPorAtendente =
    await atendimentoModel.buscarResumoPorAtendente();

  return {
    tipo: "analise_geral",
    dados: resumoPorAtendente,
  };
}

function montarContexto(resultadoConsulta) {
  return JSON.stringify(resultadoConsulta, null, 2);
}

function validarResultado(resultadoConsulta) {
  const dados = resultadoConsulta.dados;

  if (!dados) {
    const erro = new Error(
      "Não existem dados cadastrados para realizar a análise.",
    );

    erro.statusCode = 404;
    throw erro;
  }

  if (Array.isArray(dados) && dados.length === 0) {
    const erro = new Error(
      "Não existem dados cadastrados para realizar a análise.",
    );

    erro.statusCode = 404;
    throw erro;
  }

  if (
    resultadoConsulta.tipo === "relatorio_executivo" &&
    (!dados.resumoPorAtendente ||
      dados.resumoPorAtendente.length === 0)
  ) {
    const erro = new Error(
      "Não existem dados cadastrados para gerar o relatório.",
    );

    erro.statusCode = 404;
    throw erro;
  }
}

function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR");
}

function formatarPercentual(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function responderSemOllama(resultadoConsulta) {
  if (resultadoConsulta.tipo === "maior_numero_chamadas") {
    const { atendente, total_chamadas } =
      resultadoConsulta.dados;

    return `${atendente} foi o atendente com mais chamadas, totalizando ${formatarNumero(
      total_chamadas,
    )}.`;
  }

  if (resultadoConsulta.tipo === "maior_numero_promessas") {
    const { atendente, total_promessas } =
      resultadoConsulta.dados;

    return `${atendente} foi o atendente com mais promessas, totalizando ${formatarNumero(
      total_promessas,
    )}.`;
  }

  if (resultadoConsulta.tipo === "taxas_conversao") {
    const linhas = resultadoConsulta.dados.map(
      (item, indice) => {
        const posicao = indice + 1;

        const taxa = formatarPercentual(
          item.taxa_conversao,
        );

        const chamadas = formatarNumero(
          item.total_chamadas,
        );

        const promessas = formatarNumero(
          item.total_promessas,
        );

        return `${posicao}º ${item.atendente}: ${taxa}% de conversão (${promessas} promessas em ${chamadas} chamadas).`;
      },
    );

    return [
      "Comparação das taxas de conversão:",
      "",
      ...linhas,
    ].join("\n");
  }

  return null;
}

function definirLimiteResposta(tipoAnalise) {
  if (tipoAnalise === "relatorio_executivo") {
    return 800;
  }

  if (tipoAnalise === "analise_geral") {
    return 500;
  }

  return 250;
}

async function consultarOllama(resultadoConsulta, texto) {
  const contexto = montarContexto(resultadoConsulta);

  const ollamaUrl =
    process.env.OLLAMA_URL || "http://localhost:11434";

  const ollamaModel =
    process.env.OLLAMA_MODEL || "llama3.1";

  const numPredict = definirLimiteResposta(
    resultadoConsulta.tipo,
  );

  const response = await fetch(`${ollamaUrl}/api/chat`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      model: ollamaModel,
      stream: false,

      options: {
        temperature: 0.1,
        num_predict: numPredict,
      },

      messages: [
        {
          role: "system",
          content: `
Você é um assistente especializado em análise de atendimentos e relatórios empresariais.

Siga obrigatoriamente estas regras:

1. Responda exclusivamente com base no resultado da consulta fornecida.
2. Não invente metas, períodos, causas, objetivos ou informações ausentes.
3. Não refaça cálculos quando eles já estiverem presentes no resultado.
4. Considere todos os atendentes presentes nos dados.
5. Diferencie volume de chamadas, quantidade de promessas e taxa de conversão.
6. Não afirme que alguém atingiu ou superou metas quando nenhuma meta foi informada.
7. Quando uma informação não estiver disponível, informe claramente.
8. Responda sempre em português.
9. Seja claro, objetivo e profissional.
10. Para rankings ou comparações, apresente somente os dados disponíveis.
11. Somente para relatórios executivos, organize a resposta com resumo geral, destaques e comparação entre atendentes.
12. Não altere nomes, valores, totais ou percentuais retornados pelo banco.
13. Não invente médias, indicadores ou cálculos que não estejam presentes nos dados.
14. Finalize completamente a resposta, sem deixar frases incompletas.
          `.trim(),
        },
        {
          role: "user",
          content: `
Tipo de análise selecionada pelo backend:

${resultadoConsulta.tipo}

Resultado calculado pelo banco de dados:

${contexto}

Pergunta do usuário:

${texto.trim()}

Responda de acordo com o tipo de análise informado.

Não altere os valores retornados pelo banco de dados.

Não invente informações que não estejam presentes no resultado.
          `.trim(),
        },
      ],
    }),
  });

  if (!response.ok) {
    const detalhes = await response.text();

    const erro = new Error(
      `Erro ao consultar o Ollama: ${detalhes}`,
    );

    erro.statusCode = response.status;
    throw erro;
  }

  const dados = await response.json();

  if (!dados.message || !dados.message.content) {
    const erro = new Error(
      "O Ollama não retornou uma resposta válida.",
    );

    erro.statusCode = 502;
    throw erro;
  }

  return dados.message.content.trim();
}

async function gerarResposta(texto) {
  if (
    !texto ||
    typeof texto !== "string" ||
    !texto.trim()
  ) {
    const erro = new Error("O texto é obrigatório.");
    erro.statusCode = 400;
    throw erro;
  }

  const resultadoConsulta =
    await buscarDadosPorIntencao(texto);

  validarResultado(resultadoConsulta);

  const respostaDireta =
    responderSemOllama(resultadoConsulta);

  if (respostaDireta) {
    return respostaDireta;
  }

  return consultarOllama(resultadoConsulta, texto);
}

module.exports = {
  gerarResposta,
};