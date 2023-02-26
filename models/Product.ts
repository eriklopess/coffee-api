import { Schema, model as createModel, Document } from 'mongoose';
import { Product } from '../interfaces/Product';
import Mongo from './Model';

interface ProductDocument extends Product, Document {}

const ProductSchema = new Schema<ProductDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
});

export default class ProductModel extends Mongo<Product> {
    constructor(
        public model = createModel<ProductDocument>('products', ProductSchema)
    ) {
        super(model);
    }

        readOne = async (id: string): Promise<Product | null> => {
        return this.model.findOne({ _id: id, active: true }, { __v: 0, active: 0 });
    }
}
