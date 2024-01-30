import express from "express";
import { check } from "express-validator";
import { validarToken } from "../middlewares/validarToken.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { actualizarReceptor, crearReceptor, eliminarReceptor, listarReceptores, listarReceptoresSelect, obtenerReceptor } from "../controllers/receptorController.js";
import { validarNitReceptor, validarNombreReceptor } from "../helpers/validarDatosReceptor.js";
import { validarIdEmisorReceptor } from "../helpers/ValidarIdEmisorReceptor.js";

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

// Obtener un receptor GET
routerReceptor.get('/ver/:id', [
    validarToken,
    check('id').custom((id) => validarIdEmisorReceptor(id, 'Receptor')),
    validarCampos
], obtenerReceptor);

// Actualizar receptor PUT
routerReceptor.put('/editar/:id', [
    validarToken,
    check('id').custom((id) => validarIdEmisorReceptor(id, 'Receptor')),
    validarCampos
], actualizarReceptor);

// Eliminar receptor DELETE
routerReceptor.delete('/eliminar/:id', [
    validarToken,
    check('id').custom((id) => validarIdEmisorReceptor(id, 'Receptor')),
    validarCampos
], eliminarReceptor);