import { Request, Response } from 'express';
import Order from '../models/Order';
import mongoose, { Types } from 'mongoose'; // Import mongoose Types

import { calculateDistance } from './utils';  // Assuming the Haversine formula is in a separate utils file
import DeliveryPersonnel from '../models/DeliveryPersonnel';
import User from '../models/User';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, items, deliveryStationId, estimatedDeliveryTime } = req.body;

        // Step 1: Get the user's current location
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const { lat: userLat, lng: userLng } = user.currentLocation;

        // Step 2: Find all available delivery personnel
        const deliveryPersonnelList = await DeliveryPersonnel.find();

        if (deliveryPersonnelList.length === 0) {
            res.status(404).json({ error: 'No available delivery personnel' });
            return;
        }

        // Step 3: Calculate the distance between the user and each delivery personnel
        let nearestDeliveryPersonnel = null;
        let shortestDistance = Infinity;

        for (const personnel of deliveryPersonnelList) {
            const { lat: personnelLat, lng: personnelLng } = personnel.currentLocation;
            const distance = calculateDistance(userLat, userLng, personnelLat, personnelLng);

            // Step 4: Select the nearest delivery personnel
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestDeliveryPersonnel = personnel;
            }
        }

        if (!nearestDeliveryPersonnel) {
            res.status(404).json({ error: 'No delivery personnel found within a reasonable distance' });
            return;
        }

        // Step 5: Create the new order
        const newOrder = new Order({
            userId,
            items,
            deliveryStationId,
            orderStatus: 'pending',  // Default status
            estimatedDeliveryTime,
            deliveryPersonId: nearestDeliveryPersonnel._id,
        });

        await newOrder.save();

        // Step 6: Update the delivery personnel's assignedOrders array
        nearestDeliveryPersonnel.assignedOrders.push(newOrder._id as mongoose.Types.ObjectId);
        await nearestDeliveryPersonnel.save();

        // Step 7: Respond with the created order
        res.status(201).json({ message: 'Order created successfully', newOrder });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to create order', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to create order', details: 'Unknown error' });
        }
    }
};



// Get all orders
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find().populate('userId deliveryStationId deliveryPersonId');
        res.status(200).json(orders);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch orders', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch orders', details: 'Unknown error' });
        }
    }
};

// Get a specific order by ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('userId deliveryStationId deliveryPersonId');

        if (!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        res.status(200).json(order);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch order', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch order', details: 'Unknown error' });
        }
    }
};

// Update the order status
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });

        if (!updatedOrder) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        res.status(200).json({ message: 'Order status updated successfully', updatedOrder });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to update order status', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to update order status', details: 'Unknown error' });
        }
    }
};

// Update the estimated delivery time
export const updateEstimatedDeliveryTime = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { estimatedDeliveryTime } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(id, { estimatedDeliveryTime }, { new: true });

        if (!updatedOrder) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        res.status(200).json({ message: 'Estimated delivery time updated successfully', updatedOrder });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to update estimated delivery time', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to update estimated delivery time', details: 'Unknown error' });
        }
    }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to delete order', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to delete order', details: 'Unknown error' });
        }
    }
};
