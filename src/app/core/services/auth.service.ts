import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of, zip} from "rxjs";
import {User} from "../models/user.model";
import {deserialize} from "@tsed/json-mapper";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _registeredUsers: User[] = new Array<User>();

    private _usersRequest$: Observable<User[]> = this._http.get<{ users: User[] }>("https://dummyjson.com/users")
        .pipe(
            map((data: { users: User[] }) => data.users.map((user: User) => deserialize(user, {type: User})))
        );

    private _request$: Observable<User[]> = zip(of(this._registeredUsers), this._usersRequest$).pipe(
        map(([u1, u2]: [User[], User[]]) => [...u1, ...u2])
    );

    public get isAuthenticated(): boolean {
        const jwt: string | null = window.localStorage.getItem("jwt");

        return jwt !== null && jwt !== "";
    }

    constructor(private _http: HttpClient) {
    }

    public login(username: string, password: string): Observable<User> {
        return this._request$.pipe(
            map((users: User[]) => {
                const result: User | undefined = users.find((user: User) => user.checkCredentials(username, password));

                if (!result) {
                    throw new Error("Пароль или логин не верный");
                }

                window.localStorage["jwt"] = "randomString";

                return result!;
            })
        );
    }

    public register(username: string, password: string): Observable<User> {
        return this._request$.pipe(
            map((users: User[]) => {
                if (users.some((user: User) => user.username === username)) {
                    throw new Error("Пользователь уже существует");
                }

                const maxId: number = Math.max(...users.map((user: User) => user.id));

                const user: User = new User(maxId, username, password);

                this._registeredUsers.push(user);

                return user;
            })
        );
    }

    public logout(): void {
        window.localStorage.removeItem("jwt");
    }
}
