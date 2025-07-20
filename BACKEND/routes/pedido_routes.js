import express from "express";
import * as cpedido from "../controllers/pedido_controller.js";
import * as mauth from "../middleware/auth.middleware.js"

const router= express.Router();

router.get('/', cpedido.getAll);
router.get('/:id', cpedido.getById);
router.post('/', mauth.authMiddleware(["ADMIN"]), cpedido.create);
router.put('/:id', mauth.authMiddleware(["ADMIN"]), cpedido.update);
router.delete('/:id', mauth.authMiddleware(["ADMIN"]), cpedido.deletes);


export default router;