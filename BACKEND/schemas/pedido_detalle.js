const detalleVentasSchema = new mongoose.Schema({
  id_venta: { type: Number, required: true },
  id_producto: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  flg_esbonificado: { type: Boolean, default: false },
  precio_unitario: Number,
  precio_unitario_sin_igv: Number,
  descuento: Number,
  subtotal_con_descuento: Number,
  monto_igv: Number,
  total: Number
}, { collection: 'detalleventas', versionKey: false });

export const DetalleVentas = mongoose.model('detalleventas', detalleVentasSchema);