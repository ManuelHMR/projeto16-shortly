import connectionSQL from "../dbSQL.js";

export async function getUser(req, res){
    const { id } = req.params;
    const { user } = res.locals;
    try {
        const query = await connectionSQL.query(`
            SELECT urls.id, urls."shortUrl", urls.url, urls.visits
            FROM urls
            WHERE urls."userId"=$1;
        `, [ id ]); 
        const { rows } = query;
        const data = {...user, shortenedUrls: rows};
        res.status(200).send(data);
    } catch (e) {
        res.send(e);
    };
};