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

    static async getOne(id: number): Promise<CategoryRecord> {
        try {
            const [results] = await pool.execute(
                "SELECT *  FROM `categories` WHERE `id` = :id", {
                    id
                }) as CategoryRecordResults;
            return results.length === 0 ? null : new CategoryRecord(results[0].name, results[0].id)
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function getOne for Category');
        }
    }

    static async getAll(): Promise<CategoryRecord[]> {
        try {
            const [results] = await pool.execute("SELECT *  FROM `categories`") as CategoryRecordResults;
            return results.length === 0 ? null : results.map(obj => new CategoryRecord(obj.name, obj.id))
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function getAll for Category');
        }
    }

    async update(): Promise<void> {
        try {
            await pool.execute(
                "UPDATE `categories` SET `name` = :name WHERE `id` = :id", {
                    name: this._name,
                    id: this._id
                }
            )
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function Update for Category');
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