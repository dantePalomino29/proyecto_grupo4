const productoSchema = new mongoose.Schema({
  id_producto: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  id_categoria: { type: Number },
  id_proveedor: { type: Number },
  activo: { type: Boolean, default: true }
}, { collection: 'producto', versionKey: false });

export const Producto = mongoose.model('producto', productoSchema);