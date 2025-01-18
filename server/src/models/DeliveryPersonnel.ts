import mongoose, { Schema, Document } from 'mongoose';

interface IDeliveryPersonnel extends Document {
  name: string;
  vehicleType: string;
  currentLocation: { lat: number; lng: number };
  assignedOrders: mongoose.Types.ObjectId[];
  status: 'active' | 'busy' | 'offline'; // Define possible status values
}

const deliveryPersonnelSchema = new Schema<IDeliveryPersonnel>({
  name: { type: String, required: true },
  vehicleType: { type: String, required: true },
  currentLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  assignedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  status: {
    type: String,
    enum: ['active', 'busy', 'offline'], // Restrict to specific values     
    default: 'active', // Default status
  },
});

const DeliveryPersonnel = mongoose.model<IDeliveryPersonnel>('DeliveryPersonnel', deliveryPersonnelSchema);

export default DeliveryPersonnel;
