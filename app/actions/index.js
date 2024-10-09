'use server'
import { signIn,Sign, signOut } from "@/app/auth.js";
export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/"});
    
}

export async function doLogout() {
await signOut({ redirectTo: "/" });
}