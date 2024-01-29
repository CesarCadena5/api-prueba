import { model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

receptorSchema.plugin(mongoosePaginate);
export const Receptor = model('Receptor', receptorSchema);