import { Router } from "express";
import {
    deleteRentals,
    getRentals,
    postRentals,
    returnRentals,
} from "../controllers/rentals.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalsSchema } from "../schemas/rentalsSchema.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateSchema(rentalsSchema), postRentals);
rentalsRouter.post("/rentals/:id/return", returnRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;
