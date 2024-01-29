import { model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

emisorSchema.plugin(mongoosePaginate);

export const Emisor = model('Emisor', emisorSchema);