import { model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const facturasSchema = new Schema({
    numero_factura: {
        type: String,
        required: [true, 'Numero factura requerido'],
        trim: true,
        lowercase: true
    },
    fecha_hora: {
        type: Date,
        default: Date.now(),
        required: [true, 'fecha y hora requerido'],
        trim: true,
        lowercase: true
    },
    emisor: {
        type: Schema.Types.ObjectId,
        ref: 'Emisor'
    },
    receptor: {
        type: Schema.Types.ObjectId,
        ref: 'Receptor'
    },
    valor_antes_iva: {
        type: Number,
        required: [true, 'Valor antes de iva requerido'],
        trim: true,
        lowercase: true,
        default: 0
    },
    iva: {
        type: Number,
        required: [true, 'Iva es requerido'],
        trim: true,
        lowercase: true,
        default: 0
    },
    valor_pagar: {
        type: Number,
        required: [true, 'Valor a pagar es requerido'],
        trim: true,
        lowercase: true,
        default: 0
    },
    items_facturados: [{
        descripcion: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        valor_unitario: {
            type: Number,
            required: true
        },
        valor_total: {
            type: Number,
            required: true
        },
    }]
});

facturasSchema.plugin(mongoosePaginate);

export const Facturas = model('Facturas', facturasSchema);