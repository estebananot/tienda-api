import { Response } from 'express';
import { getNearbyRestaurants } from '../services/restaurantService';
import Transaction from '../models/Transaction';
import { CustomRequest } from '../types/express';

export const fetchRestaurants = async (req: CustomRequest, res: Response) => {
  const { latitude, longitude, radius } = req.body;
  const currentLocation = `${latitude},${longitude}`;

  if (!latitude || !longitude || !radius) {
    return res.status(400).json({ message: 'Latitude, longitude, and radius are required' });
  }

  if (!req.user) {
    return res.status(403).json({ message: 'User not authenticated' });
  }

  try {
    const restaurants = await getNearbyRestaurants({ location: { latitude, longitude }, radius });
    const lastTransaction = await Transaction.findOne({ user: req.user.username }).sort({ createdAt: -1 });

    const currentTime = new Date();
    let canSave = true;

    if (lastTransaction) {
      const lastTransactionTime = new Date(lastTransaction.createdAt);
      const timeDiffMinutes = (currentTime.getTime() - lastTransactionTime.getTime()) / (1000 * 60); // Diferencia en minutos

      if (lastTransaction.location === currentLocation && timeDiffMinutes < 10) {
        canSave = false;
      }
    }

    if (canSave) {
      const newTransaction = new Transaction({
        user: req.user.username,
        location: currentLocation,
        restaurants: restaurants.places
      });

      await newTransaction.save();
      res.status(200).json({ message: 'Transaction saved', data: restaurants });
    } else {
      res.status(200).json({ message: 'Transaction not saved due to similar location and time constraints', data: restaurants });
    }
  } catch (error) {
    console.error('Error while fetching restaurants:', error);
    res.status(500).json({ error: 'Internal server error', details: error });
  }
};
