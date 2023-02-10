import { db } from "../config/database.js";

export async function getCustomers(req, res) {
    try {
        const customers = await db.query("SELECT * FROM customers");
        res.send(customers.rows);
    } catch (err) {
        res.status(500).sendStatus(err.message);
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params;

    try {
        const customerId = await db.query(`
            SELECT * FROM customers WHERE id = $1`,
            [id]
        );

        if (!customerId.rowCount) return res.sendStatus(404).send("Customer does not exist!");
        return res.send(customerId.rows[0]);

    } catch (err) {
        res.status(500).sendStatus(err.message);
    }
}

export async function postCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    const cpfExists = await db.query(
        `SELECT * FROM customers WHERE cpf = $1`,
        [cpf]
    );

    if (cpfExists.rows.length > 0)
        return res.sendStatus(409).send("CPF already exists!");

    try {
        const newCustomer = await db.query(`
            INSERT INTO customers (name, "phone", "cpf", "birthday")
            VALUES ($1, $2, $3, $4)`,
            [name, phone, cpf, birthday]
        );

        console.log(newCustomer.rows[0]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).sendStatus(err.message);
    }
}

export async function updateCustomer(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    try {
        const cpfExists = await db.query(`
            SELECT * FROM customers WHERE cpf = $1 AND id <> $2`,
            [cpf, id]
        )
        if (cpfExists.rows.length > 0) return res.status(409).send("Customer already exists!");

        await db.query(`
            UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`,
            [name, phone, cpf, birthday, id]
        );
        res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message);
    }
}