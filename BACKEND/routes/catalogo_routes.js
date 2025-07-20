import express from "express";
import * as ccatalogo from "../controllers/catalogo_controller.js";
import * as mauth from "../middleware/auth.middleware.js"

const router= express.Router();

router.get('/', ccatalogo.getAll);
router.get('/:id', ccatalogo.getById);
router.post('/', mauth.authMiddleware(["ADMIN"]), ccatalogo.create);
router.put('/:id', mauth.authMiddleware(["ADMIN"]), ccatalogo.update);
router.delete('/:id', mauth.authMiddleware(["ADMIN"]), ccatalogo.deletes);



export default router;