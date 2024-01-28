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