
import { describe, it, expect, vi, afterEach } from 'vitest';
import * as servicioUsuario from '../../services/usuario_service.js';
import * as usuarioController from '../../controllers/usuario_controller.js';

describe('Controlador de Usuario - Pruebas Unitarias', () => {
  const solicitud = {
    body: {
      nombre: 'Juan Pérez',
      email: 'juan@correo.com',
      password: '123456',
      rol: 'cliente'
    }
  };

  const respuesta = {
    json: vi.fn(),
    status: vi.fn(() => respuesta)
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debería registrar un nuevo usuario correctamente', async () => {
    vi.spyOn(servicioUsuario, 'create').mockResolvedValue(10); // simula id nuevo

    await usuarioController.create(solicitud, respuesta);

    expect(respuesta.json).toHaveBeenCalledOnce();
    expect(respuesta.json.mock.calls[0][0]).toHaveProperty('idUsuario', 10);
  });

  it('debería manejar errores al registrar un usuario', async () => {
    vi.spyOn(servicioUsuario, 'create').mockImplementation(() => {
      throw new Error('Error de registro');
    });

    await usuarioController.create(solicitud, respuesta);

    expect(respuesta.status).toHaveBeenCalledWith(500);
    expect(respuesta.json).toHaveBeenCalledOnce();
    expect(respuesta.json.mock.calls[0][0]).toHaveProperty('error');
  });
});
