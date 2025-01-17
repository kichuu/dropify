import { Request, Response } from 'express';
import DeliveryStation from '../models/DeliveryStation';

export const getDeliveryStations = async (req: Request, res: Response): Promise<void> => {
    try {
        const stations = await DeliveryStation.find();
        res.status(200).json(stations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch delivery stations' });
    }
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, items } = req.body;
        // Logic to create a new order
        res.status(201).json({ message: 'Order created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create order' });
    }
};
