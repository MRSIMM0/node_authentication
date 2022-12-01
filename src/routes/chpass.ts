import express from 'express'
import Database from '../database/database';
import { validateForgotKey } from '../security/changePasswordToken';

const database = Database.getInstance();

const router = express.Router();

router.post('/chpass/:token',async (req,res)=>{

    const token = req.params.token;

    const newPass = req.body.new_password;

    const userData : any = validateForgotKey(token);


    const db_token = await database.getTokenByEmail(userData.email)

    if(db_token.token === token){
        console.log(newPass);
        database.changePassword(userData.email,await newPass);
        database.deleteToken(userData.user_id)
    }

    res.send();
})

export default router;