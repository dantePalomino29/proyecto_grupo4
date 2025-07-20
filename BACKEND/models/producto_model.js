import { Sequelize, DataTypes } from "sequelize";
import orm from "../config/sequelize.js";
import { Marca } from "./marca_model.js";
import { Tipo } from "./tipo_model.js";
import { Categoria } from "./categoria_model.js";
import { Proveedor } from "./proveedor_model.js";

export const Producto = orm.define('producto', {
    id_producto: {
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
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    precio: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'id_categoria'
        }
    },
    id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Proveedor,
            key: 'id_proveedor'
        }
    }
}, {
    freezeTableName: true,
    tableName: 'producto',
    timestamps: false
});

Categoria.hasMany(Producto, { foreignKey: 'id_categoria' });
Producto.belongsTo(Categoria, { foreignKey: 'id_categoria' });

Proveedor.hasMany(Producto, { foreignKey: 'id_proveedor' });
Producto.belongsTo(Proveedor, { foreignKey: 'id_proveedor' });

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
};


export const getAll = async function() {
    console.log("------------model------------");
    try {
        const productos = await Producto.findAll({
            where: {
                activo: true
            }
        });
        console.log(productos);
        return productos.map(p => p.toJSON());
    } catch (err) {
        console.error("Error en getAll:", err);
        throw err;
    }
};

export const getById = async function(idProducto) {
    try {
        const producto = await Producto.findOne({
            where: {
                activo: true,
                id_producto: idProducto
            }
        });
        console.log(producto);
        return producto ? producto.toJSON() : null;
    } catch (err) {
        console.error("Error en getById:", err);
        throw err;
    }
};


export const create = async function(objProducto) {
    try {
        const producto = await Producto.create({
            nombre: objProducto.nombre,
            descripcion: objProducto.descripcion,
            precio: objProducto.precio,
            stock: objProducto.stock,
            id_categoria: objProducto.id_categoria,
            id_proveedor: objProducto.id_proveedor
        });
        console.log(producto);
        return producto.toJSON().id_producto;
    } catch (err) {
        console.error("Error en create:", err);
        throw err;
    }
};

export const update = async function(idProducto, ObjProducto) {
    try {
        const [updatedRows] = await Producto.update({
            nombre: ObjProducto.nombre,
            descripcion: ObjProducto.descripcion,
            precio: ObjProducto.precio,
            stock: ObjProducto.stock,
            id_categoria: ObjProducto.id_categoria,
            id_proveedor: ObjProducto.id_proveedor
        }, {
            where: {
                id_producto: idProducto
            }
        });

        console.log(updatedRows);
        return updatedRows;
    } catch (err) {
        console.error("Error en update:", err);
        throw err;
    }
};

export const deletes = async function(idProducto) {
    try {
        const [updatedRows] = await Producto.update({
            activo: false
        }, {
            where: {
                id_producto: idProducto
            }
        });

        console.log(updatedRows);
        return updatedRows;
    } catch (err) {
        console.error("Error en deletes:", err);
        throw err;
    }
};

