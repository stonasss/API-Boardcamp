import express from "express";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Servidor aberto no port ${PORT}`);
});
