const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("./db");
const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.execute("SELECT * FROM usuario WHERE email = ?", [
    email,
  ]);

  if (rows.length === 0)
    return res.status(401).json({ message: "Usuario no encontrado" });

  const usuario = rows[0];
  const isMatch = await bcrypt.compare(password, usuario.contrasenia);

  if (!isMatch)
    return res.status(401).json({ message: "Contraseña incorrecta" });

  req.session.user = { id: usuario.id_usuario, username: usuario.email };
  res.json({ message: "Login exitoso", user: req.session.user });
});

// Verificar sesión
app.get("/api/user", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Logout
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Sesión cerrada" });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
