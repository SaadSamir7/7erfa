import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { ILoginResponse, IUser } from "@/types/user";
import { AdapterUser } from "next-auth/adapters";
import { getMyProfile } from "./services/apiAuth";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
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
                            ...response.data?.user,
                            token: response.token,
                            emailVerified: null,
                        };
                    }

                    console.error("Authentication failed:", response);
                    return null;
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.accessToken = user.token;
                token.user = user as IUser;
            }

            if (trigger === "update") {
                // If session data is passed, use it directly (no API call)
                if (session?.user) {
                    token.user = {
                        ...token.user,
                        ...session.user,
                        token: token.accessToken,
                    } as IUser;
                } else {
                    // Only fetch from API if no data was passed
                    try {
                        const freshUser = await getMyProfile(
                            token.accessToken!
                        );

                        if (freshUser?.data?.data) {
                            token.user = {
                                ...freshUser.data.data,
                                token: token.accessToken,
                            } as IUser;
                        }
                    } catch (error) {
                        console.error("Error refreshing user:", error);
                        return token;
                    }
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (token.user) {
                session.user = token.user as IUser & AdapterUser;
                session.accessToken = token.accessToken as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/login",
    },
});
