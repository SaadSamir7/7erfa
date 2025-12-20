import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { ILoginResponse, IUser } from "@/types/user";
import { AdapterUser } from "next-auth/adapters";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch(
                    `${process.env.BACKEND_URL}/auth/login`,
                    {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" },
                    }
                );
                const response: ILoginResponse = await res.json();
                if (res.ok && response.status === "success") {
                    return {
                        ...response.data.user,
                        token: response.token,
                        emailVerified: null,
                    };
                } else {
                    console.error("Authentication failed:", response);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
                token.user = user as IUser;
            }
            return token;
        },
        async session({ session, token }) {
            // Add user data and token to session
            if (token.user) {
                session.user = token.user as IUser & AdapterUser;
                session.accessToken = token.accessToken;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});
