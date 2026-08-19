import api from "../api/axios";

// =====================================================
// LISTAR ATENDIMENTOS
// =====================================================

export async function listarAtendimentos() {
  try {
    const resposta = await api.get("/atendimentos");

    return resposta.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Não foi possível carregar os atendimentos.",
      {
        cause: error,
      }
    );
  }
}

// =====================================================
// BUSCAR ATENDIMENTO POR ID
// =====================================================

export async function buscarAtendimentoPorId(id) {
  try {
    const resposta = await api.get(`/atendimentos/${id}`);

    return resposta.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Não foi possível buscar o atendimento.",
      {
        cause: error,
      }
    );
  }
}

// =====================================================
// CRIAR ATENDIMENTO
// =====================================================

export async function criarAtendimento(dados) {
  try {
    const resposta = await api.post(
      "/atendimentos",
      dados
    );

    return resposta.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Não foi possível cadastrar o atendimento.",
      {
        cause: error,
      }
    );
  }
}

// Compatibilidade com componentes antigos
export const cadastrarAtendimento = criarAtendimento;

// =====================================================
// ATUALIZAR ATENDIMENTO
// =====================================================

export async function atualizarAtendimento(id, dados) {
  try {
    const resposta = await api.put(
      `/atendimentos/${id}`,
      dados
    );

    return resposta.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Não foi possível atualizar o atendimento.",
      {
        cause: error,
      }
    );
  }
}

// =====================================================
// EXCLUIR ATENDIMENTO
// =====================================================

export async function excluirAtendimento(id) {
  try {
    const resposta = await api.delete(
      `/atendimentos/${id}`
    );

    return resposta.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Não foi possível excluir o atendimento.",
      {
        cause: error,
      }
    );
  }
}