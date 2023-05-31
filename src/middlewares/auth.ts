import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("TESTTESTTEST   1")
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log("TESTTESTTEST    2: token: ", req.header('Authorization'))
        if (!token) return res.status(401).send('Please login again');
        console.log("TESTTESTTEST    3")
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as CustomRequest).token = decoded;
        console.log("TESTTESTTEST    4")
        next();
        } catch (err) {
        res.status(401).send('Please authenticate');
        }
};