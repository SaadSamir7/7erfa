import { WorkersResponse } from "@/types/user";

const BACKEND_URL = process.env.BACKEND_URL;

export async function getWorkers(): Promise<WorkersResponse> {
    const response = await fetch(`${BACKEND_URL}/workers`);
    return response.json();
}

export async function getWorkerById(id: string): Promise<WorkersResponse> {
    const response = await fetch(`${BACKEND_URL}/workers/${id}`);
    return response.json();
}

// export async function createWorker(data) {
//     const response = await fetch(`${API_URL}/workers/signup`, {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8",
//         },
//     });
//     return response.json();
// }

// export async function uploadPictureWorker(data) {
//     const response = await fetch(`${API_URL}/workers/update-profile-photo`, {
//         method: "POST",
//         body: data,
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//     });
//     return response.json();
// }
