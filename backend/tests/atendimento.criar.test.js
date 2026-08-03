const request = require("supertest");
const app = require("../src/app");
const db = require("../src/config/database");

describe("POST /api/atendimentos", () => {

    afterAll(async () => {
        await db.end();
    });

    it("deve criar um atendimento", async () => {

        const response = await request(app)
            .post("/api/atendimentos")
            .send({
                atendente: "Bruno",
                data_atendimento: "2026-08-03",
                chamadas: 10,
                promessas: 5,
                observacao: "Teste automatizado"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("data");

    });

});