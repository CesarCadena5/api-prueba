import express from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { crearReceptor } from "../controllers/receptorController.js";
import { validarNitReceptor, validarNombreReceptor } from "../helpers/validarDatosReceptor.js";

export const routerReceptor = express.Router();

// Crear usuario POST
routerReceptor.post('/crear', [
    check('nombre_receptor').custom(validarNombreReceptor),
    check('nit_receptor').custom(validarNitReceptor),
    validarCampos
], crearReceptor);