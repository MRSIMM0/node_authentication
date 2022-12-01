import express from 'express'
import { JwtPayload } from 'jsonwebtoken';
import Database from '../database/database';
import {validateActivationKey} from "../security/activationLink"
import { generateForgotKey } from '../security/changePasswordToken';

const database = Database.getInstance();

const router = express.Router();

router.post('/forgot',async (req,res)=>{

    const data = req.body;

    const exists:Boolean = await database.existsByEmail(data.email);
    if(exists){
    const user = await database.getByEmial(data.email);
    const token = generateForgotKey(data.id,data.email)
    database.saveToknen(user.id,token);
    res.send("http://localhost:3000/chpass/"+token);
    }else{
        res.send("asdasd")
    }
    
})

export default router;