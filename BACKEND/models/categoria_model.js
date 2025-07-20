import { Sequelize, DataTypes } from "sequelize";
import orm from "../config/sequelize.js";

export const Categoria = orm.define('categoria', {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_categoria: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50]
        }
    }
}, {
    freezeTableName: true,
    tableName: 'categoria',
    timestamps: false
});

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
}