import React from 'react';
import { Package, Coffee, Star, ShoppingBag, Gift } from 'lucide-react';

export const Deliveries: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
      <h2 className="text-2xl font-bold mb-6">Active Orders</h2>
      <div className="space-y-4">
        {[
          {
            id: 1,
            type: 'Food',
            vendor: 'Gourmet Express',
            eta: '8 mins',
            status: 'En Route',
            icon: Package,
          },
          {
            id: 2,
            type: 'Coffee',
            vendor: 'Urban Brew',
            eta: '12 mins',
            status: 'Preparing',
            icon: Coffee,
          },
        ].map((order) => (
          <div key={order.id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <order.icon className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="font-medium">{order.type}</h3>
                <p className="text-sm text-zinc-400">{order.vendor}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{order.eta}</p>
              <p className="text-sm text-zinc-400">{order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-xl font-bold mb-4">Quick Order</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Coffee, label: 'Coffee', color: 'text-amber-400' },
            { icon: Package, label: 'Food', color: 'text-orange-400' },
            { icon: ShoppingBag, label: 'Groceries', color: 'text-green-400' },
            { icon: Gift, label: 'Other', color: 'text-purple-400' },
          ].map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
            >
              <Icon className={color} size={24} />
              <span className="mt-2 text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-xl font-bold mb-4">Nearby Vendors</h3>
        <div className="space-y-3">
          {[
            { name: 'Urban Cafe', distance: '0.3 mi', rating: '4.8' },
            { name: 'Fresh Market', distance: '0.5 mi', rating: '4.6' },
            { name: 'Quick Bites', distance: '0.7 mi', rating: '4.7' },
          ].map((vendor) => (
            <div key={vendor.name} className="flex items-center justify-between p-3 hover:bg-zinc-800/50 rounded-lg transition-colors">
              <div>
                <h4 className="font-medium">{vendor.name}</h4>
                <p className="text-sm text-zinc-400">{vendor.distance}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-400" size={16} />
                <span>{vendor.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);