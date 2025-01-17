import mongoose, { Schema, Document } from 'mongoose';

export interface IDeliveryStation extends Document {
    name: string;
    location: {
        type: string;
        coordinates: [number, number];
    };
}

const DeliveryStationSchema: Schema = new Schema({
    name: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true },
    },
});

DeliveryStationSchema.index({ location: '2dsphere' });

export default mongoose.model<IDeliveryStation>('DeliveryStation', DeliveryStationSchema);
