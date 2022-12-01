import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import authenticate from "./routes/authenticate"
import register from "./routes/register"
import acticate from "./routes/activate"
import forgot from "./routes/forgot"
import chpass from "./routes/chpass"

import Database from "./database/database";


Database.getInstance();

dotenv.config();

const app: Express = express();

app.use(express.json())

app.use('/',[authenticate,register,acticate,forgot,chpass]);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});