import { Emisor } from "../models/Emisor.js";

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