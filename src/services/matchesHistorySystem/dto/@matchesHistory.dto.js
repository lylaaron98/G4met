const DataBaseService = require('../../../database/@database.service');

const Gamer = require('../../gamers/models/gamer');
const MatchHistory = require('../models/gamerMatchesHistory');

class MatchHistoryDTO {

    constructor() { }

    /**
     * 
     * @param {MatchHistory} matchHistory 
     * @returns 
     */
    async save(matchHistory) {

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.query(

            "INSERT INTO gamerMatchesHistory(first_gamer_id,second_gamer_id) VALUES(?,?)",
            [
                matchHistory.firstGamerId,
                matchHistory.secondGamerId
            ]
        );

        connection.release();

        if (rows.affectedRows > 0) {

            return true;

        } else {

            throw new Error("Error occured while trying to match, try again later.");
        }
    }

    /**
     * 
     * @param {number} matchHistoryId 
     * @returns 
     */
    async delete(matchHistoryId) {

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.execute(

            "DELETE FROM gamerMatchesHistory WHERE id = ?",
            [matchHistoryId]
        );

        connection.release();

        if (rows.affectedRows > 0) {

            return true;

        } else {

            throw new Error("Error occured while unmatching this user, try again later.");
        }
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async findSuggestedGamers(gamerId) {

        /**
         * @type {Gamer[]} suggestedGamers
         */
        let suggestedGamers = [];

        const connection = await DataBaseService.getInstance().connection();

        const [requestsRows,] = await connection.execute(

            "SELECT * FROM gamerRequestsHistory WHERE sender_id = ? OR receiver_id = ? LIMIT 1",
            [gamerId, gamerId]
        );

        const [matchesRows,] = await connection.execute(

            "SELECT * FROM gamerMatchesHistory WHERE first_gamer_id = ? OR second_gamer_id = ? LIMIT 1",
            [gamerId, gamerId]
        );

        let exist = requestsRows.length > 0;

        let matchExist = matchesRows.length > 0;

        const [rows,] = await connection.execute(

            "SELECT DISTINCT a.username,g.id,g.rating,g.gamingExperience,g.gamerMatchedRating " +
            "FROM accounts a,gamers g" + (exist ? ",gamerRequestsHistory grh " : " ") +
            "WHERE a.id = g.account_id AND " + (exist ? ("g.id NOT IN (SELECT receiver_id FROM gamerRequestsHistory WHERE sender_id = " + gamerId + ") AND g.id NOT IN (SELECT sender_id FROM gamerRequestsHistory WHERE receiver_id = " + gamerId + ") AND ") : " ") +
            (matchExist ? ("g.id NOT IN (SELECT first_gamer_id FROM gamerMatchesHistory WHERE second_gamer_id = " + gamerId + ") AND g.id NOT IN (SELECT second_gamer_id FROM gamerMatchesHistory WHERE first_gamer_id = " + gamerId + ") AND ") : " ") +
            "g.id != ?",
            [gamerId]
        );

        connection.release();

        if (rows.length >= 0) {

            for (let row of rows) {

                let gamer = new Gamer();

                gamer.id = row.id;
                gamer.username = row.username;

                gamer.rating = row.rating;
                gamer.gamingExperience = row.gamingExperience;
                gamer.gamerMatchedRating = row.gamerMatchedRating;

                suggestedGamers.push(gamer);
            }

            return suggestedGamers;

        } else {

            throw new Error("Error occured while fetching suggested gamers");
        }
    }

    /**
     * 
     * @param {number} gamerId
     * @returns 
     */
    async findAllByGamerId(gamerId) {

        /**
         * @type {MatchHistory} matchHistoryList
         */
        let matchesHistoryList = [];

        const connection = await DataBaseService.getInstance().connection();

        const [rows, fields] = await connection.execute(
            "SELECT gmh.id,a.username as 'gamer_match_name',g.id as 'gamer_match_id' " +
            "FROM accounts a,gamers g,gamerMatchesHistory gmh " +
            "WHERE a.id = g.account_id AND " +
            "(g.id = gmh.first_gamer_id OR g.id = gmh.second_gamer_id) AND " +
            "(gmh.first_gamer_id = ? OR gmh.second_gamer_id = ?) AND " +
            "g.id != ?",
            [gamerId, gamerId, gamerId]
        );

        connection.release();

        if (rows.length >= 0) {

            for (let row of rows) {

                let matchHistory = new MatchHistory();

                matchHistory.id = row.id;
                matchHistory.secondGamerId = row.gamer_match_id;
                matchHistory.secondGamerName = row.gamer_match_name;

                matchesHistoryList.push(matchHistory);
            }

            return matchesHistoryList;

        } else {

            throw new Error("Error occured while fetching user matches history, try again later.");
        }
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async countMatchesByGamerId(gamerId) {

        const connection = await DataBaseService.getInstance().connection();

        const [rows, fields] = await connection.execute(
            "SELECT count(*) as 'count' FROM gamerMatchesHistory gmh " +
            "WHERE (gmh.first_gamer_id = ? OR gmh.second_gamer_id = ?)",
            [gamerId, gamerId]
        );

        connection.release();

        if (rows.length >= 0) {

            return rows[0].count;

        } else {

            throw new Error("Error occured while counting number of matches by gamer, try again later");
        }
    }
}

module.exports = MatchHistoryDTO;