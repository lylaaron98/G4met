const Account = require('./models/account.js');
const AccountDTO = require('./dto/@account.dto.js');

class AccountService {

    /**
     * @type {AccountDTO} #accountDTO
     */
    #accountDTO = null;

    /**
     * 
     */
    constructor(){

        this.#accountDTO = new AccountDTO();
    }

    /**
     * 
     * @param {Account} account 
     */
    async save(account){

        return await this.#accountDTO.save(account);
    }

    /**
     * 
     * @param {Account} account 
     */
    async update(account){

        return await this.#accountDTO.update(account);
    }

    /**
     * 
     * @param {number} accountId 
     */
    async delete(accountId){

        return await this.#accountDTO.delete(accountId);
    }

    /**
     * 
     * @param {string} accountUserName 
     */
    async findByUserName(accountUserName){

        return await this.#accountDTO.findByUserName(accountUserName);
    }

    /**
     * 
     * @param {string} username 
     * @returns 
     */
    async findAccountIDByUsername(username){

        return await this.#accountDTO.findAccountIDByUsername(username);
    }

    async findAccountByUsername(username){

        return await this.#accountDTO.findAccountByUsername(username);
    }

    /**
     * 
     */
    async findAll(){

        return await this.#accountDTO.findAll();
    }
}

module.exports = AccountService;