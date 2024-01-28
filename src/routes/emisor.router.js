import express from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { crearEmisor } from "../controllers/emisorController.js";
import { validarNitEmisor, validarNombreEmisor } from "../helpers/validarDatosEmisor.js";

export const routerEmisor = express.Router();

// Crear usuario POST
routerEmisor.post('/crear', [
    check('nombre_emisor').custom(validarNombreEmisor),
    check('nit_emisor').custom(validarNitEmisor),
    validarCampos
], crearEmisor);