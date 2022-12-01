import express from 'express'
import { request } from 'http';
const router = express.Router();

import Database from "../database/database";

import RegisterBody from "../models/RegisterModel"

import {encode} from "../security/passwordEncoder"

import {generateActivationKey} from "../security/activationLink"

const database:Database = Database.getInstance();

router.post('/register',async (req,res)=>{
 
    const data:RegisterBody = req.body;

    const exists:Boolean = await database.existsByEmail(data.email);

    data.password = await encode(data.password);

    if(exists){
        res.status(409);
        res.send("Email already exists");
        return;
    }
    await database.createUser(data);

    const createduser = await database.getByEmial(data.email)
    const token = generateActivationKey(createduser.id,createduser.email)

    database.saveToknen(createduser.id,token);

    res.send("http://localhost:3000/activate/"+token);


})

export default router;