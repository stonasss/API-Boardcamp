import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gamesRouter from "./routers/gamesRouter.js";
import customersRouter from "./routers/customersRouter.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use([gamesRouter, customersRouter])

app.listen(PORT, () => {
    console.log(`Servidor aberto no port ${PORT}`);
});
