import express from "express";
import * as clogin from "../controllers/login_controller.js";

const router= express.Router();

router.post('/', clogin.login);

router.post('/refresh-token', clogin.refreshToken);

export default router;