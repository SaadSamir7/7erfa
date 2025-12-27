const VITE_API_URL = process.env.VITE_API_URL;
const API_URL = `${VITE_API_URL}/api/v1`;

export async function createWorker(data) {
    const response = await fetch(`${API_URL}/workers/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    return response.json();
}

export async function uploadPictureWorker(data) {
    const response = await fetch(`${API_URL}/workers/update-profile-photo`, {
        method: "POST",
        body: data,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.json();
}

export async function getWorkers() {
    const response = await fetch(`${API_URL}/workers`);
    return response.json();
}
