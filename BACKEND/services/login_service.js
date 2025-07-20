import pool from "../config/bd_conection.js"

export const login = async function (email, password) {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM usuario WHERE email = ?
        `, [email]);

        if (rows.length === 0) {
            throw new Error("Usuario no registrado");
        }

        const user = rows[0];

        const now = new Date();
        if (user.bloqueado_hasta && new Date(user.bloqueado_hasta) > now) {
            throw new Error("Usuario bloqueado temporalmente");
        }

        if (user.password !== password) {
            const nuevosIntentos = user.intentos_fallidos + 1;
            const bloquear = nuevosIntentos >= 3;

            const bloqueoSql = bloquear ? ', bloqueado_hasta = NOW() + INTERVAL 5 MINUTE' : '';
            await pool.query(`
                UPDATE usuario 
                SET intentos_fallidos = ? ${bloqueoSql} 
                WHERE id_usuario = ?
            `, [nuevosIntentos, user.id_usuario]);

            throw new Error(bloquear ? "Demasiados intentos. Intenta más tarde." : "Contraseña incorrecta");
        }

        await pool.query(`
            UPDATE usuario 
            SET ultimo_login = NOW(), intentos_fallidos = 0, bloqueado_hasta = NULL 
            WHERE id_usuario = ?
        `, [user.id_usuario]);

        return {
            id_usuario: user.id_usuario,
            email: user.email,
            password: user.password,
            rol: user.rol
        };
        
    } catch (err) {
        console.error("Error en login:", err);
        throw err;
    }
};

export const findById = async function(id_usuario) {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM usuario WHERE id_usuario = ?
        `, [id_usuario]);

        if (rows.length === 0) {
            throw new Error("Usuario no encontrado");
        }

        const user = rows[0];
        return {
            id_usuario: user.id_usuario,
            email: user.email,
            password: user.password,
            rol: user.rol
        };

    } catch (err) {
        console.error("Error en findById:", err);
        throw err;
    }
};
