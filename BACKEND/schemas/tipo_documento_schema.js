const tipoDocumentoSchema = new mongoose.Schema({
  id_tipo_documento: { type: Number, required: true, unique: true },
  descripcion: { type: String, required: true }
}, { collection: 'tipo_documento', versionKey: false });

export const TipoDocumento = mongoose.model('tipo_documento', tipoDocumentoSchema);