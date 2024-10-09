"use client";
import { useSession } from 'next-auth/react';
import NavbarSignedIn from './NavbarSignedIn';
import NavbarSignedOut from './NavbarSignedOut';

export default function Navbar() {
  const { status } = useSession();

  return status === 'authenticated' ? <NavbarSignedIn /> : <NavbarSignedOut />;
}