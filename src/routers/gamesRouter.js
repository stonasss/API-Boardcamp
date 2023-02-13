import { Router } from "express";
import { getGames, postGames } from "../controllers/games.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { gamesSchema } from "../schemas/gamesSchema.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateSchema(gamesSchema), postGames);

export default gamesRouter;
