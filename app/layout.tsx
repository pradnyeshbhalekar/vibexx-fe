import "./globals.css";
import { MoodProvider } from "./context/MoodContext";
import { PlaylistProvider } from "./context/PlaylistContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MoodProvider>
          <PlaylistProvider>{children}</PlaylistProvider>
        </MoodProvider>
      </body>
    </html>
  );
}