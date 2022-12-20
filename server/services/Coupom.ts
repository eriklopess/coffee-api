import Coupom, { coupomSchema } from "../interfaces/Coupom";
import CoupomModel from "../models/Coupom";
import Service, { ServiceError } from "./Service";

export default class CoupomService extends Service<Coupom> {
    constructor(
        public model = new CoupomModel()
    ) {
        super(model);
    }

    async create(data: Coupom): Promise<Coupom | ServiceError> {
        const parsed = coupomSchema.safeParse(data);
        if (!parsed.success) {
            return {
                error: parsed.error
            }
        }
        const coupom = await this.model.create(data);
        return coupom;
    }

    async read(): Promise<Coupom[]> {
        const coupoms = await this.model.read();
        return coupoms;
    }

    async readOne(id: string): Promise<Coupom | null> {
        const coupom = await this.model.readOne(id);
        return coupom;
    }

    async delete(id: string): Promise<Coupom | null> {
        const coupom = await this.model.delete(id);
        return coupom;
    }

    async findByCode(code: string): Promise<Coupom | null> {
        const coupom = await this.model.findByCode(code);
        return coupom;
    }

    async update(id: string, data: Coupom): Promise<Coupom | null> {
        const coupom = await this.model.update(id, data);
        return coupom;
    }

    async use(id: string): Promise<Coupom | null> {
        const coupom = await this.model.update(id, { usages: +1 });
        return coupom;
    }
}