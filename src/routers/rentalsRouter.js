import { Router } from "express";
import { getRentals, postRentals } from "../controllers/rentals.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalsSchema } from "../schemas/rentalsSchema.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateSchema(rentalsSchema), postRentals);

export default rentalsRouter;