import { Facturas } from "../models/Facturas.js";

export const existeFactura = async (numero_factura = '') => {
    if (numero_factura === '') {
        throw new Error('EL número de factura es requerido')
    }

    const factura = await Facturas.findOne({ numero_factura });

    if (factura) {
        throw new Error(`La Factura ${numero_factura} ya existe, use otra`);
    }

    return true;
}