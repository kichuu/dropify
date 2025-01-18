import '../../styles/globals.css';
import { Sidebar } from '@/components/Layout/Sidebar';
import { TopBar } from '@/components/Layout/TopBar';

export const metadata = {
  title: 'TrafficRelief',
  description: 'Smart traffic management and relief system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <TopBar currentLocation="📍 Downtown Seattle, 5th Avenue" />
            <main className="p-6 max-w-7xl mx-auto">
              
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
