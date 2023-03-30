import {pool} from "../utils/db";
import {FieldPacket, ResultSetHeader} from "mysql2/index";
import {ProductRecord} from "./product.record";

type CategoryRecordResults = [CategoryRecord[], FieldPacket[]];

export class CategoryRecord {
    private _name: string
    private _id?: number;
    private _products?: ProductRecord[] | null;

    constructor(name: string, id?: number) {
        this._name = name;
        if (id != undefined) this._id = id
    }

    async insert(): Promise<void> {
        try {
            const [results] = (await pool.execute(
                "INSERT INTO `categories` (`name`) VALUES (:name)", {
                    name: this._name
                }
            )) as [ResultSetHeader, FieldPacket[]]
            this._id = results.insertId;
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function Insert for Category');
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

    async delete(): Promise<void> {
        try {
            await pool.execute(
                "DELETE FROM `categories` WHERE `id` =:id", {
                    id: this._id
                }
            )
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function Delete for Category');
        }
    }

    get products(): ProductRecord[] | null {
        return this._products;
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

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    set products(value: ProductRecord[] | null) {
        this._products = value;
    }

    async getProducts(): Promise<void> {
        try {
            const [results] = await pool.execute("SELECT *  FROM `products` WHERE `categoryId` = :id", {
                id: this._id
            }) as [ProductRecord[], FieldPacket[]];
            this.products = results.map(obj => new ProductRecord(obj.categoryId, obj.name, obj.protein, obj.fat, obj.carbs, obj.kcal, obj.userId, obj.id))
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function getProducts for Category');
        }
    }
}