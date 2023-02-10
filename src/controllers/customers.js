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

    const customerExists = await db.query(`
        SELECT * FROM customers WHERE id = $1`,
        [id]
    )

    if (!customerExists.rows.length > 0) return res.sendStatus(404).send("Customer does not exist!");

    try {
        const customerCPF = customerExists.rows[0].cpf

        if (customerCPF !== cpf) {
            
            const cpfInUse = await db.query(`
                SELECT * FROM customers WHERE "cpf" = $1`
                [cpf]
            );
            if (cpfInUse.rows.length > 0) return res.sendStatus(409).send("CPF already in use!");

            await db.query(`
                UPDATE customers 
                SET name=${name}, 
                phone=${phone}, 
                cpf=${cpf}, 
                birthday=${birthday} 
                WHERE id=${id}`);
            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}