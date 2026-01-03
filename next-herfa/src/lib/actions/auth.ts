"use server";

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const login = async (formData: FormData) => {
    const credentials = Object.fromEntries(formData) as Record<string, string>;
    try {
        await signIn("credentials", {
            ...credentials,
            redirect: false,
        });
    } catch (error) {
        console.error("Login error:", error);
        return { error: "invalid email or password", success: false };
    }

    return { success: true };
};

export const logout = async () => {
    await signOut({ redirect: false });
    redirect("/");
};
