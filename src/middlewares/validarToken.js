import 'dotenv/config';
import jwt from "jsonwebtoken";
import { Usuarios } from "../models/Usuarios.js";

export const validarToken = async (req, res, next) => {
    try {
        const token = req.header('token');

        if (!token) {
            return res.status(401).json({
                msg: 'No existe el token.'
            });
        }

        const { id } = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                throw new Error('Error al validar el token.');
            }

            return decoded;
        });

        const usuario = await Usuarios.findById(id);

        if (!usuario) {
            return res.status(401).json({
                msg: 'No está autorizado para ejecutar esta acción.'
            });
        }

        req.usuarioAuth = usuario;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Ocurrió un error al validar el token',
            icon: 'error'
        })
    }
};