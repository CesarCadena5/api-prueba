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