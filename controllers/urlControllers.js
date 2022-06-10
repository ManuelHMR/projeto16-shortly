import connectionSQL from "../dbSQL.js";
import { nanoid } from "nanoid";

export async function postUrl (req, res){
    console.log("Passou do middleware")
    const userId = res.locals.userId;
    const { url } = req.body;
    const shortUrl = nanoid(8);
    try {
        await connectionSQL.query(`
            INSERT INTO urls
            (url, "shortUrl", "userId")
            VALUES ($1, $2, $3) 
        `, [url, shortUrl, userId]);
        res.status(201).send(shortUrl);
    } catch (e) {
        res.send(e)
    }
};