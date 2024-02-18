import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import productRouter from '../routers/product';
import connectToDatabase from './connection';
import userRouter from '../routers/user';
import orderRouter from '../routers/order';
import coupomRouter from '../routers/coupom';
import csrf from 'csurf';

export default class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(csrf({ cookie: true }));
        this.app.use(helmet());
        this.app.disable('x-powered-by');
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use((_req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            next();
        });
        this.routes();
    }

    private routes(): void {
        this.app.use('/api/product', productRouter);
        this.app.use('/api/user', userRouter);
        this.app.use('/api/order', orderRouter);
        this.app.use('/api/coupom', coupomRouter);
    }

    public startServer(port: string | number): void {
        connectToDatabase()
        this.app.listen(port, (): void => {
            console.log(`Server running on port ${port}`);
        })
    }

    public getApp(): express.Application {
        return this.app;
    }
}