import { Types } from "mongoose";
import { Facturas } from "../models/Facturas.js";

export const validarIdFactura = async (id = '') => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('El id de la factura, no es válido');
    }

    const factura = await Facturas.findById(id);

    if (!factura) {
        throw new Error('La factura especificada, no existe, verifique.');
    }

    return true;
}