import { useParams } from "react-router-dom";
import { productos } from "../data/productos";

export default function ProductoDetalle() {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) return <p>Producto no encontrado</p>;

  const agregarAlCarrito = () => {
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    const existente = carrito.find((p) => p.id === producto.id);

    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
  };

  return (
    <main className="main_detalleProducto">
      <div className="detalleProducto_img_container">
        <img
          className="detalleProducto_img"
          src={producto.imagen}
          alt={producto.nombre}
        />
      </div>

      <div className="descripcion_detalleProducto">
        <h1>{producto.nombre}</h1>
        <p>{producto.descripcion}</p>
        <div>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ fontSize: "24px", marginRight: "5px" }}>
              {i < producto.rating ? "⭐️" : "☆"}
            </span>
          ))}
        </div>
        <ul className="ul_detalleProducto">
          {producto.detalles.map((detalle, i) => (
            <li key={i}>{detalle}</li>
          ))}
          <h2>${producto.precio.toFixed(2)}</h2>
        </ul>
        <button className="link_detalleProducto" onClick={agregarAlCarrito}>
          Agregar al carrito
        </button>
      </div>
    </main>
  );
}
