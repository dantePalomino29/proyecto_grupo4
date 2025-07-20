import * as modelPedido from "../models/ventas_model.js";
import * as modelDetalleVentas from "../models/detalleventas_model.js";

export const getAll = async function() {
    try {
        const pedidos = await modelPedido.getAll();
        return pedidos;
    } catch (err) {
        console.error("Error en getAll:", err);
        throw err;
    }
};

export const getById = async function(idPedido) {
    try {
        const pedido = await modelPedido.getById(idPedido);
        return pedido;
    } catch (err) {
        console.error("Error en getById:", err);
        throw err;
    }
};

export const create = async function(objPedido) {
    try {
        const idPedido = await modelPedido.create(objPedido, objPedido.detalle);
        return idPedido;
    } catch (err) {
        console.error("Error en create:", err);
        throw err;
    }
};

export const update = async function(idPedido, objPedido) {
    try {
        const result = await modelPedido.update(idPedido, objPedido, objPedido.detalle);
        return result;
    } catch (err) {
        console.error("Error en update:", err);
        throw err;
    }
};

export const deletes = async function(idPedido) {
    try {
        const result = await modelPedido.deletes(idPedido);
        return result;
    } catch (err) {
        console.error("Error en deletes:", err);
        throw err;
    }
};
