import { Usuarios } from "../models/Usuarios.js";

export const correoExiste = async (correo = '') => {
    const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (correo === "") {
        throw new Error('El correo es requerido');
    }

    if (!regexCorreo.test(correo)) {
        throw new Error('El correo es inválido');
    }

    const existeCorreo = await Usuarios.findOne({ correo });

    if (existeCorreo) {
        throw new Error('El correo ya está registrado para otro usuario.');
    }
};