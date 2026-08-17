import api from "../api/axios";

export async function listarAtendimentos() {
  const resposta = await api.get("/atendimentos");
  return resposta.data;
}