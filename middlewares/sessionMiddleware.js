import joi from "joi";
import bcrypt from "bcrypt";
import connectionSQL from "../dbSQL.js";

const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
});

const signInSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});

export async function signUpValidation (req, res, next){
    const validation = signUpSchema.validate(req.body,  {abortEarly: false});
    if(validation.error){
        const errorArr = validation.error.details;
        return res.status(422).send(errorArr.map((e) => {return e.message}));
    };
    next();
};

export async function signInValidation (req, res, next){
    const validation =  signInSchema.validate(req.body,  {abortEarly: false});
    if(validation.error){
        const errorArr = validation.error.details;
        return res.status(422).send(errorArr.map((e) => {return e.message}));
    };
    next();
};

export async function signInVerification (req, res, next){
    const {email, password} = req.body;
    try{
        const userData = await connectionSQL.query(`
            SELECT *
            FROM users
            WHERE email = $1
        `, [email]);
        if(userData.rowCount === 0 ){
            const message = "usuario ou senha incorretas";
            return res.status(401).send({message});
        }
        const dataVerification = bcrypt.compareSync(password, userData.rows[0].password);
        if(!dataVerification){
            const message = "usuario ou senha incorretas";
            return res.status(401).send({message});
        }
        delete userData.rows[0].password;
        res.locals.user = userData.rows[0];
    }catch (e){
        res.send(e)
    }
    next();
};