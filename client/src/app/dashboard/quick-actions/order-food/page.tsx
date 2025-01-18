import React from 'react';
import { Package, Star, Clock, MapPin, Search } from 'lucide-react';

export default function OrderFoodPage() {
  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-orange-500/20 rounded-lg">
            <Package className="text-orange-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Order Food</h2>
            <p className="text-zinc-400">Quick and convenient food delivery</p>
          </div>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for restaurants or dishes..."
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:border-orange-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
        </div>

        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {['All', 'Fast Food', 'Healthy', 'Asian', 'Italian', 'Desserts'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-zinc-800/50 rounded-full hover:bg-orange-500/20 hover:text-orange-400 transition-colors whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'Urban Bistro',
              image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
              rating: 4.8,
              time: '20-30 min',
              tags: ['American', 'Burgers'],
            },
            {
              name: 'Green Bowl',
              image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
              rating: 4.6,
              time: '15-25 min',
              tags: ['Healthy', 'Salads'],
            },
            {
              name: 'Sushi Master',
              image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
              rating: 4.9,
              time: '25-35 min',
              tags: ['Japanese', 'Sushi'],
            },
            {
              name: 'Pizza Palace',
              image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
              rating: 4.7,
              time: '20-30 min',
              tags: ['Italian', 'Pizza'],
            },
          ].map((restaurant) => (
            <div key={restaurant.name} className="bg-zinc-800/50 rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{restaurant.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400" size={16} />
                    <span>{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-zinc-400">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {restaurant.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    1.2 mi
                  </div>
                </div>
                <div className="mt-2 flex space-x-2">
                  {restaurant.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-zinc-700 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}