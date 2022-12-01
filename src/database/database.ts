import dotenv from 'dotenv';
import { Pool } from 'pg'
import RegisterBody from "../models/RegisterModel"
export default class Database{

    private static connection:Database | undefined = undefined;

    private client:Pool;

    

    private constructor(){

        console.log(process.env.DB_HOST)

        this.client = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT || "5432"),
          });

          const connectToDB = async () => {
            try {
              await this.client.connect();
            } catch (err) {
              console.log(err);
            }
          };

          connectToDB();
        
          this.client.connect();

          console.log("Connected")
    }

    static getInstance(){
        if(this.connection === undefined){
            this.connection = new Database();
        }
        return this.connection;
    }


    async existsByEmail(email:string){
        return await this.client.query("SELECT 1 FROM cuser WHERE email=$1 LIMIT 1",[email]).then(res=>res.rows[0]!==undefined).catch(err=>false)
    }

    async getByEmial(email:string){
        return await this.client.query("SELECT * FROM cuser WHERE email=$1 LIMIT 1",[email]).then(res=>res.rows[0]);
    }

    async createUser(user:RegisterBody){
        return await this.client.query("INSERT INTO cuser (username, password,email,active) VALUES ($1,$2,$3,$4)",[user.username,user.password,user.email,false]);
    }

    async saveToknen(userId:number,token:string){
        return await this.client.query("INSERT INTO token (token, cuser_id) VALUES ($1,$2)",[token,userId]);
    }

    async deleteToken(id:number){
        return await this.client.query("DELETE FROM token WHERE cuser_id = $1",[id]);

    }

    async getTokenByEmail(email:string){
        return await this.client.query("SELECT token FROM token LEFT JOIN cuser ON token.cuser_id = cuser.id WHERE cuser.email = $1;",[email]).then(res=>res.rows[0]);

    }

    async setActive(email:string){
        return this.client.query("UPDATE cuser SET active=true WHERE email=$1",[email]);    
    }

    async changePassword(email:string,password:string){
        return this.client.query("UPDATE cuser SET password=$1 WHERE email=$2",[password,email]);    

    }


}   