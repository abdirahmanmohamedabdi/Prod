import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import localFont from 'next/font/local';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default async function  Layout({ children, pageProps = {} }) {


  return (
    <html>
      <body>
        
    <Navbar/>
        {children}
        <Footer/>
      
      </body>
    </html>
  );
}