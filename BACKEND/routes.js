import express from "express";
import rcatalogo from "./routes/catalogo_routes.js"
import rusuario from "./routes/usuario_routes.js"
import rpedido from "./routes/pedido_routes.js"
import rlogin from "./routes/login_routes.js"

const router= express.Router();

router.use('/catalogo', rcatalogo);
router.use('/usuario', rusuario);
router.use('/pedido', rpedido);
router.use('/login', rlogin);
app.use(express.static('public'));



export default router;