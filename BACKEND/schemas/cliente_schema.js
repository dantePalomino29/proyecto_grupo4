const clienteSchema = new mongoose.Schema({
  id_cliente: { type: Number, required: true, unique: true },
  nombre_cliente: { type: String, required: true },
  numero_documento: { type: String },
  direccion: { type: String },
  telefono: { type: String },
  email_cliente: { type: String },
  fecha_registro: { type: Date, default: Date.now }
}, { collection: 'cliente', versionKey: false });

export const Cliente = mongoose.model('cliente', clienteSchema);