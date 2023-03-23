export class CategoryRecord {
    constructor(name: string, id?: number) {
        this._name = name;
        if (id != undefined) this._id = id
    }

    private _id?: number;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    private _name: string

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}