const vendedorSchema = new mongoose.Schema({
  id_vendedor: { type: Number, required: true, unique: true },
  nombre_vendedor: { type: String, required: true },
  telefono: { type: String },
  email_vendedor: { type: String },
  fecha_registro: { type: Date, default: Date.now }
}, { collection: 'vendedor', versionKey: false });

export const Vendedor = mongoose.model('vendedor', vendedorSchema);