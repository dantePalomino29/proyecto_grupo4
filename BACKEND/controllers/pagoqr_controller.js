import { createNotificacion } from "./notificacion.schema.js";

export const confirmarPagoQR = async (req, res) => {
  const { email, mensaje } = req.body;
  try {
    const notificacion = await createNotificacion(
      "logistica@tienda.com",
      mensaje,
      "PAGO_CONFIRMADO"
    );
    res.status(200).json(notificacion);
  } catch (err) {
    console.error("Error en pagoQR:", err);
    res.status(500).json({ error: "Error interno" });
  }
};
