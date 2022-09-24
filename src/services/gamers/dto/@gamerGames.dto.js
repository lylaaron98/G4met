const DataBaseService = require('../../../database/@database.service');

const Game = require('../../games/models/game');
const Gamer = require('../models/gamer');
const GamerGamesArchive = require('../models/gamerGamesArchive');

class GamerGamesDTO {

    constructor(){

    }

    /**
     * 
     * @param {GamerGamesArchive} gamerGame 
     */
    async save(gamerGame){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,fields] = await connection.query(
            'INSERT INTO gamersGames(gamer_id,game_id,game_role_id) VALUES(?,?,?)',
            [gamerGame.gamerId,gamerGame.gameId,gamerGame.gameRoleId]
        );

        connection.release();

        if(rows.affectedRows > 0){

            return true;
        
        }else{

            throw new Error('Error occured while saving gamer related games !');
        }
    }

    async delete(gamerGameId){

    }

    async findNumberOfPlayersByGame(gameId){

    }

    async findNumberOfPlayersByRoles(gameRoles){

    }

    /**
     * 
     * @param {number} gamerId 
     * @returns
     */
    async findGamesByGamer(gamerId){

        /**
         * @type {Game[]}
         */
        let gamesList = [];
        
        const connection = await DataBaseService.getInstance().connection();

        const [rows,fields] = await connection.query(
            'SELECT DISTINCT g.id as "game_id",g.name,g.description,g.genre FROM games g,gamersGames gg'+
            'WHERE g.id = gg.game_id AND'+
            'WHERE gg.gamer_id = ?',
            [gamerId]
        );

        connection.release();

        if(rows.length > 0){

            for(let row of rows){
                
                let game = new Game();

                game.id = row.game_id;
                game.name = row.name;
                game.description = row.description;
                game.genre = row.genre;

                gamesList.push(game);
            }

            return gamesList;
        
        }else{

            throw new Error('Error occured while fetching gamer related games !');
        }
    }
    
    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async findAllByGamerId(gamerId){

        /**
         * @type {GamerGamesArchive[]}
         * 
         */
        let gamerGamesList = [];

        const connection = await DataBaseService.getInstance().connection();

        const [rows,fields] = await connection.query(
            'SELECT DISTINCT g.name as "game_name",g.description,g.genre,'+
            'gr.name as "role_name",gg.game_id,gg.game_role_id,gg.game_level,gg.game_experience '+ 
            'FROM games g,gamersGames gg,gamesRoles gr '+
            'WHERE g.id = gg.game_id AND '+
            'gg.game_role_id = gr.id AND '+
            'gg.gamer_id = ?',
            [gamerId]
        );

        connection.release();

        if(rows.length > 0){

            for(let row of rows){

                let gamerGameArchive = new GamerGamesArchive();

                gamerGameArchive.gameId = row.game_id;
                gamerGameArchive.gameName = row.game_name;
                gamerGameArchive.gameDescription = row.description;
                gamerGameArchive.gameGenre = row.genre;

                gamerGameArchive.gameRoleId = row.game_role_id;
                gamerGameArchive.gameRoleName = row.role_name;

                gamerGameArchive.gameExperience = row.game_experience;
                gamerGameArchive.gameLevel = row.game_level;

                gamerGamesList.push(gamerGameArchive);
            }

            return gamerGamesList;

        }else{

            throw new Error('Error occured while fetching gamer related games, roles and the other gamer games data !');
        }
    }

    async findAll(){

    }
}

module.exports = GamerGamesDTO;