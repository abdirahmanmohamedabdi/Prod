export { GET, POST } from '@/app/auth.js';import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                
                const user = await authenticateUser(credentials.email, credentials.password);
                if (user) {
                    return user; 
                } else {
                    return null; 
                }
            }
        }),
        
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; 
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id; 
            return session;
        }
    },
    pages: {
        signIn: '/Login', 
        
    }
};

export default NextAuth(authOptions);
