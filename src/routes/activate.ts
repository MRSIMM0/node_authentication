import express from 'express'
import { JwtPayload } from 'jsonwebtoken';
import Database from '../database/database';
import {validateActivationKey} from "../security/activationLink"

const database = Database.getInstance();

const router = express.Router();

router.get('/activate/:token',async (req,res)=>{

    const token = req.params.token;

    const userData : any = validateActivationKey(token);

    const db_token = await database.getTokenByEmail(userData.email)


    if(db_token.token === token){
        database.setActive(userData.user_id);
        database.deleteToken(userData.email);
    }

    res.send("Account activated");
})

export default router;