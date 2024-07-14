import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/express';

export const authenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
    req.user = { username: decoded.username };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", details: error.message });
  }
};
