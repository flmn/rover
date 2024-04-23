export interface AccountDTO {
    name: string;
    avatar: string;
}

export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface LoginResultDTO {
    accessToken: string;
    expiresAt: Date;
}
