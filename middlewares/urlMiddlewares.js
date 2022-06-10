import joi from "joi";
import connectionSQL from "../dbSQL.js";

const urlSchema = joi.object({
    url: joi.string().uri().trim().required()
});

export async function urlValidation (req, res, next){
    const validation = urlSchema.validate(req.body);
    if(validation.error){
        const errorArr = validation.error.details;
        return res.status(422).send(errorArr.map((e) => {return e.message}));
    };
    next();
};

export async function shortUrlMiddleware(req, res, next){
    const { shortUrl } = req.params;
    try {
        const data = await connectionSQL.query(`
            SELECT * 
            FROM urls
            WHERE "shortUrl" = $1; 
        `, [shortUrl]);
        const {rows} = data;
        if( rows.length === 0 ) {
            return res.sendStatus(404);
        };
        res.locals.data = rows[0];
        next();
    } catch (e) {
        res.send(e);
    };
}