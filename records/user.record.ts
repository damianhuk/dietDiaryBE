import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {createHash} from "../utils/hash";
import {UserEntity, WeightDiaryRecord} from "../types/user/user.entity";
import {FieldPacket} from "mysql2";

type UserRecordResults = [UserRecord[], FieldPacket[]];
type WeightDiaryResults = [WeightDiaryRecord[], FieldPacket[]]


export class UserRecord {
    private _login: string;
    private _password: string;
    private _name: string;
    private _created?: Date;
    private _protein?: number;
    private _fat?: number;
    private _carbs?: number;
    private _kcal?: number;
    private _weightDiary?: WeightDiaryRecord[] | null = null;

    private _id?: string;

    constructor(obj: UserEntity) {
        this._login = obj.login;
        this._name = obj.name;
        this._password = obj.password;
        (obj.id != undefined) ? this._id = obj.id : this._id = uuid();
        (obj.created != undefined) ? this._created = obj.created : this._created = new Date();
        if (obj.protein != undefined) this._protein = obj.protein;
        if (obj.fat != undefined) this._fat = obj.fat;
        if (obj.carbs != undefined) this._carbs = obj.carbs;
        if (obj.kcal != undefined) this._kcal = obj.kcal;
        if (obj.weightDiary != null) this._weightDiary = obj.weightDiary;
    }

    get id(): string | undefined {
        return this._id;
    }

    set id(value: string | undefined) {
        this._id = value;
    }

    get created(): Date | undefined {
        return this._created;
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

    set created(value: Date | undefined) {
        this._created = value;
    }

    get protein(): number | undefined {
        return this._protein;
    }

    set protein(value: number | undefined) {
        this._protein = value;
    }

    get fat(): number | undefined {
        return this._fat;
    }

    set fat(value: number | undefined) {
        this._fat = value;
    }

    get carbs(): number | undefined {
        return this._carbs;
    }

    set carbs(value: number | undefined) {
        this._carbs = value;
    }

    get kcal(): number | undefined {
        return this._kcal;
    }

    set kcal(value: number | undefined) {
        this._kcal = value;
    }

    get weightDiary(): WeightDiaryRecord[] | null {
        return this._weightDiary;
    }

    set weightDiary(value: WeightDiaryRecord[] | null) {
        this._weightDiary = value;
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
            await pool.execute(
                "INSERT INTO `user_details`(`userId`) VALUES(:userId)", {
                    userId: this._id,
                });
            return this._id;
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function Insert for User');
        }
    }

    async update(changePassword: boolean = false): Promise<void> {
        try {
            if (changePassword) {
                await pool.execute(
                    "UPDATE `users` SET `password` = :password WHERE `id` = :id", {
                        password: createHash(this._password, process.env.passwordSALT),
                        id: this._id
                    }
                )
            }

            await pool.execute(
                "UPDATE `user_details` SET `protein` = :protein, `fat` = :fat, `carbs` = :carbs, `kcal` = :kcal WHERE `userId` = :id", {
                    id: this._id,
                    fat: this._fat,
                    protein: this._protein,
                    carbs: this._carbs,
                    kcal: this._kcal
                }
            )
            await pool.execute(
                "INSERT INTO `user_weight_progress`(`userId`, `weight`, `created`) VALUES(:userId, :weight, :created)", {
                    userId: this._id,
                    weight: this._weightDiary[this._weightDiary.length - 1].weight,
                    created: this._weightDiary[this._weightDiary.length - 1].created,
                });
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function Update for User');
        }
    }

    async delete(): Promise<void> {
        try {
            await pool.execute(
                "DELETE FROM `users` WHERE `id` =:id", {
                    id: this._id
                }
            )
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function Delete for User');
        }
    }

    static async getOne(id: string): Promise<UserRecord> | null {
        try {
            const [results] = await pool.execute(
                "SELECT `users`.`id`, `users`.`login`, `users`.`password`, `users`.`name`, `users`.`created`, `user_details`.`protein`, `user_details`.`fat`, `user_details`.`carbs`, `user_details`.`kcal`  FROM `users` JOIN `user_details` ON `user_details`.`userId` = `users`.`id` WHERE `users`.`id` = :userId", {
                    userId: id
                }) as UserRecordResults;

            if (results.length === 0) return null;

            const user: UserRecord = new UserRecord(results[0]);

            const [result2] = await pool.execute(
                "SELECT `user_weight_progress`.`weight`, `user_weight_progress`.`created` FROM `user_weight_progress` WHERE `user_weight_progress`.`userId` = :userId", {
                    userId: id
                }) as WeightDiaryResults;
            user.weightDiary = result2.length - 1 > 0 ? [...result2] : null
            return user
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function getOne for User');
        }
    }

    static async getAll(): Promise<UserRecord[]> | null {
        try {
            const [results] = await pool.execute(
                "SELECT `users`.`id`, `users`.`login`, `users`.`password`, `users`.`name`, `users`.`created`, `user_details`.`protein`, `user_details`.`fat`, `user_details`.`carbs`, `user_details`.`kcal`  FROM `users` JOIN `user_details` ON `user_details`.`userId` = `users`.`id`"
            ) as UserRecordResults;

            if (results.length === 0) return null;

            const users = results.map(obj => new UserRecord(obj));
            const [result2] = await pool.execute("SELECT * FROM `user_weight_progress`") as WeightDiaryResults;
            users.map(el => {
                result2.forEach(el2 => {
                    if (el.id === el2.userId) {
                        const {weight, created} = el2
                        el.weightDiary === null ? el.weightDiary = [{weight, created}] : el.weightDiary.push({
                            weight,
                            created
                        })
                    }
                })
            })
            return users;
        } catch (e) {
            console.log(e)
            throw new Error('Something gone wrong in function getAll for User');
        }
    }
}