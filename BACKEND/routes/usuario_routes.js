import express from "express";
import * as cusuario from "../controllers/usuario_controller.js";
import * as mauth from "../middleware/auth.middleware.js"

const router= express.Router();

router.get('/', cusuario.getAll);
router.get('/:id', cusuario.getById);
router.post('/', mauth.authMiddleware(["ADMIN"]), cusuario.create);
router.put('/:id', mauth.authMiddleware(["ADMIN"]), cusuario.update);
router.delete('/:id', mauth.authMiddleware(["ADMIN"]), cusuario.deletes);

export default router;