import { User } from "./user.interface";

export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    User:  User;
    token: string;
}
export interface ForgotPasswordRequest {
    email: string;
}
export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    loginUser: (email: string, password: string) => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    logoutUser: () => void;
}

export type AuthStatus = 'authorized' | 'unauthorized' | 'pending';

