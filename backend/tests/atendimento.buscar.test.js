const request = require("supertest");
const app = require("../src/app");
const db = require("../src/config/database");

let atendimentoId;

describe("GET /api/atendimentos/:id", () => {

    beforeAll(async () => {

        const response = await request(app)
            .post("/api/atendimentos")
            .send({
                atendente: "Teste Busca",
                data_atendimento: "2026-08-03",
                chamadas: 10,
                promessas: 5,
                observacao: "Teste automático"
            });

        atendimentoId = response.body.data.id;

    });


    afterAll(async () => {
        await db.end();
    });


    it("deve buscar um atendimento pelo ID", async () => {

        const response = await request(app)
            .get(`/api/atendimentos/${atendimentoId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");

    });


    it("deve retornar 404 quando atendimento não existir", async () => {

        const response = await request(app)
            .get("/api/atendimentos/99999");

        expect(response.statusCode).toBe(404);

    });


    it("deve retornar 400 quando ID for inválido", async () => {

        const response = await request(app)
            .get("/api/atendimentos/abc");

        expect(response.statusCode).toBe(400);

    });

});