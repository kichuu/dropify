import { Router } from 'express';
import { 
    createTransportRequest,
    getAllTransportRequests,
    getTransportRequestById,
    updateTransportRequestStatus,
    deleteTransportRequest 
} from '../controllers/TransportRequestController';

const router: Router = Router();

router.post('/', createTransportRequest);                       // Create a new transport request
router.get('/', getAllTransportRequests);                       // Get all transport requests
router.get('/:id', getTransportRequestById);                    // Get a specific transport request by ID
router.put('/:id/status', updateTransportRequestStatus);        // Update transport request status
router.delete('/:id', deleteTransportRequest);                  // Delete a transport request

export default router;
