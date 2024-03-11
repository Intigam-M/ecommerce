const BASE_URL = "http://localhost:8000/api/";

export const loginUser = async (userInfo, password) => {
    const loginUser = await fetch(`${BASE_URL}auth/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_info: userInfo, password }),
    });
    const res = await loginUser.json();
    if (res.message) {
        throw new Error(res.message);
    }
    return res;
};

export const registerUser = async (userInfo) => {
    const registerUser = await fetch(`${BASE_URL}auth/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    });
    const res = await registerUser.json();
    if (res.message) {
        throw new Error(res.message);
    }
    return res;
};
