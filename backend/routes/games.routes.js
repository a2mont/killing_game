import express from "express";
import {
  getGame,
  getAllGames,
  createGame,
  deleteGame,
  updateGame,
} from "../controllers/games.controller.js";
import {
  getGamePlayers,
  addPlayerToGame,
  deletePlayerFromGame,
} from "../controllers/players_games.controller.js";

const gamesRouter = express.Router();

gamesRouter.route("/").get(getAllGames).post(createGame);
gamesRouter.route("/:id").get(getGame).delete(deleteGame).patch(updateGame);
gamesRouter.route("/:id/players").get(getGamePlayers);
gamesRouter
  .route("/:game_id/players/:player_id")
  .post(addPlayerToGame)
  .delete(deletePlayerFromGame);

export default gamesRouter;
