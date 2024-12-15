import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { ClerkAPIResponseError, ClerkRuntimeError, ClerkWebAuthnError } from '@clerk/shared/dist/error';

export async function POST(req) {
  try {
    const { username, password, role } = await req.json();

    console.log("API received data:", { username, password, role });

    // Validate required fields
    if (!username || !password || !role) {
      console.error("Missing required fields:", { username, password, role });
      return NextResponse.json(
        { error: "Missing required fields: username, password, role" },
        { status: 400 }
      );
    }

    console.log("Attempting to create user in Clerk...");

    // Create the user in Clerk
    const user = await clerkClient.users.createUser({
      emailAddress: [username],
      password: password,
      unsafeMetadata: { role },
    });

    console.log("User successfully created:", user);

    return NextResponse.json({ message: "User created successfully", user });
  } catch (error) {
    if (error instanceof ClerkAPIResponseError) {
      console.error("Clerk API Response Error:", error);
      return NextResponse.json({ error: `Clerk API Error: ${error.message}` }, { status: error.statusCode });
    } else if (error instanceof ClerkRuntimeError) {
      console.error("Clerk Runtime Error:", error);
      return NextResponse.json({ error: `Clerk Runtime Error: ${error.message}` }, { status: 500 });
    } else if (error instanceof ClerkWebAuthnError) {
      console.error("Clerk WebAuthn Error:", error);
      return NextResponse.json({ error: `Clerk WebAuthn Error: ${error.message}` }, { status: 500 });
    } else {
      console.error("Error creating user:", error);
      return NextResponse.json({ error: `Error creating user: ${error.message}` }, { status: 500 });
    }
  }
}