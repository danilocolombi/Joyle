import { LoggedUser } from "./User";

export interface CustomResponse {
    success:boolean;
    data:LoggedUser;
    errors: string;
}