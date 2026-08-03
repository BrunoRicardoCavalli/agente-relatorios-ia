const request = require("supertest");
const app = require("../src/app");

describe("GET /", () => {
  it("deve retornar a mensagem da API", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      mensagem: "API do Agente de Relatórios com IA funcionando!",
    });
  });
});