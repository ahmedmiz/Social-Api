import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../util/jwt';
import { TokenBlackList } from '../model/models';
const isAuth  = async (req: Request, res: any, next: NextFunction) => { 
    const authorization = req.headers['authorization'];
    if (!authorization) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const token = authorization.split(' ')[1];
    const tokenExists = await TokenBlackList.findOne({ token: token });
    if(tokenExists) res.status(401).json({ message: 'Not authorized' });
    try {

        const decoded = verifyToken(token);
        (req as any).userId = decoded.userId; 
        (req as any).userName = decoded.userName; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized' });
    }
}
export default isAuth;