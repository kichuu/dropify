import mongoose, { Schema, Document } from 'mongoose';

interface IDeliveryStation extends Document {
  location: { lat: number, lng: number };
  availableItems: string[];
  activeDeliveries: mongoose.Types.ObjectId[];
}

const deliveryStationSchema = new Schema<IDeliveryStation>({
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  availableItems: { type: [String], required: true },
  activeDeliveries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

const DeliveryStation = mongoose.model<IDeliveryStation>('DeliveryStation', deliveryStationSchema);

export default DeliveryStation;
