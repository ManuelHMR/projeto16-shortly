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

export async function getRanking (req, res){
    try {
        const query = await connectionSQL.query(`
            SELECT 
                users."id", 
                users.username, 
                COUNT(urls."userId") as "linksCount", 
                COALESCE(SUM(urls.visits),0) as "visitCount"
            FROM users
            LEFT JOIN urls ON users."id" = urls."userId"
            GROUP BY users."id"
            ORDER BY "visitCount" DESC, "linksCount" DESC
            LIMIT 10;
        `);
        const ranking = query.rows;
        res.status(200).send(ranking);
    } catch (error) {
        res.send('Não foi possível conectar ao Banco');
        console.log(error);
    }
};