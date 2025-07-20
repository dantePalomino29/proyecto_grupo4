import express from "express";
import { confirmarPagoQR } from "./pagoqr_controller.js";

const router = express.Router();
router.post("/pagoqr", confirmarPagoQR);
export default router;
