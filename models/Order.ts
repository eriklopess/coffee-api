import { Document, Schema, model as createModel } from "mongoose";
import Order from "../interfaces/Order";
import MongoModel from "./Model";

export enum OrderStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    CANCELLED = 'cancelled'
}

interface OrderDocument extends Order, Document {}

const OrderSchema = new Schema({
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    payment: {
        type: {
            type: String,
            required: true,
            enum: ['credit', 'debit', 'pix']
        },
        card: {
            number: {
                type: String,
                required: false
            },
            name: {
                type: String,
                required: false
            },
            expiration: {
                type: String,
                required: false
            },
            cvv: {
                type: String,
                required: false
            },
        },
        status: {
            type: String,
            required: true
        },
        coupom: {
            type: String,
            ref: 'coupoms',
            required: false
        },
        total: {
            type: Number,
            required: false
        },
        finalPrice: {
            type: Number,
            required: false
        },
    },
    createdAt: {
        type: Date,
        required: true
    }
})

export default class OrderModel extends MongoModel<Order> {
    constructor(
        public model = createModel<OrderDocument>('orders', OrderSchema)
    ) {
        super(model);
    }

    read = async (): Promise<Order[]> => this.model.find({}, { __v: 0, payment: {
        card: 0
    } }).sort({ createdAt: -1});
}
