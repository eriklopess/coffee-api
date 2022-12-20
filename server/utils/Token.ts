import * as jwt from 'jsonwebtoken';
import crypto from 'crypto-js'
import Hash from './Hash';

export type tokenDecoded = {
    _id: string;
    email: string;
    role: string;
}

export default class Token {
    private secret: string;
    private expiresIn: string;

    constructor(
        secret: string = process.env.JWT_SECRET!,
        expiresIn: string = process.env.JWT_EXPIRES_IN!
    ) {
        this.secret = secret
        this.expiresIn = expiresIn
    }

    sign = (payload: object): string => {
        const token = jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
        const tokenHash = Hash.encrypt(token);
        return tokenHash;
    }

    verify = (token: string): object | string => {
        const tokenHashDecoded = Hash.decrypt(token);
        const tokenDecoded = jwt.verify(tokenHashDecoded, this.secret);
        return tokenDecoded;
    }
}
