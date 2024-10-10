import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import localFont from 'next/font/local';
import { connectDB } from "./lib/mongo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default async function  Layout({ children, pageProps = {} }) {
  const conn = await connectDB();

  return (
    <html>
      <body>
        <SessionProvider session={pageProps.session}>
        <Navbar/>
        {children}
        <Footer/>
        </SessionProvider>
      </body>
    </html>
  );
}