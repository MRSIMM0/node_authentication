import dotenv from 'dotenv';
import { Pool } from 'pg'

export class Database{

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
    }

    static getInstance(){
        if(this.connection === undefined){
            this.connection = new Database();
        }
        return this.connection;
    }




}