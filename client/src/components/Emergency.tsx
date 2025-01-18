import React from 'react';
import { AlertCircle, Heart, Car, Shield } from 'lucide-react';

export const Emergency: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-red-500/20 rounded-lg">
          <AlertCircle className="text-red-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-red-400">Emergency Services</h2>
          <p className="text-zinc-400">Quick access to help when you need it</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-xl font-bold mb-4">Emergency Contacts</h3>
        <div className="space-y-4">
          {[
            {
              service: 'Medical Assistance',
              phone: '911',
              icon: Heart,
              color: 'text-red-400',
            },
            {
              service: 'Roadside Assistance',
              phone: '800-555-0123',
              icon: Car,
              color: 'text-yellow-400',
            },
            {
              service: 'Police (Non-Emergency)',
              phone: '800-555-0199',
              icon: Shield,
              color: 'text-blue-400',
            },
          ].map((contact) => (
            <div key={contact.service} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-zinc-700/50 rounded-lg">
                  <contact.icon className={contact.color} size={24} />
                </div>
                <div>
                  <h4 className="font-medium">{contact.service}</h4>
                  <p className="text-sm text-zinc-400">{contact.phone}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-zinc-700/50 rounded-lg hover:bg-zinc-700 transition-colors">
                Call
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-xl font-bold mb-4">Nearby Services</h3>
        <div className="aspect-video rounded-lg bg-zinc-800 overflow-hidden mb-4">
          <img
            src="https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=800&q=80"
            alt="Emergency Services Map"
            className="w-full h-full object-cover opacity-75"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <h4 className="text-sm text-zinc-400">Nearest Hospital</h4>
            <p className="font-medium">0.8 miles</p>
          </div>
          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <h4 className="text-sm text-zinc-400">Police Station</h4>
            <p className="font-medium">1.2 miles</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);