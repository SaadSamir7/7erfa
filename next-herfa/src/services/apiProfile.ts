import { IUser } from "@/types/user";

const BACKEND_URL = process.env.BACKEND_URL;

export async function updateMyProfile(data: Partial<IUser>, token: string) {
    const response = await fetch(`${BACKEND_URL}/auth/updateMe`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
        },
    });

    const result = await response.json();
    return result;
}

// async function uploadProfilePhoto(imageFile) {
//     const formData = new FormData();
//     formData.append("photo", imageFile);

//     const response = await fetch(`${API_URL}/customers/update-profile-photo`, {
//         method: "POST",
//         body: formData,
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//     });
//     return response.json();
// }

// export async function forgotPassword(data) {
//   const response = await fetch(`${API_URL}/auth/forgotPassword`, {
//     method: "POST",
//     body: JSON.stringify({ email: data }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });

//   const result = await response.json();

//   if (!response.ok) {
//     throw new Error(result.message || "Failed to send reset link");
//   }

//   return result;
// }

// export async function resetPassword(data, token) {
//   const response = await fetch(`${API_URL}/auth/resetPassword/${token}`, {
//     method: "PATCH",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
//   return response.json();
// }
