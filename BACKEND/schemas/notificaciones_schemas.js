
// --- NOTIFICACIÓN SCHEMA ---
const notificacionSchema = new mongoose.Schema({
  id_notificacion: { type: Number, required: true, unique: true },
  email: { type: String, required: true },
  mensaje: { type: String, required: true },
  tipo: {
    type: String,
    enum: ['PEDIDO_NUEVO', 'PAGO_CONFIRMADO'],
    required: true
  },
  leido: { type: Boolean, default: false },
  fecha_envio: { type: Date, default: Date.now }
}, {
  collection: 'notificaciones',
  versionKey: false
});

export const Notificacion = mongoose.model('notificaciones', notificacionSchema);

export const getAllNotificaciones = async () => {
  return await Notificacion.find().sort('-fecha_envio').lean();
};

export const createNotificacion = async (email, mensaje, tipo) => {
  const max = await Notificacion.findOne().sort('-id_notificacion').select('id_notificacion').lean();
  const id_notificacion = max ? max.id_notificacion + 1 : 1;

  const nueva = new Notificacion({ id_notificacion, email, mensaje, tipo });
  const result = await nueva.save();

  const io = getIO();
  io.to(email).emit('nuevaNotificacion', result.toObject());

  return result.toObject();
};

export const marcarLeida = async (id_notificacion) => {
  const result = await Notificacion.updateOne({ id_notificacion }, { leido: true });
  return result.modifiedCount;
};