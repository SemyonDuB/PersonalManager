import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, zip } from 'rxjs';
import { User } from '../models/user.model';
import { deserialize } from '@tsed/json-mapper';

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

    constructor(private _http: HttpClient) {
    }

    public login(username: string, password: string): Observable<boolean> {
        return this._request$.pipe(
            map((users: User[]) => {
                const result: User | undefined = users.find((user: User) => user.checkCredentials(username, password));

                if (!result) {
                    return false;
                }

                window.localStorage["jwt"] = "randomString";
                window.localStorage["name"] = username;

                return true;
            })
        );
    }

    public register(username: string, password: string, confirmPassword: string): Observable<{isSuccess: boolean, message: string}> {
        return this._request$.pipe(
            map((users: User[]): {isSuccess: boolean, message: string} => {
                if (users.some((user: User): boolean => user.username === username)) {
                    return {isSuccess: false, message: 'Пользователь с таким именем уже существует'};
                } else if (password !== confirmPassword) {
                    return {isSuccess: false, message: 'Неверно повторен пароль'};
                }

                const maxId: number = Math.max(...users.map((user: User) => user.id));
                const user: User = new User(maxId, username, password);
                this._registeredUsers.push(user);
                window.localStorage["jwt"] = "randomString";
                window.localStorage["name"] = username;

                return {isSuccess: true, message: 'Вы успешно зарегистрированы'};
            })
        );
    }

    public logout(): void {
        window.localStorage.removeItem("jwt");
    }
}
