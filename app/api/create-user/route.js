import { Clerk } from '@clerk/clerk-sdk-node'; // Import Clerk SDK

const clerk = new Clerk({
  apiKey: process.env.CLERK_API_KEY, // Ensure this is correctly set in the environment
});

export async function POST(req, res) {
  const { username, password, role } = req.body;

  console.log("Received data from client:", { username, password, role });

  try {
    // Validate the input
    if (!username || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Attempt to create a user in Clerk
    console.log("Attempting to create user...");
    const user = await clerk.users.createUser({
      username, // User's username
      password, // User's password
      unsafeMetadata: { role }, // Role as metadata
    });

    console.log("User created:", user);

    // Return success response with user data
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    // If there is an error, return the error message
    return res.status(500).json({ error: error.message });
  }
}
