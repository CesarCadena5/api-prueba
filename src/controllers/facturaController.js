import { Emisor } from "../models/Emisor.js";
import { Facturas } from "../models/Facturas.js";
import { Receptor } from "../models/Receptor.js";

export const crearFactura = async (req, res) => {
    const { numero_factura,
        fecha_hora,
        nombre_emisor,
        nit_emisor,
        nombre_receptor,
        nit_receptor,
        valor_antes_iva,
        iva,
        valor_pagar,
        items_facturados
    } = req.body;

    const emisor = await Emisor.findOne({ nombre_emisor, nit_emisor });
    const receptor = await Receptor.findOne({ nombre_receptor, nit_receptor });

    try {
        const facturaGuardar = new Facturas({
            numero_factura,
            fecha_hora,
            emisor,
            receptor,
            valor_antes_iva,
            iva,
            valor_pagar,
            items_facturados
        });

        await facturaGuardar.save();

        return res.json({
            msg: `La factura ${numero_factura}, fue guardada`,
            icon: 'success'
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Hubo un error al crear la factura.',
            icon: 'error'
        });
    };
};

export const editarFactura = async (req, res) => {
    const {
        numero_factura,
        fecha_hora,
        nombre_emisor,
        nit_emisor,
        nombre_receptor,
        nit_receptor,
        valor_antes_iva,
        iva,
        valor_pagar,
        items_facturados
    } = req.body;
    const { id } = req.params;

    let dataFactura = {};

    try {
        if (iva) dataFactura.iva = iva;
        if (valor_pagar) dataFactura.valor_pagar = valor_pagar;
        if (numero_factura) dataFactura.numero_factura = numero_factura;
        if (valor_antes_iva) dataFactura.valor_antes_iva = valor_antes_iva;
        if (items_facturados) dataFactura.items_facturados = items_facturados;

        if (fecha_hora) {
            const regexFechaHora = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

            if (!regexFechaHora.test(fecha_hora)) {
                return res.status(422).json({
                    msg: 'La fecha y hora, está mal formada (EJ: 2024-01-28 12:30:45)',
                    icon: 'error'
                })
            }

            dataFactura.fecha_hora = fecha_hora
        }

        // Por si se envia solo uno de los dos datos, buscar por ese dato
        if (nit_emisor || nombre_emisor) {
            const filtro = {};

            if (nit_emisor) filtro.nit_emisor = nit_emisor;
            if (nombre_emisor) filtro.nombre_emisor = nombre_emisor;

            const emisor = await Emisor.findOne(filtro);
            if (emisor) {
                dataFactura.emisor = emisor;
            } else {
                return res.status(422).json({
                    msg: 'No existe el Emisor, verifique',
                    icon: 'error'
                });
            }
        }

        if (nit_receptor || nombre_receptor) {
            const filtro = {};

            if (nit_receptor) filtro.nit_receptor = nit_receptor;
            if (nombre_receptor) filtro.nombre_receptor = nombre_receptor;

            const receptor = await Receptor.findOne(filtro);
            if (receptor) {
                dataFactura.receptor = receptor;
            } else {
                return res.status(422).json({
                    msg: 'No existe el receptor, verifique',
                    icon: 'error'
                });
            }
        }

        const factura = await Facturas.findByIdAndUpdate(id, dataFactura);

        return res.json({
            msg: `Se actualizó la factura ${id}`,
            icon: 'success',
            data: factura
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al actualizar la factura',
            icon: 'error'
        });
    };
};

export const verFactura = async (req, res) => {
    const { id } = req.params;

    try {
        const factura = await Facturas.findById(id).populate({ path: 'emisor' })
            .populate({ path: 'receptor' });;

        if (!factura) {
            return res.status(404).json({
                msg: 'La factura no existe.',
                icon: 'error'
            });
        };

        return res.json({
            msg: 'Factura encontrada',
            icon: 'success',
            data: factura
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            msg: 'Ocurrió un error al buscar la factura',
            icon: 'error'
        });
    }
};

export const listarFacturas = async (req, res) => {
    const { limite = 5, pagina = 1, busqueda = '', campoOrden = 'numero_factura' } = req.query;
    let facturas = null;

    const sortConfig = {};
    sortConfig[campoOrden] = 'asc';
    console.log(sortConfig);
    try {
        if (busqueda === '') {
            facturas = await Facturas.paginate({}, { limit: parseInt(limite), sort: sortConfig, page: parseInt(pagina), populate: [{ path: 'emisor' }, { path: 'receptor' }] });
        } else if (busqueda !== '') {
            facturas = await Facturas.paginate({
                $or: [
                    { numero_factura: { $regex: busqueda, $options: 'i' } },
                    { valor_antes_iva: !isNaN(busqueda) ? { $eq: busqueda } : null },
                    { iva: !isNaN(busqueda) ? { $eq: busqueda } : null },
                    { valor_pagar: !isNaN(busqueda) ? { $eq: busqueda } : null }
                ].filter(cond => cond !== null),
            }, { populate: [{ path: 'emisor' }, { path: 'receptor' }] });
        }

        return res.json({
            msg: 'Lista de Facturas',
            icon: 'success',
            data: facturas
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            msg: 'Ocurrió un error al listar las facturas',
            icon: 'error'
        });
    }
};

export const eliminarFactura = async (req, res) => {
    const { id } = req.params;
    const { pagina = 1 } = req.query;

    try {
        const facturas = await Facturas.paginate({}, { limit: 4, page: parseInt(pagina), populate: [{ path: 'emisor' }, { path: 'receptor' }] });

        await Facturas.findByIdAndDelete(id);

        return res.json({
            msg: 'Factura eliminada correctamente.',
            icon: 'success',
            data: facturas
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al eliminar la Factura',
            icon: 'error'
        });
    }
};