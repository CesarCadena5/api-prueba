import { Emisor } from "../models/Emisor.js";
import { Facturas } from "../models/Facturas.js";

export const crearEmisor = async (req, res) => {
    const { nombre_emisor, nit_emisor } = req.body;

    const emisor = new Emisor({ nombre_emisor, nit_emisor });

    try {
        await emisor.save();

        res.json({
            msg: 'Emisor creado con éxito.',
            icon: 'success'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Ocurrió un error al registrar el emisor',
            icon: 'error'
        });
    }
};

export const listarEmisoresSelect = async (req, res) => {
    try {
        const emisores = await Emisor.find({});

        if (emisores.length === 0) {
            return res.status(204).json({
                msg: 'No hay emisores',
                icon: 'success',
                data: []
            });
        }

        return res.json({
            msg: 'Lista de emisores',
            icon: 'success',
            data: emisores
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            msg: 'Ocurrió un error al listar los emisores',
            icon: 'error'
        });
    }
};

export const listarEmisores = async (req, res) => {
    const { limite = 5, pagina = 1 } = req.query;

    try {
        const emisores = await Emisor.paginate({}, { limit: parseInt(limite), page: parseInt(pagina) });

        return res.json({
            msg: 'Lista de Emisores',
            icon: 'success',
            data: emisores
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            msg: 'Ocurrió un error al listar los emisores',
            icon: 'error'
        });
    }
};

export const obtenerEmisor = async (req, res, next) => {
    try {
        const id = req.params.id;
        const emisor = await Emisor.findById(id);

        if (!emisor) {
            return res.status(404).json({
                msg: 'No se encontró el emisor.',
                icon: 'error'
            });
        };

        return res.json({
            msg: 'Emisor encontrado',
            icon: 'success',
            data: emisor
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al buscar el emisor',
            icon: 'error'
        });
    }
};

export const actualizarEmisor = async (req, res, next) => {
    const objEmisor = {};
    const { id } = req.params;
    const { nombre_emisor, nit_emisor } = req.body;

    try {
        if (nombre_emisor !== "") {
            const emisorBuscado = await Emisor.findOne({ nombre_emisor });

            // Verificar si el nombre ya está en uso por otro emisor
            if (emisorBuscado && emisorBuscado._id.toString() !== id) {
                return res.status(400).json({
                    msg: 'Otro emisor ya está utilizando este nombre. Por favor, elija otro.',
                    icon: 'error'
                });
            }

            objEmisor.nombre_emisor = nombre_emisor;
        }

        if (nit_emisor !== '') {
            const nitBuscado = await Emisor.findOne({ nit_emisor });

            // Verificar si el nit ya está en uso por otro emisor
            if (nitBuscado && nitBuscado._id.toString() !== id) {
                return res.status(400).json({
                    msg: 'Otro emisor ya está utilizando este NIT. Por favor, elija otro.',
                    icon: 'error'
                });
            }
            objEmisor.nit_emisor = nit_emisor;
        }

        await Emisor.findByIdAndUpdate(id, objEmisor, { new: true });

        return res.json({
            msg: 'Emisor actualizado correctamente.',
            icon: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al actualizar el Emisor',
            icon: 'error'
        });
    }

};

export const eliminarEmisor = async (req, res, next) => {
    const { id } = req.params;
    const { pagina = 1 } = req.query;

    try {
        const emisores = await Emisor.paginate({}, { limit: 4, page: parseInt(pagina) });

        const emisorAsociado = await Facturas.find({ emisor: id });
        if (emisorAsociado.length > 0) {
            return res.status(409).json({
                msg: 'No se puede eliminar este emisor, porque está asociado a una Factura',
                icon: 'error',
                data: emisores
            });
        }

        await Emisor.findByIdAndDelete(id);

        return res.json({
            msg: 'Emisor eliminado correctamente.',
            icon: 'success',
            data: emisores
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al eliminar el emisor',
            icon: 'error'
        });
    }
};