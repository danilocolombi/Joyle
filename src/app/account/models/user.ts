export interface User {
    username: string;
    email: string;
    fullName: string;
    isActive: boolean;
}

export interface LoggedUser{
    token: string;
    user: User;
}