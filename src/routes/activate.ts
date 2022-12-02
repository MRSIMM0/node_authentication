import express from "express";
import { JwtPayload } from "jsonwebtoken";
import Database from "../database/database";
import { validateActivationKey } from "../security/activationLink";

const database = Database.getInstance();

const router = express.Router();

router.get("/activate/:token", async (req, res) => {
  const token = req.params.token;

  const userData: any = validateActivationKey(token);

  const db_token = await database.getTokenByEmail(userData.email);

if(db_token === undefined){
    res.status(401);
    res.send("Invalid Link");
    return
}

  if (db_token.token === token) {
    database.deleteToken(userData.user_id).catch(err=>{console.log(err)});
    database.setActive(userData.email).catch(err=>{console.log(err)});
    res.send("Account activated");
  } else {
    res.status(401);
    res.send("Invalid Link");
  }
});

export default router;
