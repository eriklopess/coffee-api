import * as jwt from 'jsonwebtoken';
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
        const token = jwt.sign(payload, this.secret, { expiresIn: this.expiresIn }); // Somente assinar o token com JWT já é suficiente.
        const tokenHash = Hash.encrypt(token); // Encrypt desnecessário aqui, JWT já é seguro em si e adicionar uma camada extra de complexidade sem ganho real de segurança pode ser contraproducente.
        return tokenHash;
    }

    verify = (token: string): object | string => {
        const tokenHashDecoded = Hash.decrypt(token); // Decrypt desnecessário aqui, JWT já é seguro em si e adicionar uma camada extra de complexidade sem ganho real de segurança pode ser contraproducente.
        const tokenDecoded = jwt.verify(tokenHashDecoded, this.secret);
        return tokenDecoded;
    }
}
