import "./globals.css";
import { PlaylistProvider } from "./context/PlaylistContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PlaylistProvider>
          {children}
        </PlaylistProvider>
      </body>
    </html>
  );
}