import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export const metadata = {
  title: "Pishipoa",
  description: "PishiPoa is your go-to platform for discovering, sharing, and exploring mouthwatering recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
      
        {children}
        <Footer />
      </body>
    </html>
  );
}
