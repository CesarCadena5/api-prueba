import { Types } from "mongoose";
import { Usuarios } from "../models/Usuarios.js";

export const validarIdUsuario = async (id = '') => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('El id del usuario, no es válido');
    }

    const usuario = await Usuarios.findById(id);

    if (!usuario) {
        throw new Error('El usuario especificado, no existe, verifique.');
    }

    return true;
};  