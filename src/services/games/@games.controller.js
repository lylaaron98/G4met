const GameService = require('./@games.service');
const Game = require('./models/game');
const GameRole = require('./models/gameRole');

class GameController {

    /**
     * @type {GameService} #gameService
     */
    #gameService = null;

    constructor(){

        this.#gameService = new GameService();
    }

    /**
     * 
     * @param {Game} game 
     */
    async saveGame(game){

    }

    /**
     * 
     * @param {GameRole} gameRole 
     */
    async saveGameRole(gameRole){

    }

    /**
     * 
     * @param {string} name 
     * @returns 
     */
    async findGameIdByName(name){

        return await this.#gameService.findGameIdByName(name);
    }

    /**
     * 
     * @param {string} name 
     * @returns 
     */
    async findRoleIdByName(name){

        return await this.#gameService.findRoleIdByName(name);
    }
}

module.exports = GameController;