import express, {json, Request, Response} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import {UserRecord} from "./records/user.record";

require('dotenv').config()

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use(json());

app.get('/', async (req: Request, res: Response) => {
    const user = new UserRecord({
        name: 'Testowanie wstawianai 2 rekoródw',
        login: 'Tester123',
        password: 'asdasd',
    });
    console.log(await user.insert());
})

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})
