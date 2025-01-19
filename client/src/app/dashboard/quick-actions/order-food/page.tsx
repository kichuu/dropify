"use client"
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';

// Define types for items and order
interface MenuItem {
  name: string;
  image: string;
  price: number;
}

interface OrderItem {
  name: string;
  price: number;
}

export default function OrderFoodPage() {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);  // To handle the loading state
  const [userId, setUserId] = useState<string | null>(null);  // User ID state

  // Fetch the userId from localStorage or another method based on your auth system
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId'); // Or replace with your method of fetching the userId
    if (storedUserId) {
      setUserId(storedUserId);  // Update userId state if found
    }
  }, []);

  const items: MenuItem[] = [
    {
      name: 'Cheeseburger',
      image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80',
      price: 8.99,
    },
    {
      name: 'Caesar Salad',
      image: 'https://images.unsplash.com/photo-1559561852-1639d5c0e51e?auto=format&fit=crop&w=800&q=80',
      price: 7.49,
    },
    {
      name: 'Sushi Platter',
      image: 'https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=800&q=80',
      price: 19.99,
    },
    {
      name: 'Margherita Pizza',
      image: 'https://images.unsplash.com/photo-1601924638867-3a3b7456d4d3?auto=format&fit=crop&w=800&q=80',
      price: 12.49,
    },
  ];

  const addToCart = (item: MenuItem): void => {
    setCart((prev) => [...prev, { name: item.name, price: item.price }]);
  };

  const handleOrder = async (): Promise<void> => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!userId) {
      alert('User is not logged in.');
      return;
    }

    setLoading(true);  // Start loading

    try {
      // Prepare order data based on the required API structure
      const orderData = {
        userId: userId,  // Use the userId from the state
        items: cart.map(item => item.name),  // Item names
      };

      const response = await fetch('http://localhost:5050/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Order placed successfully! Order ID: ${data.newOrder._id}`);
        setCart([]);  // Clear the cart after successful order
      } else {
        alert(`Error placing order: ${data.error || 'Please try again later.'}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order. Please try again.');
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h2 className="text-2xl font-bold mb-4">Order Food</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.name} className="bg-zinc-800/50 rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-zinc-400">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center space-x-2"
                >
                  <PlusCircle size={16} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Cart</h3>
          {cart.length === 0 ? (
            <p className="text-zinc-400">Your cart is empty.</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleOrder}
            className={`mt-4 px-4 py-2 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500'} text-white rounded-lg hover:bg-green-600`}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Order Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
