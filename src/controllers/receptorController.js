import { Facturas } from "../models/Facturas.js";
import { Receptor } from "../models/Receptor.js";

export const crearReceptor = async (req, res) => {
    const { nombre_receptor, nit_receptor } = req.body;

    const receptor = new Receptor({ nombre_receptor, nit_receptor });

    try {
        await receptor.save();

        res.json({
            msg: 'Receptor creado con éxito.',
            icon: 'success'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Ocurrió un error al registrar el receptor',
            icon: 'error'
        });
    }
};

export const listarReceptoresSelect = async (req, res) => {
    try {
        const receptores = await Receptor.find({});

        if (receptores.length === 0) {
            return res.status(204).json({
                msg: 'No hay receptores',
                icon: 'success',
                data: []
            });
        }

        return res.json({
            msg: 'Lista de receptores',
            icon: 'success',
            data: receptores
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            msg: 'Ocurrió un error al listar los receptores',
            icon: 'error'
        });
    }
};

export const listarReceptores = async (req, res) => {
    const { limite = 5, pagina = 1 } = req.query;

    try {
        const receptores = await Receptor.paginate({}, { limit: parseInt(limite), page: parseInt(pagina) });

        return res.json({
            msg: 'Lista de Receptores',
            icon: 'success',
            data: receptores
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            msg: 'Ocurrió un error al listar los receptores',
            icon: 'error'
        });
    }
};

export const obtenerReceptor = async (req, res, next) => {
    try {
        const id = req.params.id;
        const receptor = await Receptor.findById(id);

        if (!receptor) {
            return res.status(404).json({
                msg: 'No se encontró el receptor.',
                icon: 'error'
            });
        };

        return res.json({
            msg: 'Receptor encontrado',
            icon: 'success',
            data: receptor
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al buscar el receptor',
            icon: 'error'
        });
    }
};

export const actualizarReceptor = async (req, res, next) => {
    const objReceptor = {};
    const { id } = req.params;
    const { nombre_receptor, nit_receptor } = req.body;

    if (!nombre_receptor || !nit_receptor) {
        return res.status(400).json({
            msg: 'No hay ningún dato para actualizar.',
            icon: 'error'
        });
    }

    try {
        if (nombre_receptor !== "") {
            const receptorBuscado = await Receptor.findOne({ nombre_receptor });

            // Verificar si el nombre ya está en uso por otro receptor
            if (receptorBuscado && receptorBuscado._id.toString() !== id) {
                return res.status(400).json({
                    msg: 'Otro receptor ya está utilizando este nombre. Por favor, elija otro.',
                    icon: 'error'
                });
            }

            objReceptor.nombre_receptor = nombre_receptor;
        }

        if (nit_receptor !== '') {
            const nitBuscado = await Receptor.findOne({ nit_receptor });

            // Verificar si el nit ya está en uso por otro receptor
            if (nitBuscado && nitBuscado._id.toString() !== id) {
                return res.status(400).json({
                    msg: 'Otro receptor ya está utilizando este NIT. Por favor, elija otro.',
                    icon: 'error'
                });
            }
            objReceptor.nit_receptor = nit_receptor;
        }

        await Receptor.findByIdAndUpdate(id, objReceptor, { new: true });

        return res.json({
            msg: 'Receptor actualizado correctamente.',
            icon: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al actualizar el receptor',
            icon: 'error'
        });
    }

};

export const eliminarReceptor = async (req, res, next) => {
    const { id } = req.params;
    const { page = 1 } = req.query;

    try {
        const receptores = await Receptor.paginate({}, { limit: 4, page: parseInt(page) });

        const receptorAsociado = await Facturas.find({ receptor: id });
        if (receptorAsociado.length > 0) {
            return res.status(409).json({
                msg: 'No se puede eliminar este receptor, porque está asociado a una Factura',
                icon: 'error',
                data: receptores
            });
        };

        await Receptor.findByIdAndDelete(id);

        return res.json({
            msg: 'Receptor eliminado correctamente.',
            icon: 'success',
            data: receptores
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al eliminar el receptor',
            icon: 'error'
        });
    }
};