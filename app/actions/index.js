'use server'
import { signIn,Sign, signOut } from "@/app/auth.js";
export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/"});
    
}

export async function doLogout() {
await signOut({ redirectTo: "/" });
}

export async function doCredentialsLogin(formData) {
   console.log("formData", formData);

   try {
    const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
    });
    return response;
} catch (err) {
    throw err;
}
   }