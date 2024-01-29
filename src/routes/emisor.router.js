import express from "express";
import { check } from "express-validator";
import { validarToken } from "../middlewares/validarToken.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { crearEmisor, listarEmisores, listarEmisoresSelect } from "../controllers/emisorController.js";
import { validarNitEmisor, validarNombreEmisor } from "../helpers/validarDatosEmisor.js";

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