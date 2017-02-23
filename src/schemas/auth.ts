export enum AuthMethod { Login, Signup, Restore, Update }

export interface AuthRequest {
    method       : AuthMethod;
    login        : string;
    password?    : string;
    name?        : string;
    email?       : string;
    old?         : string;
}

export enum AuthError {
    Success,
    InvalidLoginOrPassword,
    WeakPassword,
    InvalidUsername,
    InvalidMail,
    InvalidName,
    InvalidCaptcha,
    UserNotFound,
    UnknownError
}

export interface AuthResponse {
    error : AuthError;
}
