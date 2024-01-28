import { connect } from "mongoose";
import 'dotenv/config';

export const conexion = async () => {
    try {
        await connect(process.env.DB_CONEXION);
        console.log('db conectada');
    } catch (error) {
        throw new Error(error.message);
    };
};