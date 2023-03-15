import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {createHash} from "../utils/hash";

class UserRecord {
    private _id: string;
    private _login: string;
    private _password: string;
    private _name: string;
    private _created?: Date;
    private _protein?: number;
    private _fat?: number;
    private _carbs?: number;
    private _kcal?: number;
    private _weight?: [number];

    constructor(obj: UserRecord) {
        obj.id ? this._id = obj.id : this._id = uuid();
        this._login = obj.login;
        this._name = obj.name;
        obj.created ? this._created = obj.created : this._created = new Date();
        if (obj.protein) this._protein = obj.protein;
        if (obj.fat) this._fat = obj.fat;
        if (obj.carbs) this._carbs = obj.carbs;
        if (obj.kcal) this._kcal = obj.kcal;
        if (obj.weight) this._weight = obj.weight;
    }

    async insert(): Promise<string> {
        try {
            await pool.execute(
                "INSERT INTO `users`(`id`, `login`, `password`, `name`, `created`) VALUES(:id, :login, :password, :name, :created)", {
                    id: this._id,
                    login: this._login,
                    password: createHash(this._password, process.env.passwordSALT),
                    name: this._name,
                    created: this._created,
                });
            return this._id;
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function Insert for User');
        }
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get login(): string {
        return this._login;
    }

    set login(value: string) {
        this._login = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get created(): Date {
        return this._created;
    }

    set created(value: Date) {
        this._created = value;
    }

    get protein(): number {
        return this._protein;
    }

    set protein(value: number) {
        this._protein = value;
    }

    get fat(): number {
        return this._fat;
    }

    set fat(value: number) {
        this._fat = value;
    }

    get carbs(): number {
        return this._carbs;
    }

    set carbs(value: number) {
        this._carbs = value;
    }

    get kcal(): number {
        return this._kcal;
    }

    set kcal(value: number) {
        this._kcal = value;
    }

    get weight(): [number] {
        return this._weight;
    }

    set weight(value: [number]) {
        this._weight = value;
    }
}