"use client"
import React, { useEffect, useState } from 'react';
import '../../styles/globals.css';
import { Sidebar } from '@/components/Layout/Sidebar';
import { TopBar } from '@/components/Layout/TopBar';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [location, setLocation] = useState<string>('📍 Loading...');

  useEffect(() => {
    // Check if geolocation is available in the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Use a reverse geocoding API (e.g., Google Maps or OpenCage) to get the location
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=8791c4954cb347f1a59c5a7f1f880979`
            );
            const data = await response.json();
            console.log(data.results[0])
            if (data.results.length > 0) {
              setLocation(`📍 ${data.results[0].formatted}`);
            } else {
              setLocation('📍 Location not found');
            }
          } catch (error) {
            setLocation('📍 Error fetching location');
          }
        },
        () => {
          setLocation('📍 Location access denied');
        }
      );
    } else {
      setLocation('📍 Geolocation not supported');
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-black text-white flex">
          {/* Sidebar stays fixed on large screens */}
          <div className="fixed top-0 left-0 h-full hidden lg:block">
            <Sidebar />
          </div>

          {/* Content area scrolls independently */}
          <div className="flex-1 min-h-screen ml-0 lg:ml-64">
            <TopBar currentLocation={location} />
            <main className="p-6 max-w-7xl mx-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
