import mongoose from 'mongoose';

// --- USUARIO SCHEMA ---
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['ADMIN', 'VENDEDOR', 'CAJERO', 'SUPERVISOR', 'LOGISTICA'], required: true },
  activo: { type: Boolean, default: true },
  fecha_registro: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  ultimo_login: { type: Date },
  intentos_fallidos: { type: Number, default: 0 },
  bloqueado_hasta: { type: Date, default: null }
}, { collection: 'usuario', versionKey: false });

usuarioSchema.pre('save', function (next) {
  this.nombre = this.nombre.toUpperCase();
  this.rol = this.rol.toUpperCase();
  next();
});

export const Usuario = mongoose.model('usuario', usuarioSchema);

export const getAll = async () => {
  return await Usuario.find({ activo: true }).lean();
};

export const login = async function (ObjUsuario) {
    const results = await Usuario.find({'email': ObjUsuario.email});
    return results;
};

export const getById = async (id) => {
  return await Usuario.findOne({ id_usuario: id, activo: true }).lean();
};

export const create = async (nombre, email, password, rol) => {
  const maxId = await Usuario.findOne().sort('-id_usuario').select('id_usuario').lean();
  const id_usuario = maxId ? maxId.id_usuario + 1 : 1;
  const usuario = new Usuario({ id_usuario, nombre, email, password, rol });
  const saved = await usuario.save();
  return saved.id_usuario;
};

export const update = async (id, obj) => {
  const result = await Usuario.updateOne({ id_usuario: id }, {
    nombre: obj.nombre,
    email: obj.email,
    password: obj.password,
    rol: obj.rol
  });
  return result.modifiedCount;
};

export const deletes = async (id) => {
  const result = await Usuario.updateOne({ id_usuario: id }, { activo: false });
  return result.modifiedCount;
};