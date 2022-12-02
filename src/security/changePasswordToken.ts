
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config();

export function generateForgotKey(id:number,email:string){


    const token = jwt.sign(
        { user_id:id, email:email },
        String(process.env.FORGOT_KEY),
        {
          expiresIn: "0.5h",
        }
      );

     return  token;
}


export function validateForgotKey(token:string){
    
    let decoded;

    try{
        decoded = jwt.verify(token, String(process.env.FORGOT_KEY));
    } catch (e) {
        console.log(e)
        return null;
    }

    return decoded;

}

