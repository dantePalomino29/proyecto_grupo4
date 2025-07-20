import { Sequelize, DataTypes } from "sequelize";
import orm from "../config/sequelize.js";

export const TipoDocumento = orm.define('tipo_documento', {
    id_tipo_documento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50]
        }
    }
}, {
    freezeTableName: true,
    tableName: 'tipo_documento',
    timestamps: false
});

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
};