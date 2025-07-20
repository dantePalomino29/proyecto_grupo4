import { Link } from "react-router-dom";

export default function ProductoCard({ id, nombre, precio, imagen }) {
  const agregarProducto = () => {
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    const existente = carrito.find((p) => p.id === id);

    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
  };

  return (
    <div className="producto">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p className="precio">${precio.toFixed(2)}</p>
      <div className="acciones-producto">
        <Link to={`/producto/${id}`}>
          <button className="btn-detalle">
            <i className="fas fa-eye"></i> Detalle del producto
          </button>
        </Link>
        <button className="btn-agregar" onClick={agregarProducto}>
          <i className="fas fa-cart-plus"></i> Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
