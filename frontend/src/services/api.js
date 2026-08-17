const API_URL = "http://localhost:3000/api";

export async function listarAtendimentos() {
  const resposta = await fetch(`${API_URL}/atendimentos`);

  if (!resposta.ok) {
    throw new Error(
      "Não foi possível carregar os atendimentos."
    );
  }

  const resultado = await resposta.json();

  return resultado.data;
}

export async function criarAtendimento(dados) {
  const resposta = await fetch(`${API_URL}/atendimentos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  const resultado = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      resultado.message ||
      "Não foi possível cadastrar o atendimento."
    );
  }

  return resultado.data;
}