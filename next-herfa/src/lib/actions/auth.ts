"use server";

import { signIn, signOut } from "@/auth";

export const login = async (formData: FormData) => {
    await signIn("credentials", formData, {
        redirectTo: "/",
    });
};

export const logout = async () => {
    await signOut({
        redirectTo: "/",
    });
};
