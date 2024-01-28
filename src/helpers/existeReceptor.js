import { Receptor } from "../models/Receptor.js";

export const existeReceptor = async (nombre_receptor = '') => {
    if (nombre_receptor === '') {
        throw new Error('El Nombre del Receptor es requerido');
    }

    const receptor = await Receptor.findOne({ nombre_receptor });

    if (!receptor) {
        throw new Error('No existe dicho Receptor, verifique');
    }
}