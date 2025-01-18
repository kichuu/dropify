import React from 'react';
import { CheckCircle, Package, Clock, MapPin, ChevronRight } from 'lucide-react';
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
        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-zinc-400 mb-6">Your order has been successfully placed</p>
        
        <div className="space-y-4 text-left mb-8">
          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Package className="text-purple-400" size={20} />
              <h2 className="font-bold">Order Details</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Order Number</span>
                <span>#12345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Amount</span>
                <span>$45.97</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="text-purple-400" size={20} />
              <h2 className="font-bold">Estimated Delivery</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Date</span>
                <span>Today</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Time</span>
                <span>30-40 minutes</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <MapPin className="text-purple-400" size={20} />
              <h2 className="font-bold">Delivery Address</h2>
            </div>
            <p className="text-zinc-400">123 Main St, Apt 4B, Seattle, WA 98101</p>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Link
            href="/quick-actions/order-food/tracking"
            className="w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
          >
            Track Order
            <ChevronRight size={20} className="ml-2" />
          </Link>
          <Link
            href="/quick-actions/order-food"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Back to Restaurants
          </Link>
        </div>
      </div>
    </div>
  );
}