const request = require("supertest");
const app = require("../src/app");

describe("DELETE /api/atendimentos/:id", () => {

  it("deve excluir um atendimento", async () => {

    // Cria um atendimento
    const criado = await request(app)
      .post("/api/atendimentos")
      .send({
        atendente: "Bruno",
        data_atendimento: "2026-08-03",
        chamadas: 10,
        promessas: 5,
        observacao: "Teste exclusão"
      });

    const id = criado.body.data.id;

    // Exclui
    const resposta = await request(app)
      .delete(`/api/atendimentos/${id}`);

    expect(resposta.statusCode).toBe(200);
    expect(resposta.body.status).toBe("success");
    expect(resposta.body.message).toBe("Atendimento excluído com sucesso.");

    // Confirma exclusão
    const busca = await request(app)
      .get(`/api/atendimentos/${id}`);

    expect(busca.statusCode).toBe(404);

  });

});