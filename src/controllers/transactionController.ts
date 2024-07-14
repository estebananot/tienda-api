import { Response } from 'express';
import { CustomRequest } from '../types/express';
import Transaction from '../models/Transaction';

export const getTransactions = async (req: CustomRequest, res: Response) => {
  if (!req.user) {
    return res.status(403).json({ message: "User not authenticated" });
  }

  try {
    // Buscar transacciones asociadas al username del usuario autenticado
    const transactions = await Transaction.find({ username: req.user.username }).exec();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving transactions', details: error });
  }
};
