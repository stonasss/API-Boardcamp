import { db } from "../config/database.js";

export async function getRentals(req, res) {
    try {
        const rentals = await db.query("SELECT * FROM rentals");
        res.send(rentals.rows);
    } catch (err) {
        res.status(500).sendStatus(err.message);
    }
}