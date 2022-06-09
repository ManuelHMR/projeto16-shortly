import bcrypt from "bcrypt";

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
    const {email, password} = req.body;
     
    bcrypt.compareSync(password, user.password)


};
