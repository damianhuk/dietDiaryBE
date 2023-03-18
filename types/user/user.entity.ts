export interface UserEntity {
    id?: string;
    login: string;
    password: string;
    name: string;
    created?: Date;
    protein?: number;
    fat?: number;
    carbs?: number;
    kcal?: number;
    weightDiary?: WeightDiaryRecord[] | null;
}

export type WeightDiaryRecord = { weight: number, created: Date }