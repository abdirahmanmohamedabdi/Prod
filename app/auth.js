import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithhubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/app/model/user-model";
import bcrypt from "bcrypt";
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session:{
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password:{},
            },
            async authorize(credentials) {
                if (credentials === null) return null;

                try {
                    const user = await User.findOne({ email: credentials.email });
                    console.log(user);
                    if (user) {
                        const isMatch = bcrypt.compare(credentials.password, user.password 
        );

                    if (isMatch) {
                        return user;
                    } else {
                        throw new Error("Email or password is not incorrect");
                }
            } else {
                throw new Error("User not found");
            }
        } catch (error) {
            throw new Error(error);
        }
    },
}),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GithhubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
});