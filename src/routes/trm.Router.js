import express from "express";
import { validarToken } from "../middlewares/validarToken.js";
import { obtenerTrm } from "../controllers/trmController.js";

export const routerTrm = express.Router();

routerTrm.get('/obtener', validarToken, obtenerTrm)