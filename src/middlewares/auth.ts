import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) return res.status(401).send('Please login again');
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        next();
        } catch (err) {
        res.status(401).send('Please authenticate');
        }
};