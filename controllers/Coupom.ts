import Coupom from "../interfaces/Coupom";
import Controller, { RequestWithBody, ResponseError } from "./Controller";
import CoupomService from './../services/Coupom';
import { Request, Response } from "express";

export default class CoupomController extends Controller<Coupom> {
    constructor(
        public service = new CoupomService()
    ) {
        super(service);
    }

    create = async (req: RequestWithBody<Coupom>, res: Response<Coupom | ResponseError>): Promise<typeof res> => {
        try {
            req.body = {
                ...req.body,
                createdAt: new Date(),
                status: true,
                usages: 0,
            }
            const data = await this.service.create(req.body);
            if ('error' in data) {
                return res.status(400).json(data);
            }
            return res.status(201).json(data);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: this.errors.internal });
        }
    }

    read = async (_req: Request, res: Response<Coupom[] | ResponseError>): Promise<typeof res> => {
        try {
            const data = await this.service.read();
            return res.json(data);
        } catch (error) {
            return res.status(400).json({ error: this.errors.internal });
        }
    }

    readOne = async (req: Request, res: Response<Coupom | ResponseError>): Promise<typeof res> => {
        try {
            const data = await this.service.readOne(req.params.id);
            if (!data) {
                return res.status(404).json({ error: this.errors.notFound });
            }
            return res.json(data);
        } catch (error) {
            return res.status(400).json({ error: this.errors.internal });
        }
    }

    update = async (req: Request, res: Response<Coupom | ResponseError>): Promise<typeof res> => {
        try {
            const data = await this.service.update(req.params.id, req.body);
            if (!data) {
                return res.status(404).json({ error: this.errors.notFound });
            }
            return res.json(data);
        } catch (error) {
            return res.status(400).json({ error: this.errors.internal });
        }
    }

    delete = async (req: Request, res: Response<Coupom | ResponseError>): Promise<typeof res> => {
        try {
            const data = await this.service.delete(req.params.id);
            if (!data) {
                return res.status(404).json({ error: this.errors.notFound });
            }
            return res.json(data);
        } catch (error) {
            return res.status(400).json({ error: this.errors.internal });
        }
    }        
}