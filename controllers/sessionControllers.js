import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import connectionSQL from "../dbSQL.js";

export async function signUp(req, res){
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    try{
        await connectionSQL.query(`
            INSERT INTO users
            (username, email, password)
            VALUES
            ($1, $2, $3)
        `, [name, email, hashPassword]);
        res.sendStatus(201);
    } catch (e) {
        res.status(422).send(e);
    }
};

export async function signIn(req, res){
    const { id } = res.locals.user;
    const key = process.env.TOKEN_KEY;
    const token = jwt.sign(id, key);
    res.status(200).send(token);
};