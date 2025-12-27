import { IReview, IReviewsResponse } from "@/types/reviews";

const BACKEND_URL = process.env.BACKEND_URL;

export async function getReviews(
    workerId: string,
    token: string
): Promise<IReview[]> {
    const response = await fetch(`${BACKEND_URL}/workers/${workerId}/reviews`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status}`);
    }

    const data = (await response.json()) as IReviewsResponse;
    return data.data.data;
}

// export async function createReview(workerId, data) {
//     const response = await fetch(`${API_URL}/workers/${workerId}/reviews`, {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//     });
//     return response.json();
// }

// export async function updateMyReview(workerId, data, reviewId) {
//     const response = await fetch(
//         `${API_URL}/workers/${workerId}/reviews/${reviewId}`,
//         {
//             method: "PATCH",
//             body: JSON.stringify(data),
//             headers: {
//                 "Content-type": "application/json; charset=UTF-8",
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         }
//     );
//     return response.json();
// }
