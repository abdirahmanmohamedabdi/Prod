import "./globals.css";
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = ({ children, session }) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto p-4">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
};

export default Layout;