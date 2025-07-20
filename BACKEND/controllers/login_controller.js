import * as slogin from "../services/login_service.js"
import * as auth from "../config/auth.js"

export const login = async function(req, res) {
    try {
        const ObjLogin = req.body;
        const idUsuarioLogin = await slogin.login(ObjLogin.email, ObjLogin.password);
        const token = auth.generateToken(idUsuarioLogin);
        const refreshToken = auth.generateRefreshToken(idUsuarioLogin);

        res.json({
            token, 
            refreshToken, 
            "user": {
                "id_usuario": idUsuarioLogin.id_usuario,
                "email": idUsuarioLogin.email,
                "rol": idUsuarioLogin.rol
            }
        });

    } catch (err) {
        console.error("Error en login:", err);
        res.status(500).json({"error": "Error ingresando credenciales."});
    }
};


export const refreshToken = async function(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({"error": "Refresh token requerido"});
    }

    try {
        // Verificar refresh token
        const decoded = auth.verifyRefreshToken(refreshToken);
        console.log("Token decodificado:", decoded);
        const usuario = await slogin.findById(decoded.id_usuario);
        const token = auth.generateToken(usuario);
        console.log("Nuevo token generado:", token);

        res.json({
            token, 
            "user": {
                "id_usuario": usuario.id_usuario,
                "email": usuario.email,
                "rol": usuario.rol
            }
        });

    } catch (error) {
        console.error("Error en refreshToken:", error);
        res.status(error.name === 'TokenExpiredError' ? 401 : 403).json({ error: error.message });
    }
};