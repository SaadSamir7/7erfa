"use server";

import { z } from "zod";
import { updateMyProfile } from "@/services/apiProfile";
import { IUser } from "@/types/user";
import { revalidatePath } from "next/cache";

const updateProfileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email"),
    phoneNumber: z.string().optional(),
    city: z.string().optional(),
    hourlyRate: z.coerce
        .number()
        .positive("Hourly rate must be positive")
        .optional(),
    yearsOfExperience: z.coerce
        .number()
        .int()
        .nonnegative("Years of experience must be non-negative")
        .optional(),
    bio: z.string().optional(),
});

export async function updateWorkerProfile(formData: FormData, token: string) {
    try {
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phoneNumber: formData.get("phoneNumber"),
            city: formData.get("city"),
            hourlyRate: formData.get("hourlyRate"),
            yearsOfExperience: formData.get("yearsOfExperience"),
            bio: formData.get("bio"),
        };

        const parsed = updateProfileSchema.safeParse(data);
        if (!parsed.success) {
            console.error("Validation errors:", parsed.error.flatten());
            return {
                success: false,
                error: "Invalid form data",
                details: z.treeifyError(parsed.error),
            };
        }

        const validData = parsed.data as Partial<IUser>;

        const result = await updateMyProfile(validData, token);

        if (!result || result.status !== "success") {
            return {
                success: false,
                error: result?.message || "Failed to update profile",
            };
        }

        // Revalidate paths
        revalidatePath("/worker-dashboard");
        revalidatePath("/worker-dashboard/profile");

        return {
            success: true,
            message: "Profile updated successfully",
            data: result.data?.data || validData,
        };
    } catch (error: unknown) {
        console.error("Update error:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
        };
    }
}
