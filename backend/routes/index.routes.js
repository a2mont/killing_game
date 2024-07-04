import express from "express";
import playersRouter from "./players.routes.js";
import gamesRouter from "./games.routes.js";
import killsRouter from "./kills.routes.js";

const router = express.Router();

router.use("/players", playersRouter);
router.use("/games", gamesRouter);
router.use("/kills", killsRouter);

export default router;
