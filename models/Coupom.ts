import { Document, Schema, model as createModel } from "mongoose";
import Coupom from "../interfaces/Coupom";
import Model from "./Model";

interface CoupomDocument extends Coupom, Document {}

const CoupomSchema = new Schema<CoupomDocument>({
    code: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    usages: {
        type: Number,
        required: false,
        default: 0
    },
    expires: {
        type: {
            type: String,
            required: true,
            enum: ['date', 'quantity', 'infinity']
        },
        value: {
            type: Schema.Types.Mixed,
            required: false
        }
    },
    discount: {
        type: {
            type: String,
            required: true,
            enum: ['percentage', 'amount']
        },
        value: {
            type: Number,
            required: true
        }
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export default class CoupomModel extends Model<Coupom> {
    constructor(
        public model = createModel<CoupomDocument>('Coupoms', CoupomSchema)
    ) {
        super(model);
    }
    

    findByCode = async (code: string): Promise<Coupom | null> => this.model.findOne({
        code,
        status: true
    });

    findByStatus = async (status: boolean): Promise<Coupom[] | null> => this.model.find({
        status
    });
}
