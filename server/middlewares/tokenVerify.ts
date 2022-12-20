import { NextFunction, Request, Response } from "express";
import { User } from "../interfaces/User";
import Hash from "../utils/Hash";
import Token from "../utils/Token";

const tokenVerify = (req: Request, res: Response, next: NextFunction): typeof res | void => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const tokenDecoded = Hash.decrypt(token);
        const payload = new Token().verify(tokenDecoded);
        req.user = payload as User;
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

export default tokenVerify;
