import 'dotenv/config';
import cors from 'cors';
import express from "express";

import { conexion } from "./db/conexion.js";
import { routerTrm } from "./routes/trm.Router.js";
import { routerEmisor } from "./routes/emisor.router.js";
import { routerFacturas } from "./routes/facturas.router.js";
import { routerUsuarios } from "./routes/usuarios.router.js";
import { routerReceptor } from "./routes/receptor.router.js";

const app = express();

// Conexión a BD
conexion();

// middlewares
app.use(cors());
app.use(express.json());

// rutas de la aplicación
app.use('/api/trm', routerTrm);
app.use('/api/emisor', routerEmisor);
app.use('/api/receptor', routerReceptor);
app.use('/api/facturas', routerFacturas);
app.use('/api/usuarios', routerUsuarios);

app.listen(process.env.PORT, () => {
    console.log('corriendo en el puerto', process.env.PORT);
});