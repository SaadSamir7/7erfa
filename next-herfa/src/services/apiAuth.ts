const BACKEND_URL = process.env.BACKEND_URL;

export async function login(data: { email: string; password: string }) {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    return res.json();
}

export async function getMyProfile(token: string) {
    const res = await fetch(`${BACKEND_URL}/auth/me`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }

    return res.json();
}
