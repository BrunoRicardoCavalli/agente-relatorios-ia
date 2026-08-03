const request = require("supertest");
const app = require("../src/app");
const db = require("../src/config/database");

describe("GET /api/atendimentos", () => {

    afterAll(async () => {
        await db.end();
    });

    it("deve retornar status 200", async () => {
        const response = await request(app)
            .get("/api/atendimentos");

        expect(response.statusCode).toBe(200);
    });


    it("deve retornar um array", async () => {
        const response = await request(app)
            .get("/api/atendimentos");

        expect(Array.isArray(response.body.data))
            .toBe(true);
    });

});