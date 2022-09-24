const DataBaseService = require('../../../database/@database.service');

const Game = require('../models/game');
const GameRole = require('../models/gameRole');

class GameDTO {

    constructor(){

    }

    async save(game){

    }

    async edit(gameId){

    }

    /**
     * 
     * @param {string} name 
     */
    async findGameIdByName(name){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.query('SELECT id FROM games WHERE name = ?',[name]);

        connection.release();

        if(rows.length > 0){

            return rows[0].id;

        }else{

            throw new Error('Error occured while fetching games data !');
        }
    }

    /**
     * 
     * @param {string} name 
     */
    async findRoleIdByName(name){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.query('SELECT id FROM gamesRoles WHERE name = ?',[name]);

        connection.release();

        if(rows.length > 0){

            return rows[0].id;

        }else{

            throw new Error('Error occured while fetching games roles data !');
        }
    }

    async findAllByKeywords(keywords){

    }

    async findAllByGenre(genre){

    }

    async findAllByName(name){

    }

    async findAll(){

    }
}

module.exports = GameDTO;