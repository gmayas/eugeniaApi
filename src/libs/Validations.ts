import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
//
export interface IPayload {
    id_user: number;
    name_user: string;
    last_name_user: string;
    email_user: string;
    apartment_num_user: string;
    success: boolean;
    iat: number;
};

export const TokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('token');
        if (!token) return res.status(401).json('Access Denied');
        const payload = jwt.verify(token, process.env['TOKEN_SECRET'] || '') as IPayload;
        // Se guarda en req paea que todas las rutas la puedan ver. 
        req.id_user = payload.id_user;
        req.name_user = payload.name_user;
        req.last_name_user = payload.last_name_user;
        req.email_user = payload.email_user;
        req.apartment_num_user = payload.apartment_num_user;
        req.success = payload.success;
        next();
    } catch (e) {
        console.log('error : ', e);
        res.status(400).send({ message: 'Toket inválido', success: false, error: e });
    }
}

export const encrypPassword = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    } catch (e) {
        console.log('Encryption error (encrypPassword)', e);
        return 'Encryption error (encrypPassword).';
    }
};

export const validatePassword = async function (password: string, QueryPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, QueryPassword);
    } catch (e) {
        console.log('Error validatePassword: false', e);
        return false;
    }
};