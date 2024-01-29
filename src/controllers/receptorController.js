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