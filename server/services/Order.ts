import Order, { orderSchema } from "../interfaces/Order";
import OrderModel, { OrderStatus } from "../models/Order";
import CoupomService from "./Coupom";
import Service, { ServiceError } from "./Service";

export default class OrderService extends Service<Order> {
    constructor(
        public model = new OrderModel(),
        private coupomService = new CoupomService()
    ) {
        super(model);
    }

    async create(data: Order): Promise<Order | ServiceError> {
        const parsed = orderSchema.safeParse(data);
        if (!parsed.success) {
            return {
                error: parsed.error
            }
        }
        if ( parsed.data.payment.coupom ) {
            const coupom = await this.coupomService.findByCode(parsed.data.payment.coupom);
            if (!coupom) {
                return {
                    error: 'Coupom not found'
                } as any as ServiceError;
            }

            if (coupom.expires.type === 'date' && coupom.expires.value < new Date()) {
                return {
                    error: 'Coupom expired'
                } as any as ServiceError;
            }

            if (coupom.expires.type === 'quantity' && coupom.usages! >= coupom.expires.value) {
                return {
                    error: 'Coupom expired'
                } as any as ServiceError;
            }

            if (coupom.discount.type === 'percentage') {
                data.payment.finalPrice! -= ((data.payment.total! * (coupom.discount.value / 100)) - data.payment.total!);
            }

            if (coupom.discount.type === 'amount') {
                data.payment.finalPrice! = data.payment.total! - coupom.discount.value;
            }

            
            await this.coupomService.use(coupom._id!);
        }
        const newData: Order = {
            ...data,
            payment: {
                ...data.payment,
                finalPrice: Number(data.payment.finalPrice!.toFixed(2)),
            }
        }
        const order = await this.model.create(newData);
        return order;
    }

    async read(): Promise<Order[]> {
        const orders = await this.model.read();
        return orders;
    }

    async readOne(id: string): Promise<Order | null> {
        const order = await this.model.readOne(id);
        return order;
    }

    async checkout(id: string): Promise<Order | null> {
        const order = await this.model.update(id, { 'payment.status': OrderStatus.APPROVED });
        return order;
    }
}
