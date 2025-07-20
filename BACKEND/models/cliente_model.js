import { Sequelize, DataTypes } from "sequelize";
import orm from "../config/sequelize.js";

export const Cliente = orm.define('cliente', {
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_cliente: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    id_tipo_documento_identidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numero_documento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20]
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
    email_cliente: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    freezeTableName: true,
    tableName: 'cliente',
    timestamps: false
});

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
};