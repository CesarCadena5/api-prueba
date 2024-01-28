import { model, Schema } from 'mongoose';

const receptorSchema = new Schema({
    nombre_receptor: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    nit_receptor: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true
    }
});

export const Receptor = model('Receptor', receptorSchema);