import { describe, it, expect, vi, afterEach } from 'vitest'
import * as servicioLogin from '../../services/login_service.js'
import * as autenticacion from '../../config/auth.js'
import * as loginController from '../../controllers/login_controller.js'

describe('Controlador de Login - Pruebas Unitarias', () => {
  const solicitud = { body: { email: 'usuario@ejemplo.com', password: '123456' } };
  const respuesta = {
    json: vi.fn(),
    status: vi.fn(() => respuesta)
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debería iniciar sesión correctamente y devolver token y usuario', async () => {
    const usuarioFalso = { id_usuario: 1, email: 'usuario@ejemplo.com', rol: 'usuario' };
    vi.spyOn(servicioLogin, 'login').mockResolvedValue(usuarioFalso);
    vi.spyOn(autenticacion, 'generateToken').mockReturnValue('tokenFalso');
    vi.spyOn(autenticacion, 'generateRefreshToken').mockReturnValue('refreshTokenFalso');

    await loginController.login(solicitud, respuesta);

    expect(respuesta.json).toHaveBeenCalledOnce();
    expect(respuesta.json.mock.calls[0][0]).toHaveProperty('token');
  });
});
