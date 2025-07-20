import { Sequelize, DataTypes } from "sequelize";
import orm from "../config/sequelize.js";
import { Cliente } from "./cliente_model.js";
import { Vendedor } from "./vendedor_model.js";
import { Usuario } from "./usuario_model.js";
import { TipoDocumento } from "./tipodocumento_model.js";
import { EstadoDocumento } from "./estadodocumento_model.js";
import { DetalleVentas } from "../models/detalleventas_model.js";
import { Producto } from "./producto_model.js";

export const Pedido = orm.define('ventas', {
    id_venta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_vendedor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_tipo_documento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_estado_documento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    serie_documento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 10]
        }
    },
    nro_documento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50]
        }
    },
    fecha_venta: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    tableName: 'ventas',
    timestamps: false
});

// Relaciones
Cliente.hasMany(Pedido, { foreignKey: 'id_cliente' });
Pedido.belongsTo(Cliente, { foreignKey: 'id_cliente' });

Vendedor.hasMany(Pedido, { foreignKey: 'id_vendedor' });
Pedido.belongsTo(Vendedor, { foreignKey: 'id_vendedor' });

TipoDocumento.hasMany(Pedido, { foreignKey: 'id_tipo_documento' });
Pedido.belongsTo(TipoDocumento, { foreignKey: 'id_tipo_documento' });

EstadoDocumento.hasMany(Pedido, { foreignKey: 'id_estado_documento' });
Pedido.belongsTo(EstadoDocumento, { foreignKey: 'id_estado_documento' });

Producto.hasMany(DetalleVentas, { foreignKey: 'id_producto' });
DetalleVentas.belongsTo(Producto, { foreignKey: 'id_producto' });

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
};

export const getAll = async function() {
    try {
        const pedidos = await Pedido.findAll({
            where: {
                activo: true
            },
            order: [['id_venta', 'ASC']]
        });
        return pedidos.map(p => p.toJSON());
    } catch (err) {
        console.error("Error en getAll:", err);
        throw err;
    }
};

export const getById = async function(idPedido) {
    try {
        const pedido = await Pedido.findOne({
            where: {
                id_venta: idPedido,
                activo: true
            }
        });
        return pedido ? pedido.toJSON() : null;
    } catch (err) {
        console.error("Error en getById:", err);
        throw err;
    }
};

export const create = async function(objPedido, detalle) {
    const transaction = await orm.transaction();

    console.log(objPedido);

    try {
        const pedido = await Pedido.create({
            id_cliente: objPedido.id_cliente,
            id_vendedor: objPedido.id_vendedor,
            id_usuario: objPedido.id_usuario,
            id_tipo_documento: objPedido.id_tipo_documento,
            id_estado_documento: objPedido.id_estado_documento,
            serie_documento: objPedido.serie_documento,
            nro_documento: objPedido.nro_documento,
            fecha_venta: objPedido.fecha_venta
        }, { transaction });

        const idVentaNueva = pedido.id_venta;

        const detalles = detalle.map(item => ({
            id_venta: idVentaNueva,
            id_producto: item.id_producto,
            cantidad: item.cantidad,
            flg_esbonificado: item.flg_esbonificado,
            precio_unitario: item.precio_unitario,
            precio_unitario_sin_igv: item.precio_unitario_sin_igv,
            descuento: item.descuento,
            subtotal_con_descuento: item.subtotal_con_descuento,
            monto_igv: item.monto_igv,
            total: item.total
        }));

        await DetalleVentas.bulkCreate(detalles, { transaction });

        await transaction.commit();
        return idVentaNueva;

    } catch (err) {
        await transaction.rollback();
        console.error("Error en create:", err);
        throw err;
    }
};

export const update = async function(idPedido, objPedido, detalle) {
    const transaction = await orm.transaction();

    try {
        await Pedido.update({
            id_cliente: objPedido.id_cliente,
            id_vendedor: objPedido.id_vendedor,
            id_usuario: objPedido.id_usuario,
            id_tipo_documento: objPedido.id_tipo_documento,
            id_estado_documento: objPedido.id_estado_documento,
            serie_documento: objPedido.serie_documento,
            nro_documento: objPedido.nro_documento,
            fecha_venta: objPedido.fecha_venta,
            monto_igv: objPedido.monto_igv,
            monto_total: objPedido.monto_total
        }, {
            where: { id_venta: idPedido },
            transaction
        });

        await DetalleVentas.destroy({
            where: { id_venta: idPedido },
            transaction
        });

        const detalles = detalle.map(item => ({
            id_venta: idPedido,
            id_producto: item.id_producto,
            cantidad: item.cantidad,
            flg_esbonificado: item.flg_esbonificado,
            precio_unitario: item.precio_unitario,
            precio_unitario_sin_igv: item.precio_unitario_sin_igv,
            descuento: item.descuento,
            subtotal_con_descuento: item.subtotal_con_descuento,
            monto_igv: item.monto_igv,
            total_producto: item.total_producto
        }));

        await DetalleVentas.bulkCreate(detalles, { transaction });

        await transaction.commit();
        return true;

    } catch (err) {
        await transaction.rollback();
        console.error("Error en update:", err);
        throw err;
    }
};

export const deletes = async function(idPedido) {
    const transaction = await orm.transaction();

    try {
        await DetalleVentas.destroy({
            where: { id_venta: idPedido },
            transaction
        });

        const result = await Pedido.destroy({
            where: { id_venta: idPedido },
            transaction
        });

        await transaction.commit();
        return result;

    } catch (err) {
        await transaction.rollback();
        console.error("Error en deletes:", err);
        throw err;
    }
};

