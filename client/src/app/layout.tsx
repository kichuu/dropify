import "../styles/globals.css"
import "leaflet/dist/leaflet.css";

import { SocketProvider } from "@/lib/socketcontext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  );
}
