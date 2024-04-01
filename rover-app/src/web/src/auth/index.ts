import ky, { HTTPError } from "ky";

const TOKEN_KEY = 'API_ACCESS_TOKEN';

interface LoginResult {
    accessToken: string;
    expiresAt: Date;
}

export function isAuthenticated(): boolean {
    let accessToken = localStorage.getItem(TOKEN_KEY);

    return accessToken != null && accessToken.length > 0;
}

async function requestWithAuthHeader(url: string, options: object) {
    let accessToken = localStorage.getItem(TOKEN_KEY);

    try {
        return await ky(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            ...options,
        }).json();
    } catch (error) {
        console.log(error);
        let httpError = error as HTTPError

        if (httpError.response.status === 401) {
            window.location.href = '/login';
        }
    }
}

export async function getWithAuthHeader(url: string) {
    let options = {
        method: 'get'
    };

    return requestWithAuthHeader(url, options);
}

export async function postWithAuthHeader(url: string, json: object) {
    let options = {
        method: 'post',
        json
    };

    return requestWithAuthHeader(url, options);
}

export async function deleteWithAuthHeader(url: string) {
    let options = {
        method: 'delete'
    };

    return requestWithAuthHeader(url, options);
}

export async function login(data: any): Promise<boolean> {
    const response = ky.post('/auth/login', {
        json: data
    })

    try {
        let loginResult = await response.json() as LoginResult;

        localStorage.setItem(TOKEN_KEY, loginResult.accessToken)

        return true;
    } catch (error) {
        return false;
    }
}

export async function logout(): Promise<void> {
    const response = ky.post('/auth/logout')

    try {
        await response.json

        localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
        console.log(error)
    }
}
