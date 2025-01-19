"use client"
import React, { useEffect, useState } from 'react';
import { Bike, Zap, Car } from 'lucide-react';
import routes, { TransportRequest } from '@/lib/api/routes';


export const Transport: React.FC = () => {
  const [activeRentals, setActiveRentals] = useState<TransportRequest[]>([]);
  
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchRentals = async () => {

      const response = await routes.transportRequests.getAll()
      console.log("res",response)
      setActiveRentals(response);
    };

    fetchRentals();

  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400">Available Bikes</h3>
            <Bike className="text-green-400" size={24} />
          </div>
          <p className="text-3xl font-bold">8</p>
          <p className="text-sm text-zinc-400 mt-2">Within 2 minute walk</p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400">Available Scooters</h3>
            <Zap className="text-yellow-400" size={24} />
          </div>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-zinc-400 mt-2">Within 5 minute walk</p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400">Car Drop-off Points</h3>
            <Car className="text-blue-400" size={24} />
          </div>
          <p className="text-3xl font-bold">4</p>
          <p className="text-sm text-zinc-400 mt-2">Secure locations nearby</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">Transport Options</h3>
          <div className="space-y-4">
            {[
              {
                type: 'Electric Bike',
                price: '$4.99',
                time: 'Available now',
                icon: Bike,
                color: 'text-green-400',
              },
              {
                type: 'Electric Scooter',
                price: '$3.99',
                time: 'Available now',
                icon: Zap,
                color: 'text-yellow-400',
              },
              {
                type: 'Car Valet',
                price: '$14.99',
                time: 'Available now',
                icon: Car,
                color: 'text-blue-400',
              },
            ].map((option) => (
              <div key={option.type} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-zinc-700/50 rounded-lg">
                    <option.icon className={option.color} size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium">{option.type}</h4>
                    <p className="text-sm text-zinc-400">{option.time}</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
                  {option.price}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">Active Rentals</h3>
          {false ? (
            <p className="text-zinc-400">Loading...</p>
          ) : activeRentals.length > 0 ? (
            <div className="space-y-4">
              {activeRentals.map((rental) => (
                <div key={rental._id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    
                    <div>
                      <h4 className="font-medium">{rental.vehicleType}</h4>
                      <p className="text-sm text-zinc-400">Duration: Around 10 minutes</p>
                    </div>
                  </div>
                  <p className="text-purple-400">{rental.vehicleStatus}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-400">No active rentals at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};
