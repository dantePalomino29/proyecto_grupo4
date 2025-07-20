import * as modelProducto from "../models/producto_model.js";

export const getAll = async function() {
    const results = await modelProducto.getAll();
    return results;
};

export const getById = async function(idProducto) {
    const results = await modelProducto.getById(idProducto);
    return results;
};

export const create = async function(objProducto) {
    try {
        const idProducto = await modelProducto.create(objProducto);
        return idProducto;
    } catch (err) {
        console.error("Error en create:", err);
        throw err;
    }
};

export const update = async function(idProducto, objProducto) {
    try {
        const affectedRows = await modelProducto.update(idProducto, objProducto);
        return affectedRows;
    } catch (err) {
        console.error("Error en update:", err);
        throw err;
    }
};

export const deletes = async function(idProducto) {
    try {
        const affectedRows = await modelProducto.deletes(idProducto);
        return affectedRows;
    } catch (err) {
        console.error("Error en deletes:", err);
        throw err;
    }
};