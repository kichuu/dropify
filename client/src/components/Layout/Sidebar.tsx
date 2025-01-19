'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navigation, Package, Bike, Brain, Briefcase, AlertCircle, Leaf, User, X, Menu } from 'lucide-react';

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); // Start with the sidebar closed on mobile
  const pathname = usePathname();

  const routes = [
    { icon: Navigation, label: 'Dashboard', href: '/dashboard' },
    { icon: Package, label: 'Deliveries', href: '/dashboard/deliveries' },
    { icon: Bike, label: 'Transport', href: '/dashboard/transport' },
    { icon: Brain, label: 'AI Assistant', href: '/dashboard/ai' },
    { icon: AlertCircle, label: 'Emergency', href: '/dashboard/emergency' },
    { icon: Leaf, label: 'Impact', href: '/dashboard/impact' },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
            Dropify
          </Link>

          {/* Hamburger button for mobile */}
          <button onClick={toggleSidebar} className="lg:hidden">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="space-y-4 flex-1">
          {routes.map(({ icon: Icon, label, href }) => (
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
              <User size={20} />
            </div>
            <div>
              <p className="font-medium">Alex Chen</p>
              <p className="text-sm text-zinc-400">Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
