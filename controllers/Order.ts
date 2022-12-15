import { Response } from "express";
import Order from "../interfaces/Order";
import { OrderStatus } from "../models/Order";
import OrderService from "../services/Order";
import ProductService from "../services/Product";
import Controller, { RequestWithBody, ResponseError } from "./Controller";

export default class OrderController extends Controller<Order> {
    constructor(
        public service = new OrderService()
    ) {
        super(service);
    }

    create = async (req: RequestWithBody<Order>, res: Response<Order | ResponseError>): Promise<typeof res> => {
        try {
            const { user } = req;
            const products = req.body.items.map(async (item) => {
                const product =  await new ProductService().readOne(item.product) as any;
                if(!product) {
                    throw new Error('Product not found.');
                }
                return { ...product._doc, quantity: item.quantity };
            });
            
            const getPrices = async () => {
                const prices = await Promise.all(products) as any;
                return prices;
            }
            const order: Order = {
                ...req.body,
                user: user!._id,
                payment : {
                    ...req.body.payment,
                    status: OrderStatus.PENDING,
                    total: (await getPrices()).reduce((acc: number, curr: any) => acc + (curr.price * curr.quantity), 0),
                    finalPrice: 0
                },
                createdAt: new Date(),
            }
            
            const data = await this.service.create(order);

            if ('error' in data) {
                return res.status(400).json(data);
            }

            data.payment.card = {
                number: `**** **** **** ${data.payment.card!.number!.slice(-4)}`,
                expiration: undefined,
                cvv: undefined,
                name: data.payment.card!.name
            };

            return res.status(201).json(data);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: this.errors.internal });
        }
    }

    read = async (req: RequestWithBody<Order>, res: Response<Order[] | ResponseError>): Promise<typeof res> => {
        try {
            const data = await this.service.read();
            return res.json(data);
        } catch (error) {
            console.log(error);
            
            return res.status(400).json({ error: this.errors.internal });
        }
    }

    readOne = async (req: RequestWithBody<Order>, res: Response<Order | ResponseError>): Promise<typeof res> => {
        try {
            const data = await this.service.readOne(req.params.id);
            if(!data) {
                return res.status(404).json({ error: this.errors.notFound });
            }
            return res.json(data);
        } catch (error) {
            return res.status(400).json({ error: this.errors.internal });
        }
    }

    update = async (req: RequestWithBody<Order>, res: Response<Order | ResponseError>): Promise<typeof res> => {
        try {
            const data = await this.service.update(req.params.id, req.body);
            if(!data) {
                return res.status(404).json({ error: this.errors.notFound });
            }
            return res.json(data);
        } catch (error) {
            return res.status(400).json({ error: this.errors.internal });
        }
    }

    delete = async (req: RequestWithBody<Order>, res: Response<Order | ResponseError>): Promise<typeof res> => {
        try {
            const data = await this.service.delete(req.params.id);
            if(!data) {
                return res.status(404).json({ error: this.errors.notFound });
            }
            return res.json(data);
        } catch (error) {
            return res.status(400).json({ error: this.errors.internal });
        }
    }

    checkout = async (req: RequestWithBody<Order>, res: Response<Order | ResponseError>): Promise<typeof res> => {
        try {
            const data = await this.service.checkout(req.params.id);
            if(!data) {
                return res.status(404).json({ error: this.errors.notFound });
            }
            return res.json(data);
        } catch (error) {
            return res.status(400).json({ error: this.errors.internal });
        }
    }
}