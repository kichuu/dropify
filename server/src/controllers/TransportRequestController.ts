import { Request, Response } from 'express';
import TransportRequest from '../models/TransportRequest';

// Create a new transport request
export const createTransportRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, vehicleType, dropOffLocation } = req.body;

        const newTransportRequest = new TransportRequest({
            userId,
            vehicleType,
            dropOffLocation,
            vehicleStatus: 'pending',  // Default status
        });

        await newTransportRequest.save();
        res.status(201).json({ message: 'Transport request created successfully', newTransportRequest });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to create transport request', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to create transport request', details: 'Unknown error' });
        }
    }
};

// Get all transport requests
export const getAllTransportRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        const transportRequests = await TransportRequest.find().populate('userId');
        res.status(200).json(transportRequests);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch transport requests', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch transport requests', details: 'Unknown error' });
        }
    }
};

// Get a specific transport request by ID
export const getTransportRequestById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const transportRequest = await TransportRequest.findById(id).populate('userId');

        if (!transportRequest) {
            res.status(404).json({ error: 'Transport request not found' });
            return;
        }

        res.status(200).json(transportRequest);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch transport request', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch transport request', details: 'Unknown error' });
        }
    }
};

// Update the status of a transport request
export const updateTransportRequestStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { vehicleStatus } = req.body;

        const updatedTransportRequest = await TransportRequest.findByIdAndUpdate(id, { vehicleStatus }, { new: true });

        if (!updatedTransportRequest) {
            res.status(404).json({ error: 'Transport request not found' });
            return;
        }

        res.status(200).json({ message: 'Transport request status updated', updatedTransportRequest });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to update transport request status', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to update transport request status', details: 'Unknown error' });
        }
    }
};

// Delete a transport request
export const deleteTransportRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedTransportRequest = await TransportRequest.findByIdAndDelete(id);

        if (!deletedTransportRequest) {
            res.status(404).json({ error: 'Transport request not found' });
            return;
        }

        res.status(200).json({ message: 'Transport request deleted successfully' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to delete transport request', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to delete transport request', details: 'Unknown error' });
        }
    }
};
