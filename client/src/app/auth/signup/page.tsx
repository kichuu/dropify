'use client'

import DeliverySignup from '@/components/DeliverySignup';
import UserSignup from '@/components/UserSignup';
import React, { useState } from 'react';

export default function SignupPage() {
  const [isUserSignup, setIsUserSignup] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-lg sm:max-w-md flex flex-col">
        {/* Toggle Buttons */}
        <div className="mb-6 flex justify-center space-x-4">
          <button
            onClick={() => setIsUserSignup(true)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isUserSignup
                ? 'bg-purple-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            User Signup
          </button>
          <button
            onClick={() => setIsUserSignup(false)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !isUserSignup
                ? 'bg-purple-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            Delivery Signup
          </button>
        </div>

        {/* Signup Forms */}
        {isUserSignup ? <UserSignup /> : <DeliverySignup />}
      </div>
    </div>
  );
}

