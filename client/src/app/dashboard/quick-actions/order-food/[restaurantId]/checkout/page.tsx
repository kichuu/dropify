import React from 'react';
import { Package, MapPin, Clock, CreditCard, User, Phone } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage({ params }: { params: { restaurantId: string } }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        {/* Order Summary */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <div className="space-y-3">
            {[
              { name: 'Classic Burger', quantity: 2, price: 25.98 },
              { name: 'Truffle Fries', quantity: 1, price: 8.99 },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-purple-400">{item.quantity}x</span>
                  <span>{item.name}</span>
                </div>
                <span>${item.price}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-400">Subtotal</span>
              <span>$34.97</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Delivery Fee</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Tax</span>
              <span>$6.00</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-zinc-800">
              <span>Total</span>
              <span className="text-purple-400">$45.97</span>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-bold">Delivery Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:border-purple-500"
                    placeholder="John Doe"
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:border-purple-500"
                    placeholder="(555) 123-4567"
                  />
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Delivery Address</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:border-purple-500"
                  placeholder="123 Main St, Apt 4B"
                />
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-bold">Payment Method</h2>
          <div className="relative">
            <input
              type="text"
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:border-purple-500"
              placeholder="Card Number"
            />
            <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              placeholder="MM/YY"
            />
            <input
              type="text"
              className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              placeholder="CVV"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            href={`/quick-actions/order-food/${params.restaurantId}`}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Back to Restaurant
          </Link>
          <Link
            href={`/quick-actions/order-food/${params.restaurantId}/confirmation`}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Place Order
          </Link>
        </div>
      </div>
    </div>
  );
}