"use client";
import { SignedIn, SignedOut } from '@clerk/nextjs';
import NavbarSignedIn from './NavbarSignedIn';
import NavbarSignedOut from './NavbarSignedOut';

export default function Navbar() {
  return (
 <div>
      <SignedIn>
        <NavbarSignedIn />
      </SignedIn>
      <SignedOut>
        <NavbarSignedOut />
      </SignedOut>
      </div>
  );
}