import { Emisor } from "../models/Emisor.js";

export const validarNombreEmisor = async (nombre_emisor = '') => {
    if (nombre_emisor == '') {
        throw new Error('El nombre del Emisor es requerido');
    }

    const emisor = await Emisor.findOne({ nombre_emisor });

    if (emisor) {
        throw new Error('El nombre del Emisor ya está registrado, verifique');
    }
}

export const validarNitEmisor = async (nit_emisor = '') => {
    if (nit_emisor == '') {
        throw new Error('El NIT del Emisor es requerido');
    }

    const emisor = await Emisor.findOne({ nit_emisor });

    if (emisor) {
        throw new Error('El nit del Emisor ya está registrado, verifique');
    }
}