import joi from "joi";

const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
});

export async function signUpValidation (req, res, next){
    const validation = schema.validate(req.body);
    if(validation.error){
        return res.status(422).send(validation.error.details);
    };
    next();
}