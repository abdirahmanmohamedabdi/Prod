import "./globals.css";
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { QueryClient, QueryClientProvider } from 'react-query';
const Layout = ({ children, session }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <ClerkProvider>
      <html lang="en">
        <body>
       
          <Navbar />
          
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
    </QueryClientProvider>
  );
};

export default Layout;