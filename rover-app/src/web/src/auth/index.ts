import ky, { HTTPError } from "ky";

const TOKEN_KEY = 'rover-access-token';

interface LoginResult {
    accessToken: string;
    expiresAt: Date;
}

export function isAuthenticated(): boolean {
    const accessToken = localStorage.getItem(TOKEN_KEY);

    return accessToken != null && accessToken.length > 0;
}

async function requestWithAuthHeader(url: string, options: object) {
    const accessToken = localStorage.getItem(TOKEN_KEY);

    try {
        return await ky(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            ...options,
        }).json();
    } catch (error) {
        console.log(error);
        const httpError = error as HTTPError

        if (httpError.response.status === 401) {
            window.location.href = '/login';
        }
    }
}

export async function getWithAuthHeader(url: string) {
    const options = {
        method: 'get'
    };

    return requestWithAuthHeader(url, options);
}

export async function postWithAuthHeader(url: string, json: object) {
    const options = {
        method: 'post',
        json
    };

    return requestWithAuthHeader(url, options);
}

export async function deleteWithAuthHeader(url: string) {
    const options = {
        method: 'delete'
    };

    return requestWithAuthHeader(url, options);
}

export async function login(data: any): Promise<boolean> {
    const response = ky.post('/api/public/login', {
        json: data
    })

    try {
        const loginResult = await response.json() as LoginResult;

        localStorage.setItem(TOKEN_KEY, loginResult.accessToken)

        return true;
    } catch (error) {
        return false;
    }
}

export async function logout(): Promise<void> {
    await requestWithAuthHeader('/api/account/logout', {
        method: 'post'
    });

    localStorage.removeItem(TOKEN_KEY);
}
