const ventaSchema = new mongoose.Schema({
  id_venta: { type: Number, required: true, unique: true },
  id_cliente: { type: Number, required: true, ref: 'cliente' },
  id_vendedor: { type: Number, required: true, ref: 'vendedor' },
  id_tipo_documento: { type: Number, required: true, ref: 'tipo_documento' },
  id_estado_documento: { type: Number, required: true, ref: 'ventas_estado_documento' },
  serie_documento: { type: String, required: true, minlength: 1, maxlength: 10 },
  nro_documento: { type: String, required: true, minlength: 1, maxlength: 50 },
  fecha_venta: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true },
  fecha_registro: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now }
}, {
  collection: 'ventas',
  versionKey: false
});

ventaSchema.virtual('codigo_completo').get(function () {
  return `${this.serie_documento}-${this.nro_documento}`;
});

export const Venta = mongoose.model('ventas', ventaSchema);


export const getAll = async () => {
  return await Venta.find({ activo: true }).sort('id_venta').lean();
};

export const getById = async (id) => {
  return await Venta.findOne({ id_venta: id, activo: true }).lean();
};

export const create = async (objPedido, detalle) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const max = await Venta.findOne().sort('-id_venta').select('id_venta').lean();
    const id_venta = max ? max.id_venta + 1 : 1;

    const pedido = new Venta({ id_venta, ...objPedido });
    await pedido.save({ session });

    const detalles = detalle.map(item => ({
      id_venta,
      ...item
    }));

    await DetalleVentas.insertMany(detalles, { session });
    await session.commitTransaction();
    session.endSession();
    return id_venta;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error en createPedido:", err);
    throw err;
  }
};

export const update = async (id, objPedido, detalle) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Venta.updateOne({ id_venta: id }, {
      ...objPedido,
      fecha_actualizacion: new Date()
    }, { session });

    await DetalleVentas.deleteMany({ id_venta: id }, { session });

    const nuevosDetalles = detalle.map(item => ({
      id_venta: id,
      ...item
    }));

    await DetalleVentas.insertMany(nuevosDetalles, { session });
    await session.commitTransaction();
    session.endSession();
    return true;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error en updatePedido:", err);
    throw err;
  }
};

export const deletes = async (id) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await DetalleVentas.deleteMany({ id_venta: id }, { session });
    const result = await Venta.deleteOne({ id_venta: id }, { session });
    await session.commitTransaction();
    session.endSession();
    return result.deletedCount;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error en deletePedido:", err);
    throw err;
  }
};