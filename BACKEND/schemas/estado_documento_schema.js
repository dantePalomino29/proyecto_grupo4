const estadoDocumentoSchema = new mongoose.Schema({
  id_estado_documento: { type: Number, required: true, unique: true },
  descripcion: { type: String, required: true }
}, { collection: 'ventas_estado_documento', versionKey: false });

export const EstadoDocumento = mongoose.model('ventas_estado_documento', estadoDocumentoSchema);