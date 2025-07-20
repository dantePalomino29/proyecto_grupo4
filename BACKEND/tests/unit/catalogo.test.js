
import { describe, it, expect, vi, afterEach } from 'vitest';
import * as servicioCatalogo from '../../services/catalogo_service.js';
import * as catalogoController from '../../controllers/catalogo_controller.js';

describe('Controlador de Catálogo - Pruebas Unitarias', () => {
  const respuesta = {
    json: vi.fn(),
    status: vi.fn(() => respuesta)
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debería obtener todos los productos correctamente', async () => {
    const productosFalsos = [
      { id_producto: 1, nombre: 'Producto 1', precio: 10, stock: 5 },
      { id_producto: 2, nombre: 'Producto 2', precio: 20, stock: 3 }
    ];

    vi.spyOn(servicioCatalogo, 'getAll').mockResolvedValue(productosFalsos);

    await catalogoController.getAll({}, respuesta);

    expect(respuesta.json).toHaveBeenCalledOnce();
    expect(respuesta.json.mock.calls[0][0]).toEqual(productosFalsos);
  });

  it('debería manejar error al obtener todos los productos', async () => {
    vi.spyOn(servicioCatalogo, 'getAll').mockImplementation(() => {
      throw new Error('Error en base de datos');
    });

    await catalogoController.getAll({}, respuesta);

    expect(respuesta.status).toHaveBeenCalledWith(500);
    expect(respuesta.json).toHaveBeenCalledOnce();
    expect(respuesta.json.mock.calls[0][0]).toHaveProperty('error');
  });

  it('debería obtener un producto por ID correctamente', async () => {
    const productoFalso = { id_producto: 1, nombre: 'Producto 1', precio: 10, stock: 5 };

    vi.spyOn(servicioCatalogo, 'getById').mockResolvedValue(productoFalso);

    await catalogoController.getById({ params: { id: 1 } }, respuesta);

    expect(respuesta.json).toHaveBeenCalledOnce();
    expect(respuesta.json.mock.calls[0][0]).toEqual(productoFalso);
  });

  it('debería manejar error al obtener producto por ID', async () => {
    vi.spyOn(servicioCatalogo, 'getById').mockImplementation(() => {
      throw new Error('Error inesperado');
    });

    await catalogoController.getById({ params: { id: 1 } }, respuesta);

    expect(respuesta.status).toHaveBeenCalledWith(500);
    expect(respuesta.json).toHaveBeenCalledOnce();
    expect(respuesta.json.mock.calls[0][0]).toHaveProperty('error');
  });
});
