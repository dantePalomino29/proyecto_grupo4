import * as susuario from "../services/usuario_service.js"

export const getAll = async function(req, res) {
    try {
        const usuarios = await susuario.getAll();
        res.json(usuarios || []);
    } catch (err) {
        res.status(500).json({"error": "Error obteniendo registros de usuarios."});
    }
};

export const getById = async function(req, res) {
    try {
        const usuario = await susuario.getById(req.params.id);
        res.json(usuario || {});
    } catch (err) {
        res.status(500).json({"error": "Error obteniendo usuario."});
    }
};

export const create = async function(req, res) {
    try {
        const ObjUsuario = req.body;
        const idUsuario = await susuario.create(ObjUsuario.nombre, ObjUsuario.email, ObjUsuario.password, ObjUsuario.rol);
        res.json({"idUsuario": idUsuario});
    } catch (err) {
        res.status(500).json({"error": "Error ingresando usuario."});
    }
};

export const update = async function(req, res) {
    try {
        const ObjUsuario = req.body;
        const countRegistro = await susuario.update(req.params.id, ObjUsuario);
        res.json({"countRegistro": countRegistro});
    } catch (err) {
        res.status(500).json({"error": "Error actualizando usuario."});
    }
};

export const deletes = async function(req, res) {
    try {
        const countRegistro = await susuario.deletes(req.params.id);
        res.json({"countRegistro": countRegistro});
    } catch (err) {
        res.status(500).json({"error": "Error eliminando usuario."});
    }
};

