import User from '../models/User'; // Assuming the User model is in the 'models' directory
import { Socket } from 'socket.io';

export const handleLocationUpdate = async (socket: Socket, data: { userId: string, latitude: number, longitude: number }) => {
    try {
        const { userId, latitude, longitude } = data;

        // Find the user by userId and update their current location
        const user = await User.findById(userId);
        
        if (user) {
            user.currentLocation = { lat: latitude, lng: longitude };
            await user.save(); // Save the updated location in the database
            console.log(`User's location updated: ${latitude}, ${longitude}`);

            // Optionally, you can emit a confirmation or updated data back to the client
            socket.emit('locationUpdated', { success: true, message: 'Location updated successfully' });
        } else {
            console.log('User not found');
            socket.emit('locationUpdated', { success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating location:', error);
        socket.emit('locationUpdated', { success: false, message: 'Error updating location' });
    }
};
