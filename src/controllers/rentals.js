import { db } from "../config/database.js";
import  dayjs from "dayjs";

export async function getRentals(req, res) {
    try {
        const rentals = await db.query("SELECT * FROM rentals");
        res.send(rentals.rows);
    } catch (err) {
        res.status(500).sendStatus(err.message);
    }
}

export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const dateOfRental = dayjs(Date.now()).format("YYYY-MM-DD");
    
    try{
        const customerExists = await db.query(
            `SELECT * FROM customers WHERE id = $1`, [customerId]);
        const gameExists = await db.query(
            `SELECT * FROM games WHERE id = $1`, [gameId]);        
        if (!customerExists.rows.length > 0 || !gameExists.rows.length > 0) {
            return res.status(400).send("Invalid information!");
        }

        const { pricePerDay } = gameExists.rows[0];
        const totalValue = pricePerDay * daysRented;
        
        const totalRentals = await db.query(
            `SELECT * FROM rentals WHERE "gameId" = $1`, [gameId]);
        const currentStock = await db.query(
            `SELECT "stockTotal" FROM games WHERE id = $1`, [gameId]);
        if (currentStock.rows[0].stockTotal <= totalRentals.rowCount) {
            return res.status(400).send("Game not in stock!");
        }

        await db.query(
            `INSERT INTO rentals
            ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                customerId,
                gameId,
                dateOfRental,
                daysRented,
                null,
                totalValue,
                null,
            ]
        );
        return res.status(201).send("Rental registered!");

    } catch (err) {
        res.status(500).sendStatus(err.message);
    }
}