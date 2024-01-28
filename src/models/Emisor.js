import { model, Schema } from 'mongoose';

const emisorSchema = new Schema({
    nombre_emisor: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    nit_emisor: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true
    }
});

export const Emisor = model('Emisor', emisorSchema);