import { Document, Schema, model as createModel } from 'mongoose';
import { User } from '../interfaces/User';
import Model from './Model';

interface UserDocument extends User, Document {}

const UserSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    role: { type: String, required: true, default: 'user' },
});

export default class UserModel extends Model<User> {
    constructor(
        public model = createModel<UserDocument>('users', UserSchema)
    ) {
        super(model);
    }

    readOne = async (id: string): Promise<User> => {
        return await this.model.findOne({ _id: id, active: true }, { password: 0, active: 0, __v: 0 }) as any as User;
    }

    delete = async (id: string): Promise<User> => {
        return this.model.findByIdAndUpdate(id, { active: false }) as any as User;
    }
}
