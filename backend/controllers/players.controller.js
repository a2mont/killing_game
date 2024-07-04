import { connectDB } from "../db/db.js";

export async function getPlayerById(id) {
  const sqlRequest = `select * from Players where PlayerId=${id}`;
  const [response] = await connectDB.query(sqlRequest);
  return response[0];
}

/**
 * @description Get one Player
 * @route Get /players/:id
 *
 */
export const getPlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const player = await getPlayerById(id);
    if (!player) return next(new Error("Player not found"));

    return res.status(200).json(player);
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Get all Players
 * @route Get /players
 *
 */
export const getAllPlayers = async (req, res, next) => {
  try {
    const sqlRequest = "select * from players";
    const [response] = await connectDB.query(sqlRequest);
    if (!response.length) return next(new Error("Players not found"));

    return res.status(200).json({ players: response });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Create Player
 * @route Post /players
 *
 */
export const createPlayer = async (req, res, next) => {
  try {
    const { playerName } = req.body;
    if (!playerName) return next(new Error("Field not complete"));
    const sqlRequest = `insert into players(PlayerName) values('${playerName}')`;
    await connectDB.query(sqlRequest);

    return res.status(201).json({ message: "player has been created" });
  } catch (error) {
    console.log(error);
  }
};

export const updatePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { playerName } = req.body;

    if (!playerName || !id) return next(new Error("Field not complete"));

    const player = await getPlayerById(id);
    if (!player) return next(new Error("Player not found"));

    const sqlRequest = `update players set PlayerName='${playerName}' where PlayerId=${id}`;
    await connectDB.query(sqlRequest);

    return res.status(201).json({ message: "player has been updated" });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Delete one Player
 * @route Get /players/:id
 *
 */
export const deletePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new Error("Field not complete"));

    const player = await getPlayerById(id);
    if (!player) return next(new Error("Player not found"));

    const sqlRequest = `delete from Players where PlayerId=${id}`;
    await connectDB.query(sqlRequest);

    return res.status(200).json({ message: "player has been deleted" });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Get a player's kills
 * @route Get /players/:id/kills
 *
 */
export const getPlayerKills = async (req, res, next) => {
  try {
    const { id } = req.params;
    const player = await getPlayerById(id);
    if (!player) return next(new Error("Player not found"));

    const sqlRequest = `select * from kills where OwnerId=${id}`;

    const [response] = await connectDB.query(sqlRequest);
    if (!response.length) return next(new Error("Kills not found"));

    return res.status(200).json({
      player: player,
      kills: response,
    });
  } catch (error) {
    console.log(error);
  }
};
