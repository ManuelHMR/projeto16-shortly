import joi from "joi";

const urlSchema = joi.object({
    url: joi.string().required()
});

export async function urlValidation (req, res, next){
    const validation = urlSchema.validate(req.body);
    if(validation.error){
        const errorArr = validation.error.details;
        return res.status(422).send(errorArr.map((e) => {return e.message}));
    };
    next();
};