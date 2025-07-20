import React from "react"; /*importando modulo */
import { productos } from "../data/productos"; /*importando datos de producto */
import ProductoCard from "../ProductoCard/ProductoCard"; /*importando card de productos */

function Home() {
  return (
    <section id="productos">
      <h2>
        <i className="fas fa-laptop"></i> Catálogo de Productos
      </h2>

      <div className="grid-productos">
        {productos.map((producto) => (
          <ProductoCard
            key={producto.id}
            id={producto.id}
            nombre={producto.nombre}
            precio={producto.precio}
            imagen={producto.imagen}
          />
        ))}
      </div>
    </section>
  );
}

export default Home;
