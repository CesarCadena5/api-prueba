import express from "express";
import { check } from "express-validator";
import { correoExiste } from "../helpers/correoExiste.js";
import { validarCorreo } from "../helpers/validarCorreo.js";
import { validarToken } from "../middlewares/validarToken.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { actualizarUsuario, crearUsuario, login, obtenerUsuario } from "../controllers/usuarioController.js";
import { validarIdUsuario } from "../helpers/validarIdUsuario.js";

export const routerUsuarios = express.Router();

// Crear usuario POST
routerUsuarios.post('/registro', [
    check('nombre', '¡Nombre de mínimo 4 carácteres!').isLength({ min: 4, max: 30 }).escape(),
    check('correo').custom(correoExiste),
    check('password', 'Contraseña de mínimo 6 carácteres').isLength({ min: 6 }).escape(),
    validarCampos
], crearUsuario);

// Actualizar usuario PUT
routerUsuarios.put('/actualizar/:id', [
    validarToken,
    check('id').custom(validarIdUsuario),
    validarCampos
], actualizarUsuario);

routerUsuarios.get('/obtener/:id', [
    validarToken,
    check('id').custom(validarIdUsuario),
    validarCampos
], obtenerUsuario);

// Crear sesión usuario POST
routerUsuarios.post('/login', [
    check('correo').custom(validarCorreo),
    check('password', 'La contraseña es requerida').notEmpty().escape(),
    validarCampos
], login);