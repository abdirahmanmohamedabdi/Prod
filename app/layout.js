import "./globals.css";
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = ({ children, session }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
       
          <Navbar />
          
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;