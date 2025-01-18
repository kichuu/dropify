import '../styles/globals.css';
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
            <main className="p-6 max-w-7xl mx-auto">
              {children}
            </main>
      </body>
    </html>
  );
}