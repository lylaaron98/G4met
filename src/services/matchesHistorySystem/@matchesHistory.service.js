const MatchHistoryDTO = require('./dto/@matchesHistory.dto');

const MatchHistory = require('./models/gamerMatchesHistory');

class MatchesHistoryService {

    /**
     * @type {MatchHistoryDTO} #matchHistoryDTO
     */
    #matchHistoryDTO = null;

    constructor(){
    
        this.#matchHistoryDTO = new MatchHistoryDTO();
    }

    /**
     * 
     * @param {MatchHistory} matchHistory 
     */
    async match(matchHistory){

        return await this.#matchHistoryDTO.save(matchHistory);
    }

    /**
     * 
     * @param {number} matchHistoryId 
     * @returns 
     */
    async unMatch(matchHistoryId){

        return await this.#matchHistoryDTO.delete(matchHistoryId);
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async findSuggestedGamers(gamerId){

        return await this.#matchHistoryDTO.findSuggestedGamers(gamerId);
    }

    /**
     * 
     * @param {number} gamerId 
     */
    async findRecentMatches(gamerId){

    }

    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async findMatchesHistoryByGamerId(gamerId){

        return await this.#matchHistoryDTO.findAllByGamerId(gamerId);
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async countMatchesByGamerId(gamerId){

        return await this.#matchHistoryDTO.countMatchesByGamerId(gamerId);
    }

    /**
     * 
     */
    async findAll(){

    }
}

module.exports = MatchesHistoryService;