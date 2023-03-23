import {pool} from "../utils/db";
import {FieldPacket} from "mysql2/index";

type CategoryRecordResults = [CategoryRecord[], FieldPacket[]];

export class CategoryRecord {
    constructor(name: string, id?: number) {
        this._name = name;
        if (id != undefined) this._id = id
    }

    async insert(): Promise<void> {
        try {
            await pool.execute(
                "INSERT INTO `categories` (`name`) VALUES (:name)", {
                    name: this._name
                }
            )
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function Insert for Category');
        }
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