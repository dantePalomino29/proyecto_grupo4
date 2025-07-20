import { Pedido } from "./ventas_model.js";
import { DetalleVentas } from "./detalleventas_model.js";
import { Producto } from "./producto_model.js";
import { Cliente } from "./cliente_model.js";
import { Vendedor } from "./vendedor_model.js";
import { Usuario } from "./usuario_model.js";
import { TipoDocumento } from "./tipodocumento_model.js";
import { EstadoDocumento } from "./estadodocumento_model.js";

// Relaciones de Pedido (Ventas)
Cliente.hasMany(Pedido, { foreignKey: 'id_cliente' });
Pedido.belongsTo(Cliente, { foreignKey: 'id_cliente' });

Vendedor.hasMany(Pedido, { foreignKey: 'id_vendedor' });
Pedido.belongsTo(Vendedor, { foreignKey: 'id_vendedor' });

Usuario.hasMany(Pedido, { foreignKey: 'id_usuario' });
Pedido.belongsTo(Usuario, { foreignKey: 'id_usuario' });

TipoDocumento.hasMany(Pedido, { foreignKey: 'id_tipo_documento' });
Pedido.belongsTo(TipoDocumento, { foreignKey: 'id_tipo_documento' });

EstadoDocumento.hasMany(Pedido, { foreignKey: 'id_estado_documento' });
Pedido.belongsTo(EstadoDocumento, { foreignKey: 'id_estado_documento' });

// Relaciones de DetalleVentas
Pedido.hasMany(DetalleVentas, { foreignKey: 'id_venta' });
DetalleVentas.belongsTo(Pedido, { foreignKey: 'id_venta' });

Producto.hasMany(DetalleVentas, { foreignKey: 'id_producto' });
DetalleVentas.belongsTo(Producto, { foreignKey: 'id_producto' });

export {
    Pedido,
    DetalleVentas,
    Producto,
    Cliente,
    Vendedor,
    Usuario,
    TipoDocumento,
    EstadoDocumento
};
