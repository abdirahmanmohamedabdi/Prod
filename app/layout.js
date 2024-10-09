import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import localFont from 'next/font/local';
import Navbar from "./components/Navbar";
export default function Layout({ children, pageProps = {} }) {
  return (
    <html>
      <body>
        <SessionProvider session={pageProps.session}>
        <Navbar/>
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}