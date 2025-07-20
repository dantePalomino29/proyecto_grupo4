import request from "supertest";
import app from "../../app.js";

describe("Pruebas de integración - Registro y Login", () => {
  const user = {
    nombre: "Jeremy",
    apellidos: "Servan",
    correo: "jeremy@test.com",
    telefono: "999999999",
    usuario: "jeremy",
    password: "pass123"
  };

  test("Debe registrar un nuevo usuario", async () => {
    const res = await request(app).post("/usuario/registro").send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/Cuenta creada/i);
  });

  test("Debe loguear al usuario registrado", async () => {
    const res = await request(app).post("/login").send({
      usuario: user.usuario,
      password: user.password
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Bienvenido/i);
  });
});
