const mysql = require('mysql2/promise');
const dbconfig = require('../config/db.config');

class DataBaseService {

    /**
     * @type {mysql.Pool} #connection
     */
    #pool = null;

    static #instance = null;

    constructor(){

        this.#pool = mysql.createPool(dbconfig);
    }

    /**
     * 
     * @returns {DataBaseService} instance of DataBaseService
     */
    static getInstance(){

        if(!DataBaseService.#instance){

            DataBaseService.#instance = new DataBaseService();
        }

        return DataBaseService.#instance;
    }

    get pool(){

        return this.#pool;
    }

    async connection(){

        try{
   
            return await this.#pool.getConnection();
        
        }catch(error){

            throw new Error("The connection couldn't be done, try again later")
        }
    }

}

module.exports = DataBaseService;