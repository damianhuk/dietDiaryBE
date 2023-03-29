export class ProductRecord {
    constructor(name: string, protein: number, fat: number, carbs: number, kcal: number, userId: string, id?: number) {
        if (id != undefined) this._id = id;
        this._name = name;
        this._protein = protein;
        this._fat = fat;
        this._carbs = carbs;
        this._kcal = kcal;
        this._userId = userId;
    }

    private _id?: number;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private _protein: number;

    get protein(): number {
        return this._protein;
    }

    set protein(value: number) {
        this._protein = value;
    }

    private _fat: number;

    get fat(): number {
        return this._fat;
    }

    set fat(value: number) {
        this._fat = value;
    }

    private _carbs: number;

    get carbs(): number {
        return this._carbs;
    }

    set carbs(value: number) {
        this._carbs = value;
    }

    private _kcal: number;

    get kcal(): number {
        return this._kcal;
    }

    set kcal(value: number) {
        this._kcal = value;
    }

    private _userId: string;

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }
}