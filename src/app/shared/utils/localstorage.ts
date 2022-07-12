import { User, LoggedUser } from "src/app/account/models/User";

export class LocalStorageUtils{

    public getUser(): User{
        const user = localStorage.getItem('joyle.user');

        return user == null ? "" : JSON.parse(user);
    }

    public saveUserData(response: LoggedUser) {
        this.saveUserToken(response.token);
        this.saveUser(response.user);
    }

    private saveUserToken(token: string) {
        localStorage.setItem('joyle.token', token);
    }

    public saveUser(user: User) {
        localStorage.setItem('joyle.user', JSON.stringify(user));
    }

    public getUserToken(): string {
        const token = localStorage.getItem('joyle.token');

        return token == null ? "" : token;
    }

    public clearUserData() {
        localStorage.removeItem('joyle.token');
        localStorage.removeItem('joyle.user');
    }
}