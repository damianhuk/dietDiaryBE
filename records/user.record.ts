import {v4 as uuid} from "uuid";


class UserRecord {
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

    private _id: string;

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    private _login: string;

    get login(): string {
        return this._login;
    }

    set login(value: string) {
        this._login = value;
    }

    private _password: string;

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private _created?: Date;

    get created(): Date {
        return this._created;
    }

    set created(value: Date) {
        this._created = value;
    }

    private _protein?: number;

    get protein(): number {
        return this._protein;
    }

    set protein(value: number) {
        this._protein = value;
    }

    private _fat?: number;

    get fat(): number {
        return this._fat;
    }

    set fat(value: number) {
        this._fat = value;
    }

    private _carbs?: number;

    get carbs(): number {
        return this._carbs;
    }

    set carbs(value: number) {
        this._carbs = value;
    }

    private _kcal?: number;

    get kcal(): number {
        return this._kcal;
    }

    set kcal(value: number) {
        this._kcal = value;
    }

    private _weight?: [number];

    get weight(): [number] {
        return this._weight;
    }

    set weight(value: [number]) {
        this._weight = value;
    }
}