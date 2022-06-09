import bcrypt from "bcrypt";
import joi from "joi";

import connectionSQL from "../dbSQL.js";

const schema = joi.object({
    name: joi.string(),
    email: joi.string(),
    password: joi.string(),
    confirmPassword: joi.ref('password')
});

export async function signUp(req, res){
    const validation = schema.validate(req.body);
    if(validation.error){
        return res.send(validation.error.details).status(422);
    };
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
        res.send(e).status(422);
    }
};

export async function signIn(req, res){

};
