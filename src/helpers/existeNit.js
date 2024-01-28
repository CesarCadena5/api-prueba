import { Emisor } from "../models/Emisor.js";
import { Receptor } from "../models/Receptor.js";

export const existeNit = async (nit, tipo) => {
    if (nit === '') {
        throw new Error(`El nit del ${tipo}, es requerido`);
    }

    let entidad = null
    switch (tipo) {
        case 'receptor':
            entidad = await Receptor.findOne({ nit_receptor: nit });
            break;

        case 'emisor':
            entidad = await Emisor.findOne({ nit_emisor: nit });
            break;
    }

    if (!entidad) {
        throw new Error(`El nit del ${tipo}, no existe, verifique.`);
    }
}