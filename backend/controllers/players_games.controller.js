import { connectDB } from "../db/db.js";
import { getPlayerById } from "./players.controller.js";
import { getGameById } from "./games.controller.js";

/**
 * @description Get games for a player
 * @route Get /players/:id/games
 *
 */
export const getPlayerGames = async (req, res, next) => {
  try {
    const { id } = req.params;
    const player = await getPlayerById(id);
    if (!player) return next(new Error("Player not found"));

    const sqlRequest = `select games.GameId, GameName, Progress from players_games inner join games on players_games.GameId = games.GameId  where PlayerId=${id}`;

    const [response] = await connectDB.query(sqlRequest);
    if (!response.length) return next(new Error("Games not found"));

    return res.status(200).json({
      player: player,
      games: response,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Get players for a game
 * @route Get /games/:id/players
 *
 */
export const getGamePlayers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await getGameById(id);
    if (!game) return next(new Error("Game not found"));

    const sqlRequest = `select players.PlayerId,PlayerName from players_games inner join players on players_games.PlayerId = players.PlayerId where GameId=${id}`;
    const [response] = await connectDB.query(sqlRequest);
    if (!response.length) return next(new Error("Players not found"));

    return res.status(200).json({
      game: game,
      players: response,
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * @description Add player to a game
 * @route POST /games/:game_id/players/:player_id
 *
 */
export const addPlayerToGame = async (req, res, next) => {
  try {
    const { game_id, player_id } = req.params;

    const game = await getGameById(game_id);
    if (!game) return next(new Error("Game not found"));

    const player = await getPlayerById(player_id);
    if (!player) return next(new Error("Player not found"));

    let sqlRequest = `select * from players_games where GameId=${game_id} and PlayerId=${player_id}`;
    const [exist] = await connectDB.query(sqlRequest);
    if (!!exist.length) return next(new Error("Players is already in game!"));

    sqlRequest = `insert into players_games(PlayerId,GameId) values (${player_id},${game_id})`;
    await connectDB.query(sqlRequest);
    return res.status(200).json({
      game: game,
      playerAdded: player,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

/**
 * @description Remove a player from a game
 * @route DELETE /games/:game_id/players/:player_id
 *
 */
export const deletePlayerFromGame = async (req, res, next) => {
  try {
    const { game_id, player_id } = req.params;

    const game = await getGameById(game_id);
    if (!game) return next(new Error("Game not found"));

    const player = await getPlayerById(player_id);
    if (!player) return next(new Error("Player not found"));

    const sqlRequest = `delete from players_games where GameId=${game_id} and PlayerId=${player_id}`;
    await connectDB.query(sqlRequest);
    return res.status(200).json({
      game: game,
      playerAdded: player,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
