import { Sequelize, DataTypes } from "sequelize";
import orm from "../config/sequelize.js";

export const Proveedor = orm.define('proveedor', {
    id_proveedor: {
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
    direccion: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [1, 150]
        }
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [1, 20]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    }
}, {
    freezeTableName: true,
    tableName: 'proveedor',
    timestamps: false
});

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
};