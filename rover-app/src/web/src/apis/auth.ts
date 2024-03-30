import ky from "ky";

const TOKEN_KEY = 'API_ACCESS_TOKEN';

interface LoginResult {
    accessToken: string;
    expiresAt: Date;
}

export function isAuthenticated(): boolean {
    let accessToken = localStorage.getItem(TOKEN_KEY);

    return accessToken != null && accessToken.length > 0;
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
