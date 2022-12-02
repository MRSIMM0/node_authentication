import express from "express";
import { JwtPayload } from "jsonwebtoken";
import Database from "../database/database";
import { validateActivationKey } from "../security/activationLink";
import { generateForgotKey } from "../security/changePasswordToken";
import sendMail from "../utils/mailer"

const database = Database.getInstance();

const router = express.Router();

router.post("/forgot", async (req, res) => {
  const data = req.body;

  const exists: Boolean = await database.existsByEmail(data.email);

  if (exists) {
    const user = await database.getByEmial(data.email);

    const db_token = await database.getTokenByEmail(user.email);

    if (db_token == undefined) {
      const token = generateForgotKey(user.id, data.email);
      database.saveToknen(user.id, token);


    //here shopud be redirection to frontend
      sendMail("reset password","http://localhost:3000/pass/" + token,data.email)
      res.send();
    } else {
      res.send("Account has not been activated or link has already been sent");
    }
  } else {
    res.send("asdasd");
  }
});

export default router;
