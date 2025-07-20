import { Sequelize, DataTypes } from "sequelize";
import orm from "../config/sequelize.js";

export const DetalleVentas = orm.define('detalleventas', {
    id_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_venta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    flg_esbonificado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    precio_unitario_sin_igv: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    descuento: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    subtotal_con_descuento: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    monto_igv: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    }
}, {
    freezeTableName: true,
    tableName: 'detalleventas',
    timestamps: false
});

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
};