import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  currentLocation: { lat: number, lng: number };
  preferences: {
    food: string[];
    transport: string[];
    entertainment: string[];
  };
  rewardPoints: number;
  carbonFootprintReduction: number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  currentLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  preferences: {
    food: { type: [String], default: [] },
    transport: { type: [String], default: [] },
    entertainment: { type: [String], default: [] },
  },
  rewardPoints: { type: Number, default: 0 },
  carbonFootprintReduction: { type: Number, default: 0 },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
