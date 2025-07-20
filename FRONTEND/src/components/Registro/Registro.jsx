import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");

  const registrarUsuario = () => {
    if (pass !== pass2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const nuevoUsuario = { nombre, email, telefono, pass };
    const usuarios = JSON.parse(sessionStorage.getItem("usuarios")) || [];

    usuarios.push(nuevoUsuario);
    sessionStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("¡Usuario registrado exitosamente!");
    navigate("/login");
  };

  return (
    <section id="registro">
      <h2>
        <i className="fas fa-user-plus"></i> Registro de Nuevo Usuario
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registrarUsuario();
        }}
      >
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Número de contacto"
          pattern="[0-9]{9}"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          required
        />
        <button type="submit">
          <i className="fas fa-user-plus"></i> Registrarse
        </button>
      </form>
    </section>
  );
}
