import connectionSQL from "../dbSQL.js";

export async function userMiddleware (req, res, next){
    const { id } = req.params;
    try {
        const query = await connectionSQL.query(`
            SELECT users.id, users.username, COALESCE(SUM(urls.visits),0) as "visitCount" 
            FROM users
            LEFT JOIN urls ON users.id = urls."userId"
            WHERE users.id=$1 
            GROUP BY users.id;
        `, [ id ]);
        const { rows } = query;
        if( rows.length === 0 ) {
            return res.sendStatus(404);
        };
        res.locals.user = rows[0];
        next();
    } catch (e) {
        res.send(e);
    };
};