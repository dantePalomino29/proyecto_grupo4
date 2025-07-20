import { Sequelize, DataTypes } from "sequelize";
import orm from "../config/sequelize.js";

export const Usuario = orm.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50]
        }
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    freezeTableName: true,
    tableName: 'usuario',
    timestamps: false
});

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
};

export const getAll = async function() {
    try {
        const usuarios = await Usuario.findAll({
            where: {
                activo: true
            }
        });
        // console.log(usuarios);
        return usuarios.map(u => u.toJSON());
    } catch (err) {
        console.error("Error en getAll:", err);
        throw err;
    }
};

export const getById = async function(idUsuario) {
    try {
        const usuario = await Usuario.findOne({
            where: {
                activo: true,
                id_usuario: idUsuario
            }
        });
        // console.log(usuario);
        return usuario ? usuario.toJSON() : null;
    } catch (err) {
        console.error("Error en getById:", err);
        throw err;
    }
};

export const create = async function(nombre, email, password, rol) {
    try {
        const usuario = await Usuario.create({
            nombre,
            email,
            password,
            rol
        });
        // console.log(usuario);
        return usuario.toJSON().id_usuario;
    } catch (err) {
        console.error("Error en create:", err);
        throw err;
    }
};

export const update = async function(idUsuario, ObjUsuario) {
    try {
        const [updatedRows] = await Usuario.update({
            nombre: ObjUsuario.nombre,
            email: ObjUsuario.email,
            password: ObjUsuario.password,
            rol: ObjUsuario.rol
        }, {
            where: {
                id_usuario: idUsuario
            }
        });

        // console.log(updatedRows);
        return updatedRows;
    } catch (err) {
        console.error("Error en update:", err);
        throw err;
    }
};

export const deletes = async function(idUsuario) {
    try {
        const [updatedRows] = await Usuario.update({
            activo: false
        }, {
            where: {
                id_usuario: idUsuario
            }
        });

        // console.log(updatedRows);
        return updatedRows;
    } catch (err) {
        console.error("Error en deletes:", err);
        throw err;
    }
};