const GameDTO = require('./dto/@game.dto');

class GameService {

    /**
     * @type {GameDTO} #gameDTO
     */
    #gameDTO = null;

    constructor(){

        this.#gameDTO = new GameDTO();
    }

    async findGameIdByName(name){

        return await this.#gameDTO.findGameIdByName(name);
    }

    async findRoleIdByName(name){

        return await this.#gameDTO.findRoleIdByName(name);
    }
}

module.exports = GameService;