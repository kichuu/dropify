import React from 'react';
import { Bike, MapPin, Clock, Battery, Shield, ChevronLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function VehicleDetailsPage({ params }: { params: { vehicleId: string } }) {
  // This would normally fetch from an API based on vehicleId
  const vehicle = {
    id: params.vehicleId,
    type: 'Electric Bike',
    model: 'Premium City Bike',
    image: 'https://images.unsplash.com/photo-1556122071-e404eaedb7f8?auto=format&fit=crop&w=800&q=80',
    battery: '95%',
    distance: '0.2 mi',
    price: '$4.99',
    features: ['Helmet included', 'Phone holder', 'Front basket'],
    specs: {
      range: '40 miles',
      maxSpeed: '20 mph',
      weight: '45 lbs'
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-xl overflow-hidden">
        <div className="relative h-64">
          <img
            src={vehicle.image}
            alt={vehicle.type}
            className="w-full h-full object-cover"
          />
          <Link
            href="/quick-actions/book-transport"
            className="absolute top-4 left-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="text-white" size={24} />
          </Link>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{vehicle.type}</h1>
              <p className="text-zinc-400">{vehicle.model}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-400">Per Hour</p>
              <p className="text-xl font-bold text-green-400">{vehicle.price}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-zinc-400 mb-6">
            <div className="flex items-center">
              <Battery size={16} className="mr-1" />
              {vehicle.battery}
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              {vehicle.distance}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="font-bold">Features</h2>
              <div className="space-y-2">
                {vehicle.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Shield size={16} className="text-green-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold">Specifications</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Range</span>
                  <span>{vehicle.specs.range}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Max Speed</span>
                  <span>{vehicle.specs.maxSpeed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Weight</span>
                  <span>{vehicle.specs.weight}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h2 className="text-xl font-bold mb-6">Book Now</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Start Time</label>
              <input
                type="time"
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Duration</label>
              <select className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500">
                <option>1 hour</option>
                <option>2 hours</option>
                <option>3 hours</option>
                <option>4 hours</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Payment Method</label>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:border-green-500"
                placeholder="Card Number"
              />
              <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
              placeholder="MM/YY"
            />
            <input
              type="text"
              className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
              placeholder="CVV"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">Total Price</p>
            <p className="text-2xl font-bold text-green-400">$4.99</p>
          </div>
          <Link
            href={`/quick-actions/book-transport/${params.vehicleId}/confirmation`}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Confirm Booking
          </Link>
        </div>
      </div>
    </div>
  );
}