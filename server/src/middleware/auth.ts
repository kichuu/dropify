import { Request, Response, NextFunction } from 'express';
import '../types/express'; // Import the custom types
import { verifyToken } from '../utils/jwt';
import { IUser } from '../models/User';

export const authenticate = () => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token

    if (!token) {
      return res.status(403).json({ error: 'Access denied, token missing' });
    }

    try {
      const decoded = verifyToken(token) as IUser | null;

      if (!decoded) {
        return res.status(403).json({ error: 'Invalid or expired token' });
      }

      req.user = decoded; // Attach decoded token to request
      next(); // Call next() to pass control to the next middleware or route handler
    } catch (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
  };
};
