import { Sequelize, DataTypes } from "sequelize";
import orm from "../config/sequelize.js";

export const Vendedor = orm.define('vendedor', {
    id_vendedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_vendedor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    tipo_documento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20]
        }
    },
    numero_documento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20]
        }
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [1, 20]
        }
    },
    email_vendedor: {
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
    tableName: 'vendedor',
    timestamps: false
});

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
};