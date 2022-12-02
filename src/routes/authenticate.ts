import express from 'express'

import Database from '../database/database';

import LoginBody from "../models/LoginModel"
import UserModel from "../models/UserModel"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { compare } from '../security/passwordEncoder';
dotenv.config();

const router = express.Router();

const db = Database.getInstance();

router.post('/authenticate',async (req,res)=>{

    const data:LoginBody = req.body;

    const exists:Boolean = await db.existsByEmail(data.email);

    if(exists){
        
        const user:UserModel =  await db.getByEmial(data.email);
        
        const email = user.email;

        if(await compare(data.password,user.password) && user.active){
            const token = jwt.sign(
                { user_id: user.id, email },
                String(process.env.TOKEN_KEY),
                {
                  expiresIn: "2h",
                }
              );
              res.status(200)
              res.send({"token": token});
        }else{
            res.status(401)
            res.send("Unathorized");
        }
    }else{
        res.status(401)
        res.send("Unathorized");
    }    
})

export default router;