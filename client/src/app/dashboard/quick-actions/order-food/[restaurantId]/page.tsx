import React from 'react';
import { Package, Star, Clock, MapPin, ChevronLeft, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function RestaurantPage({ params }: { params: { restaurantId: string } }) {
  // This would normally fetch from an API based on restaurantId
  const restaurant = {
    id: params.restaurantId,
    name: 'Urban Bistro',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    time: '20-30 min',
    tags: ['American', 'Burgers'],
    description: 'Serving the finest American cuisine with a modern twist',
    menu: [
      {
        category: 'Popular Items',
        items: [
          {
            id: 1,
            name: 'Classic Burger',
            price: 12.99,
            description: 'Angus beef patty with lettuce, tomato, and special sauce',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 2,
            name: 'Truffle Fries',
            price: 8.99,
            description: 'Hand-cut fries with truffle oil and parmesan',
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80'
          }
        ]
      },
      {
        category: 'Main Courses',
        items: [
          {
            id: 3,
            name: 'Steak Frites',
            price: 29.99,
            description: 'Grilled ribeye with herb butter and french fries',
            image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80'
          }
        ]
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 rounded-xl overflow-hidden">
        <div className="relative h-64">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <Link
            href="/quick-actions/order-food"
            className="absolute top-4 left-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="text-white" size={24} />
          </Link>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-400" size={20} />
              <span className="font-medium">{restaurant.rating}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-zinc-400">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              {restaurant.time}
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              1.2 mi
            </div>
          </div>
          <p className="mt-4 text-zinc-300">{restaurant.description}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-8">
        {restaurant.menu.map((category) => (
          <div key={category.category}>
            <h2 className="text-xl font-bold mb-4">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items.map((item) => (
                <div key={item.id} className="bg-zinc-900 rounded-xl overflow-hidden">
                  <div className="aspect-video">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold">{item.name}</h3>
                      <span className="text-purple-400">${item.price}</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button className="p-1 rounded-full hover:bg-zinc-800">
                          <Minus size={20} />
                        </button>
                        <span>0</span>
                        <button className="p-1 rounded-full hover:bg-zinc-800">
                          <Plus size={20} />
                        </button>
                      </div>
                      <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <ShoppingBag className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Your Order</p>
              <p className="font-bold">3 items • $45.97</p>
            </div>
          </div>
          <Link
            href={`/quick-actions/order-food/${params.restaurantId}/checkout`}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}