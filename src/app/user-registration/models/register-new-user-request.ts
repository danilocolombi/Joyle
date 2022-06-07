export interface RegisterNewUserRequest{
    username: string;
    fullName: string;
    email: string;
    password: string;
    confirmationLink: string;
}