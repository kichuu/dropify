'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Navigation, Package, Bike, Brain, AlertCircle, Leaf, X, Menu, UserIcon, LogOut } from 'lucide-react';
import routes, { User } from "@/lib/api/routes";

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start with the sidebar closed on mobile
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter(); // To handle redirection

  const route = [
    { icon: Navigation, label: 'Dashboard', href: '/dashboard' },
    { icon: Package, label: 'Deliveries', href: '/dashboard/deliveries' },
    { icon: Bike, label: 'Transport', href: '/dashboard/transport' },
    { icon: Brain, label: 'AI Assistant', href: '/dashboard/ai' },
    { icon: AlertCircle, label: 'Emergency', href: '/dashboard/emergency' },
    { icon: Leaf, label: 'Impact', href: '/dashboard/impact' },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId') ?? '';
      if (userId) {
        const userData = await routes.users.getById(userId);
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {  
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('userId'); // Remove userId
    router.push('/'); // Redirect to home page
  };

  return (
    <div
      className={`fixed lg:static lg:flex transition-all duration-300 z-50 h-full
      ${isSidebarOpen ? 'left-0' : '-left-64'}`}
    >
      <div className="w-64 bg-zinc-900 h-screen p-6 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
          >
            TrafficRelief
          </Link>

          {/* Hamburger button for mobile */}
          <button onClick={toggleSidebar} className="lg:hidden">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="space-y-4 flex-1">
          {route.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                ${pathname === href ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-white/5'}`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-zinc-800">
          <div className="flex items-center space-x-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 flex items-center justify-center">
              <UserIcon size={20} />
            </div>
            <div>
              <p className="font-medium">{user?.name || 'Guest'}</p>
              <p className="text-sm text-zinc-400">{user ? user.email : 'Not logged in'}</p>
            </div>
          </div>

          {/* Logout Button */}
          {user && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all hover:bg-white/5 mt-6"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
