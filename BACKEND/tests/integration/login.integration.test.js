import request from "supertest";
import app from "../../app.js";

describe("Prueba de integración - Login", () => {
  test("Login correcto con credenciales válidas", async () => {
    const res = await request(app).post("/login").send({
      usuario: "jeremyTest",
      password: "pass123"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Bienvenido/i);
  });
});
