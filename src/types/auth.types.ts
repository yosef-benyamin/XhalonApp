
export interface SessionLoginInfo {
    SESSION_LOGIN_ID: string;
    LOGIN_DATE: string;
    LOGIN_IS_EXPIRED: number;
    LOGIN_IP_FROM: string;
}
export interface User {
    USER_ID: string;
    SESSION_LOGIN_INFO: SessionLoginInfo[];
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: (USER_ID: string, SESSION_LOGIN_ID: string) => void;
}
