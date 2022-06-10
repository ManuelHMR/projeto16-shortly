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

export async function getUrlById (req,res){
    const { id } = req.params;
    try{
        const data = await connectionSQL.query(`
            SELECT urls.id, urls."shortUrl", urls.url
            FROM urls
            WHERE urls.id = $1
        `, [id]);
        res.status(200).send(data.rows[0])
    }catch (e){
        res.status(404).send(e);
    }
};

export async function openUrl (req, res){
    const {id, visits, url} = res.locals.data;
    const views = Number(visits) + 1;
    try{
        await connectionSQL.query(`
            UPDATE urls
            SET visits = $1
            WHERE id = $2
        `, [views, id]);
        res.redirect(url)
    }catch(e){
        res.send(e)
    }
};