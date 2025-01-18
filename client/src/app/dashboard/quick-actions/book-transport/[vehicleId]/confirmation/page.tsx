import React from 'react';
import { CheckCircle, Bike, Clock, MapPin, ChevronRight, QrCode } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-green-500/20 rounded-full">
            <CheckCircle className="text-green-400" size={48} />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-zinc-400 mb-6">Your vehicle is ready for pickup</p>
        
        <div className="space-y-4 text-left mb-8">
          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Bike className="text-green-400" size={20} />
              <h2 className="font-bold">Booking Details</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Booking Number</span>
                <span>#TB12345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Vehicle Type</span>
                <span>Electric Bike</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Duration</span>
                <span>1 hour</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="text-green-400" size={20} />
              <h2 className="font-bold">Time Details</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Start Time</span>
                <span>2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">End Time</span>
                <span>3:00 PM</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <MapPin className="text-green-400" size={20} />
              <h2 className="font-bold">Pickup Location</h2>
            </div>
            <p className="text-zinc-400">123 Main St, Seattle, WA 98101</p>
          </div>

          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <QrCode className="text-green-400" size={20} />
              <h2 className="font-bold">Unlock Code</h2>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg text-center">
              <p className="text-2xl font-mono font-bold tracking-wider">1234 5678</p>
              <p className="text-sm text-zinc-400 mt-2">Use this code to unlock your vehicle</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Link
            href="/quick-actions/book-transport/active-rental"
            className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            View Active Rental
            <ChevronRight size={20} className="ml-2" />
          </Link>
          <Link
            href="/quick-actions/book-transport"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Back to Transport Options
          </Link>
        </div>
      </div>
    </div>
  );
}