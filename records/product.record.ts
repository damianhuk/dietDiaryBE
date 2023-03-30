import {pool} from "../utils/db";
import {FieldPacket, ResultSetHeader} from "mysql2/index";

type ProductRecordResults = [ProductRecord[], FieldPacket[]];
export class ProductRecord {
    private _id?: number;
    private _name: string;
    private _protein: number;
    private _fat: number;
    private _carbs: number;
    private _kcal: number;
    private _userId: string;

    constructor(categoryId: number, name: string, protein: number, fat: number, carbs: number, kcal: number, userId: string, id?: number) {
        if (id != undefined) this._id = id;
        this._categoryId = categoryId;
        this._name = name;
        this._protein = protein;
        this._fat = fat;
        this._carbs = carbs;
        this._kcal = kcal;
        this._userId = userId;
    }

    private _categoryId: number;

    get categoryId(): number {
        return this._categoryId;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    set categoryId(value: number) {
        this._categoryId = value;
    }

    async insert(): Promise<void> {
        try {
            const [results] = (await pool.execute(
                "INSERT INTO `products` (`categoryId`, `name`, `protein`, `fat`, `carbs`, `kcal`, `userId`) VALUES (:categoryId, :name, :protein, :fat, :carbs, :kcal, :userId)", {
                    categoryId: this._categoryId,
                    name: this._name,
                    protein: this._protein,
                    fat: this._fat,
                    carbs: this._carbs,
                    kcal: this._kcal,
                    userId: this._userId
                }
            )) as [ResultSetHeader, FieldPacket[]];
            this._id = results.insertId;
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function Insert for Product');
        }
    }

    async update(): Promise<void> {
        try {
            await pool.execute(
                "UPDATE `products` SET `categoryId` = :categoryId, `name` = :name, `protein` = :protein, `fat` = :fat, `carbs` = :carbs, `kcal` = :kcal WHERE `products`.`id` = :id", {
                    categoryId: this._categoryId,
                    name: this._name,
                    protein: this._protein,
                    fat: this._fat,
                    carbs: this._carbs,
                    kcal: this._kcal,
                    id: this._id
                }
            )
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function Update for Product');
        }
    }

    async delete(): Promise<void> {
        try {
            await pool.execute(
                "DELETE FROM `products` WHERE `products`.`id` = :id", {
                    id: this._id
                }
            )
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function Delete for Product');
        }
    }

    static async getOne(id: number): Promise<ProductRecord> | null {
        try {
            const [results] = (await pool.execute(
                "SELECT * FROM `products` WHERE `id`= :id", {
                    id
                }
            )) as ProductRecordResults;

            return results.length === 0 ? null : new ProductRecord(results[0].categoryId, results[0].name, results[0].protein, results[0].fat, results[0].carbs, results[0].kcal, results[0].userId, results[0].id)
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function getOne for Product');
        }
    }

    static async getAll(): Promise<ProductRecord[]> {
        try {
            const [results] = await pool.execute("SELECT *  FROM `products`") as ProductRecordResults;
            return results.length === 0 ? null : results.map(obj => new ProductRecord(obj.categoryId, obj.name, obj.protein, obj.fat, obj.carbs, obj.kcal, obj.userId, obj.id))
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function getAll for Product');
        }
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
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

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }
}