import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Pishipoa",
  description: "PishiPoa is your go-to platform for discovering, sharing, and exploring mouthwatering recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        {children}
      </body>
    </html>
  );
}
