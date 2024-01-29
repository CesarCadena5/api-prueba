import express from "express";
import { check } from "express-validator";
import { validarToken } from "../middlewares/validarToken.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { crearReceptor, listarReceptores, listarReceptoresSelect } from "../controllers/receptorController.js";
import { validarNitReceptor, validarNombreReceptor } from "../helpers/validarDatosReceptor.js";

export const routerReceptor = express.Router();

// Crear receptor POST
routerReceptor.post('/crear', [
    validarToken,
    check('nombre_receptor').custom(validarNombreReceptor),
    check('nit_receptor').custom(validarNitReceptor),
    validarCampos
], crearReceptor);

// Lista receptores select de facturas
routerReceptor.get('/lista', [
    validarToken,
], listarReceptoresSelect);

// Lista receptores
routerReceptor.get('/listar', [
    validarToken,
], listarReceptores);