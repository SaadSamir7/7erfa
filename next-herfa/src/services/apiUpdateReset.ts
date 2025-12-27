const VITE_API_URL = process.env.VITE_API_URL;
const API_URL = `${VITE_API_URL}/api/v1`;

export async function updateMe(data) {
  const hasImageFile = data.image && data.image instanceof File;

  let processedData = { ...data };

  if (hasImageFile) {
    const uploadedImageData = await uploadProfilePhoto(data.image);
    if (uploadedImageData.status === "success") {
      processedData.image = uploadedImageData.data.updated_user.image;
    } else {
      throw new Error("Failed to upload image");
    }
  }

  const response = await fetch(`${API_URL}/auth/updateMe`, {
    method: "PATCH",
    body: JSON.stringify(processedData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const result = await response.json();

  if (hasImageFile && result.status === "success") {
    if (result.data && result.data.user) {
      result.data.user.imageUpdatedAt = new Date().getTime();
    }
  }

  return result;
}

async function uploadProfilePhoto(imageFile) {
  const formData = new FormData();
  formData.append("photo", imageFile);

  const response = await fetch(`${API_URL}/customers/update-profile-photo`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
}

export async function forgotPassword(data) {
  const response = await fetch(`${API_URL}/auth/forgotPassword`, {
    method: "POST",
    body: JSON.stringify({ email: data }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to send reset link");
  }

  return result;
}

export async function resetPassword(data, token) {
  const response = await fetch(`${API_URL}/auth/resetPassword/${token}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.json();
}
