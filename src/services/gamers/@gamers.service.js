const GamerDTO = require('./dto/@gamer.dto');
const GamerRequestsHistoryDTO = require('./dto/@gamerRequestsHistory.dto');

const Gamer = require('./models/gamer');
const RequestHistory = require('./models/gamerRequestsHistory');

class GamerService {

    /**
     * @type {GamerDTO} #gamerDTO
     */
    #gamerDTO = null;

    /**
     * @type {GamerRequestsHistoryDTO} #gamerRequestsHistoryDTO
     */
    #gamerRequestsHistoryDTO = null;

    constructor(){

        this.#gamerDTO = new GamerDTO();
        this.#gamerRequestsHistoryDTO = new GamerRequestsHistoryDTO();
    }

    /**
     * 
     * @param {Gamer} gamer 
     * @returns 
     */
    async save(gamer){

        return await this.#gamerDTO.save(gamer);
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async update(gamerId){

        return await this.#gamerDTO.update(gamerId);
    }

    /**
     * 
     * @param {string} username 
     * @returns 
     */
    async findByUserName(username){

        return await this.#gamerDTO.findByUserName(username);
    }

    /**
     * 
     * @param {RequestHistory} gamerRequestHistory 
     * @returns 
     */
    async like(gamerRequestHistory){

        return await this.#gamerRequestsHistoryDTO.save(gamerRequestHistory);
    }

    /**
     * 
     * @param {number} gamerRequestHistoryId 
     * @returns 
     */
    async dislike(gamerRequestHistoryId){

        return await this.#gamerRequestsHistoryDTO.delete(gamerRequestHistoryId);
    }

    /**
     * 
     * @param {number} gamerRequestHistoryId 
     * @param {string} status 
     * @returns 
     */
    async updateStatus(gamerRequestHistoryId,status){

        return await this.#gamerRequestsHistoryDTO.updateStatus(gamerRequestHistoryId,status);
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async countSentLikes(gamerId){
            
        return await this.#gamerRequestsHistoryDTO.countAllSentByGamerId(gamerId);
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async countReceivedLikes(gamerId){
                
        return await this.#gamerRequestsHistoryDTO.countAllReceivedByGamerId(gamerId);
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async findAllSentByGamerId(gamerId){

        return await this.#gamerRequestsHistoryDTO.findAllSentByGamerId(gamerId);
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async findAllReceivedByGamerId(gamerId){

        return await this.#gamerRequestsHistoryDTO.findAllReceivedByGamerId(gamerId);
    }
}

module.exports = GamerService;