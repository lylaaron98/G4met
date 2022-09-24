const GamerGamesDTO = require('./dto/@gamerGames.dto');

const GamerGamesArchive = require('./models/gamerGamesArchive');

class GamerGamesService {

    /**
     * @type {GamerGamesDTO} #gamerGamesDTO
     */
    #gamerGamesDTO = null;

    constructor() {

        this.#gamerGamesDTO = new GamerGamesDTO();
    }

    /**
     * 
     * @param {GamerGamesArchive} gamerGame 
     * @returns 
     */
    async save(gamerGame) {

        return await this.#gamerGamesDTO.save(gamerGame);
    }

    /**
     * 
     * @param {number} gamerGamesId 
     * @returns 
     */
    async delete(gamerGameId) {

        return await this.#gamerGamesDTO.delete(gamerGameId);
    }

    // async findNumberOfPlayersByGame(gameId){

    // }

    // async findNumberOfPlayersByRoles(gameRoles){

    // }

    // async findGamesByGamer(gamerId){

    // }

    // async findById(gamerGameId){

    // }

    async findAllByGamerId(gamerId) {

        return await this.#gamerGamesDTO.findAllByGamerId(gamerId);
    }

    // async findAll(){

    // }
}

module.exports = GamerGamesService;