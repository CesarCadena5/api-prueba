import bcryptjs from 'bcryptjs';
import { generarToken } from '../helpers/generarToken.js';
import { Usuarios } from '../models/Usuarios.js';

export const crearUsuario = async (req, res) => {
    const { nombre, correo, password } = req.body;

    const usuario = new Usuarios({ nombre, correo, password });

    try {
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(password, salt);
        usuario.password = hashPassword;

        await usuario.save();

        res.json({
            msg: 'Usuario creado con éxito.',
            icon: 'success'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Ocurrió un error al registrar el usuario',
            icon: 'error'
        });
    }
};

export const actualizarUsuario = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const { id } = req.params;
    const objUsuario = {};

    if (correo !== "") {
        const usuarioBuscado = await Usuarios.findOne({ correo });

        // Verificar si el correo ya está en uso por otro usuario
        if (usuarioBuscado && usuarioBuscado._id.toString() !== id) {
            return res.status(400).json({
                msg: 'Otro usuario ya está utilizando este correo. Por favor, elija otro.'
            });
        }

        objUsuario.correo = correo;
    }


    if (password !== "") {
        const salt = bcryptjs.genSaltSync();
        objUsuario.password = bcryptjs.hashSync(password, salt);
    }

    if (nombre !== "") {
        objUsuario.nombre = nombre;
    }

    try {
        await Usuarios.findByIdAndUpdate(id, objUsuario);

        res.json({
            msg: 'Se actualizó su usuario.',
            icon: 'success'
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Hubo un error al actualizar el usuario.',
            icon: 'error'
        });
    }
};

export const obtenerUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuariodata = await Usuarios.findById(id);

        if (!usuariodata) {
            return res.status(404).json({
                msg: 'El usuario no se encontró.',
                icon: 'error'
            });
        };

        return res.json({
            msg: 'Usuario encontrado',
            icon: 'success',
            data: usuariodata
        });

    } catch (error) {
        return res.status(500).json({
            error: 'Hubo un error al obtner el usuario.',
            icon: 'error'
        });
    };
};

export const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const usuario = await Usuarios.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                error: 'Usuario y/o contraseña incorrecta.'
            });
        };

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                error: 'Usuario y/o contraseña incorrecta.'
            });
        };

        const token = await generarToken(usuario.id);

        res.json({
            nombre: usuario.nombre,
            token
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: 'Hubo un error al iniciar sesión.',
            icon: 'error'
        });
    }
};