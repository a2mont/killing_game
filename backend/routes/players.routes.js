import express from "express";
import {
  getPlayer,
  getAllPlayers,
  createPlayer,
  deletePlayer,
  updatePlayer,
  getPlayerKills,
} from "../controllers/players.controller.js";
import { getPlayerGames } from "../controllers/players_games.controller.js";

const playersRouter = express.Router();

playersRouter.route("/").get(getAllPlayers).post(createPlayer);
playersRouter.route("/:id").get(getPlayer).delete(deletePlayer).patch(updatePlayer);
playersRouter.route("/:id/games").get(getPlayerGames);
playersRouter.route("/:id/kills").get(getPlayerKills);

export default playersRouter;
