import express, {json, Request, Response} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import {CategoryRecord} from "./records/category.record";

require('dotenv').config()

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use(json());

app.get('/', async (req: Request, res: Response) => {
    /* const user = new UserRecord({
         name: 'Testowanie wstawianai wagi',
         login: 'waga',
         password: 'asdasd',
         weight: [99]
     });
     console.log(await user.insert());
    const test = await UserRecord.getOne('b957d1f3-3abe-4353-b7eb-e19eaf3c7502');
    //const test = await UserRecord.getAll();
    console.log(test);*/
    /*
        const category = new CategoryRecord('Testwowanko');
        await category.insert();*/
    //const category = await CategoryRecord.getOne(2);
    //const category = await CategoryRecord.getAll();
    /*category.name = 'Update';
    await category.update();
    console.log(category);*/
    const category = new CategoryRecord('test');
    await category.insert();
    let categories = await CategoryRecord.getAll();
    console.log(categories);
    console.log('=================')
    await category.delete();
    categories = await CategoryRecord.getAll();
    console.log(categories)
})

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})
