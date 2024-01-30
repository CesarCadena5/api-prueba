import { Types } from "mongoose";
import { Emisor } from "../models/Emisor.js";
import { Receptor } from "../models/Receptor.js";


export const validarIdEmisorReceptor = async (id = '', tipo = 'Emisor') => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error(`El ID del ${tipo}, es inválido`);
    }

    let data = null;
    switch (tipo) {
        case 'Emisor':
            data = await Emisor.findById(id);
            break;
        case 'Receptor':
            data = await Receptor.findById(id);
            break;
    }

    if (!data) {
        throw new Error(`El ID ${id}, no existe`);
    }

    return true;
};