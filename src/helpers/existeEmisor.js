import { Emisor } from "../models/Emisor.js";

export const existeEmisor = async (nombre_emisor = '') => {

    if (nombre_emisor === '') {
        throw new Error('El nombre del Emisor es requerido');
    }

    const emisor = await Emisor.findOne({ nombre_emisor });

    if (!emisor) {
        throw new Error('No existe dicho emisor, verifique');
    }

    return true
}