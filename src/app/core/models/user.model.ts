import {Property, Url} from "@tsed/schema";

export class User {
    @Property()
    public id: number = 0;

    @Property()
    public username: string = "";

    @Property()
    public password: string = "";

    @Property()
    public firstName?: string = "";

    @Property()
    public lastName?: string = "";

    @Property()
    public gender: string = "";

    @Url()
    @Property()
    public image: string = "";

    constructor(id: number, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public checkCredentials(username: string, password: string): boolean {
        return this.username === username && this.password === password;
    }
}
