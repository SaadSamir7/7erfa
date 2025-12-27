const VITE_API_URL = process.env.VITE_API_URL;
const API_URL = `${VITE_API_URL}/api/v1`;

export async function createCustomer(data) {
    const response = await fetch(`${API_URL}/customers/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    return response.json();
}

export async function uploadPictureCustomer(data) {
    const response = await fetch(`${API_URL}/customers/update-profile-photo`, {
        method: "POST",
        body: data,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.json();
}

export async function getCustomers() {
    const response = await fetch(`${API_URL}/customers`);
    return response.json();
}
