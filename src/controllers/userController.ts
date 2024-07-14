import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Incluir el username en el token
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error: err });
    }
};


export const logout = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Logout successful. Please clear the token on the client side.' });
};

