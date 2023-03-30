import express, {json, Request, Response} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";

require('dotenv').config()

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use(json());

app.get('/', async (req: Request, res: Response) => {

})

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})
