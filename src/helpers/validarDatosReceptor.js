import { Receptor } from "../models/Receptor.js";

export const validarNombreReceptor = async (nombre_receptor = '') => {
    if (nombre_receptor == '') {
        throw new Error('El nombre del Receptor es requerido');
    }

    const receptor = await Receptor.findOne({ nombre_receptor });

    if (receptor) {
        throw new Error('El nombre del Receptor ya está registrado, verifique');
    }
}

export const validarNitReceptor = async (nit_receptor = '') => {
    if (nit_receptor == '') {
        throw new Error('El NIT del Receptor es requerido');
    }

    const receptor = await Receptor.findOne({ nit_receptor });

    if (receptor) {
        throw new Error('El nit del Receptor ya está registrado, verifique');
    }
}