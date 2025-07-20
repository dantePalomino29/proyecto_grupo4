import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const iniciarSesion = () => {
    const usuarios = JSON.parse(sessionStorage.getItem("usuarios")) || [];
    const encontrado = usuarios.find(
      (u) => u.email === email && u.pass === pass
    );

    if (encontrado) {
      sessionStorage.setItem("usuarioActual", JSON.stringify(encontrado));
      alert("Inicio de sesión exitoso");
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <section id="login">
      <h2>
        <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          iniciarSesion();
        }}
      >
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <button type="submit">
          <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
        </button>
      </form>
    </section>
  );
}
