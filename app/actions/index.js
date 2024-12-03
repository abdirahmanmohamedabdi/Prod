'use server'
import { signIn, signOut } from "@/app/auth.js";

export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/" });
}

export async function doLogout() {
    await signOut({ redirectTo: "/" });
}

export async function doCredentialsLogin(formData) {
    console.log("formData", formData);

    try {
        const response = await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false,
        });

        if (response.ok) {
            // Fetch user role after successful login
            const user = await fetchUserDetails(response.userId); // Replace with actual function to fetch user details
            const role = user.role; // Assuming the user object has a role property

            // Redirect based on role
            switch (role) {
                case 'admin':
                    window.location.href = '/admin-dashboard';
                    break;
                case 'teacher':
                    window.location.href = '/teacher-dashboard';
                    break;
                case 'student':
                    window.location.href = '/student-dashboard';
                    break;
                default:
                    window.location.href = '/';
                    break;
            }
        }

        return response;
    } catch (err) {
        throw err;
    }
}

// Mock function to fetch user details
async function fetchUserDetails(userId) {
    // Replace with actual API call to fetch user details
    return {
        userId: userId,
        role: 'admin' // Example role
    };
}