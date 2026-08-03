const request = require("supertest");
const app = require("../src/app");

describe("PUT /api/atendimentos/:id", () => {

  it("deve atualizar um atendimento", async () => {

    // Cria um atendimento
    const criado = await request(app)
      .post("/api/atendimentos")
      .send({
        atendente: "Bruno",
        data_atendimento: "2026-08-03",
        chamadas: 20,
        promessas: 10,
        observacao: "Teste atualização"
      });

    const id = criado.body.data.id;

    // Atualiza o atendimento criado
    const resposta = await request(app)
      .put(`/api/atendimentos/${id}`)
      .send({
        atendente: "Bruno Atualizado",
        data_atendimento: "2026-08-03",
        chamadas: 30,
        promessas: 15,
        observacao: "Atualizado com sucesso"
      });

    expect(resposta.statusCode).toBe(200);
    expect(resposta.body).toHaveProperty("data");
    expect(resposta.body.data.atendente).toBe("Bruno Atualizado");
    expect(resposta.body.data.chamadas).toBe(30);
    expect(resposta.body.data.promessas).toBe(15);

  });

});