import express from "express";
import { check } from "express-validator";
import { existeEmisor } from "../helpers/existeEmisor.js";
import { validarFecha } from "../helpers/validarFecha.js";
import { validarToken } from "../middlewares/validarToken.js";
import { existeReceptor } from "../helpers/existeReceptor.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { crearFactura, editarFactura, listarFacturas, verFactura } from "../controllers/facturaController.js";
import { existeNit } from "../helpers/existeNit.js";
import { validarIdFactura } from "../helpers/validarIdFactura.js";
import { existeFactura } from "../helpers/existeFactura.js";

export const routerFacturas = express.Router();

// Validar token
// routerPrincipal.post('/validar-token', validarToken, (req, res, next) => {
//     return res.json({
//         ok: true,
//         usuario: req.usuarioAuth
//     });
// });

// Agregar proveedor POST
// routerPrincipal.post('/proveedores', [
//     validarToken,
//     check('nombre', 'El nombre es requerido.').notEmpty().escape(),
//     check('celular', 'El celular es obligatorio.').notEmpty().escape(),
//     validarCampos
// ], agregarProveedor);

// // Obtener proveedores GET
// routerPrincipal.get('/proveedores', validarToken, listarProveedores);

// // Obtener un proveedor GET
// routerPrincipal.get('/proveedor/:id', [
//     validarToken,
//     check('id').custom((id) => validarId(id)),
//     validarCampos
// ], obtenerProveedor);

// // Actualizar proveedor PUT
// routerPrincipal.put('/proveedor/:id', [
//     validarToken,
//     check('id').custom((id) => validarId(id)),
//     validarCampos
// ], actualizarProveedor);

// // Eliminar proveedor DELETE
// routerPrincipal.delete('/proveedor/:id', [
//     validarToken,
//     check('id').custom((id) => validarId(id)),
//     validarCampos
// ], eliminarProveedor);


// Facturas

// Crear factura POST
routerFacturas.post('/crear', [
    validarToken,
    check('numero_factura').custom(existeFactura),
    check('fecha_hora').custom(validarFecha),
    check('nombre_emisor').custom(existeEmisor),
    check('nit_emisor').custom((nit) => existeNit(nit, 'emisor')),
    check('nombre_receptor').custom(existeReceptor),
    check('nit_receptor').custom((nit) => existeNit(nit, 'receptor')),
    check('valor_antes_iva', 'El valor antes del iva, debe ser números').isNumeric({ min: 1 }),
    check('iva', 'El iva, debe ser números').isNumeric({ min: 1 }),
    check('valor_pagar', 'El valor a pagar, debe ser números').isNumeric({ min: 1 }),
    check('items_facturados').isArray({ min: 1 }),
    validarCampos
], crearFactura);

routerFacturas.put('/editar/:id', [
    validarToken,
    check('id').custom(validarIdFactura),
    validarCampos
], editarFactura);

routerFacturas.get('/ver/:id', [
    validarToken,
    check('id').custom(validarIdFactura),
    validarCampos
], verFactura);

routerFacturas.get('/lista', [
    validarToken,
], listarFacturas);

