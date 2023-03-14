import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'mkurs_diet_diary',
    namedPlaceholders: true,
    decimalNumbers: true,
})