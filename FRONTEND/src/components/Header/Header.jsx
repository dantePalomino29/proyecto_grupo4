import { NavLink } from "react-router-dom";
function Header() {
  return (
    <header>
      <div className="izquierda">
        <NavLink to="/">
          <h1>
            <i className="fas fa-store"></i> InkaTec
          </h1>
        </NavLink>
        <nav>
          <NavLink to="/QuienesSomos">¿Quienes Somos?</NavLink>
          <NavLink to="/Carrito">Carrito</NavLink>
        </nav>
      </div>

      <div className="acciones">
        <NavLink to="/Login">
          <button>
            <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
          </button>
        </NavLink>
        <NavLink to="/Registro">
          <button>
            <i className="fas fa-user-plus"></i> Registrarse
          </button>
        </NavLink>
      </div>
    </header>
  );
}
export default Header;
