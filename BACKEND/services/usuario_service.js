import * as modelUsuario from "../models/usuario_model.js";

export const getAll = async function() {
    const results = await modelUsuario.getAll();
    return results;
};

export const getById = async function(idUsuario) {
    const results = await modelUsuario.getById(idUsuario);
    console.log("luego del modelUsuario");
    return results;
};

export const create = async function(nombre, email, password, rol) {
    try {
        const idUsuario = await modelUsuario.create(nombre, email, password, rol);
        return idUsuario;
    } catch (err) {
        console.error("Error en create:", err);
        throw err;
    }
};

export const update = async function(idUsuario, ObjUsuario) {
    try {
        const affectedRows = await modelUsuario.update(idUsuario, ObjUsuario);
        return affectedRows;
    } catch (err) {
        console.error("Error en update:", err);
        throw err;
    }
};

export const deletes = async function(idUsuario) {
    try {
        const affectedRows = await modelUsuario.deletes(idUsuario);
        return affectedRows;
    } catch (err) {
        console.error("Error en deletes:", err);
        throw err;
    }
};