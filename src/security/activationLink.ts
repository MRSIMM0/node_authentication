
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config();

export function generateActivationKey(userId:number,email:string){


    const token = jwt.sign(
        { user_id: userId, email },
        String(process.env.ACTIVATION_KEY),
        {
          expiresIn: "1h",
        }
      );

     return  token;
}


export function validateActivationKey(token:string){
    
    let decoded;

    try{
        decoded = jwt.verify(token,  String(process.env.ACTIVATION_KEY));
    } catch (e) {
        return null;
    }

    return decoded;

}

