const VITE_API_URL = import.meta.env.VITE_API_URL;
const API_URL = `${VITE_API_URL}/api/v1`;

export async function createReview(workerId, data) {
  const response = await fetch(`${API_URL}/workers/${workerId}/reviews`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
}

export async function getReviews(workerId) {
  const response = await fetch(`${API_URL}/workers/${workerId}/reviews`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.status}`);
  }

  return response.json();
}

export async function updateMyReview(workerId, data, reviewId) {
  const response = await fetch(
    `${API_URL}/workers/${workerId}/reviews/${reviewId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.json();
}
