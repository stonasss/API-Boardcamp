import { db } from "../config/database.js";

export async function getGames(req, res) {
    try {
        const games = await db.query("SELECT * FROM games");
        res.send(games.rows);
    } catch (err) {
        res.status(500).sendStatus(err.message);
    }
}

export async function postGames(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body;

    /*const nameExists = await db.query(`
        SELECT * FROM games WHERE name = $1`,
        [name]
    );
    if (nameExists) return res.sendStatus(409)*/

    try {
        const newGame = await db.query(`
            INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4);`,
            [name, image, stockTotal, pricePerDay]
        );
        
        console.log(newGame.rows);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).sendStatus(err.message);
    }
}
