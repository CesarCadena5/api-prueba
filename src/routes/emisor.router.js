import express from "express";
import { check } from "express-validator";
import { validarToken } from "../middlewares/validarToken.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarIdEmisorReceptor } from "../helpers/ValidarIdEmisorReceptor.js";
import { validarNitEmisor, validarNombreEmisor } from "../helpers/validarDatosEmisor.js";
import { actualizarEmisor, crearEmisor, eliminarEmisor, listarEmisores, listarEmisoresSelect, obtenerEmisor } from "../controllers/emisorController.js";

export const routerEmisor = express.Router();

// Crear emisor POST
routerEmisor.post('/crear', [
    validarToken,
    check('nombre_emisor').custom(validarNombreEmisor),
    check('nit_emisor').custom(validarNitEmisor),
    validarCampos
], crearEmisor);

// Lista emisores para el select de facturas
routerEmisor.get('/lista', [
    validarToken,
], listarEmisoresSelect);

// Lista emisores
routerEmisor.get('/listar', [
    validarToken,
], listarEmisores);

// Obtener un emisor GET
routerEmisor.get('/ver/:id', [
    validarToken,
    check('id').custom((id) => validarIdEmisorReceptor(id)),
    validarCampos
], obtenerEmisor);

// Actualizar emisor PUT
routerEmisor.put('/editar/:id', [
    validarToken,
    check('id').custom((id) => validarIdEmisorReceptor(id)),
    validarCampos
], actualizarEmisor);

// Eliminar emisor DELETE
routerEmisor.delete('/eliminar/:id', [
    validarToken,
    check('id').custom((id) => validarIdEmisorReceptor(id)),
    validarCampos
], eliminarEmisor);