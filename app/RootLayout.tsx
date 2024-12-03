import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import './globals.css';
import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  // Define the paths where the Navbar should be hidden
  const hideNavbarPaths = [
    '/SuperAdmin',
    '/SuperAdmin/*',
    '/Finance',
    '/Finance/*',
    '/Hr',
    '/Hr/*',
  ];

  // Check if the current path matches any of the paths where the Navbar should be hidden
  const shouldHideNavbar = hideNavbarPaths.some((path) =>
    pathname.startsWith(path.replace('*', ''))
  );

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {!shouldHideNavbar && <Navbar />}
          {shouldHideNavbar ? (
            <Sidebar>{children}</Sidebar>
          ) : (
            <>{children}</>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}