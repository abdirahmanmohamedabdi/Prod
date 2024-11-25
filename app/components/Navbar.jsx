"use client";
import { useSession } from 'next-auth/react';
import NavbarSignedIn from './NavbarSignedIn';
import NavbarSignedOut from './NavbarSignedOut';

export default function Navbar() {
  // Mock the useSession hook for testing purposes
  const { status } = useSession() || { status: 'authenticated' }; // Default to 'authenticated' for testing

  return (
    <nav>
      {status === 'authenticated' ? <NavbarSignedIn /> : <NavbarSignedOut />}
    </nav>
  );
}