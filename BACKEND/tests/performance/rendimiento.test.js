/// <reference types="vitest" />
import request from "supertest";
import app from "../../app.js";

const NUM_SOLICITUDES = 10;

describe("Prueba de rendimiento - API de productos", () => {
  it("debería manejar múltiples solicitudes concurrentes", async () => {
    const respuestas = await Promise.all(
      Array.from({ length: NUM_SOLICITUDES }, () =>
        request(app).get("/api/v1/catalogo")
      )
    );

    respuestas.forEach((res) => {
      expect(res.status).toBe(200);
    });
  });
});
