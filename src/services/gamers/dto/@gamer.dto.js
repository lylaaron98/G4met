const DataBaseService = require('../../../database/@database.service');
const Account = require('../../accounts/models/account');

const Gamer = require('../models/gamer');

class GamerDTO {

    constructor(){}

    /**
     * 
     * @param {Gamer} gamer
     * @returns 
     */
    async save(gamer){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,fields] = await connection.execute('INSERT INTO gamers (account_id) VALUES (?)',[gamer.accountId]);

        if(rows.affectedRows > 0){

            return true;

        }else{

            throw new Error('Error while saving the gamer');
        }
    }

    async update(gamerId){

    }

    async delete(gamerId){

    }

    async findByUserName(username){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.query(

            'SELECT a.id as "account_id",a.username,a.email,'+
            'g.id as "gamer_id",g.rating,g.gamingExperience,g.gamerMatchedRating '+
            'FROM gamers g,accounts a '+
            'WHERE g.account_id = a.id AND '+
            'a.username = ?',
            [username]
        );
    
        connection.release();

        if(rows.length > 0){

            let gamer = new Gamer();

            gamer.accountId = rows[0].account_id;
            gamer.username = rows[0].username;
            gamer.email = rows[0].email;
            
            gamer.id = rows[0].gamer_id;
            gamer.rating = rows[0].rating;
            gamer.gamingExperience = rows[0].gamingExperience;
            gamer.gamerMatchedRating = rows[0].gamerMatchedRating;

            return gamer;

        }else{

            throw new Error('Error occured while fetching gamers personal infos !');
        }
    }

    async findByEmail(email){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.query(

            'SELECT a.id as "account_id",a.username,a.email,'+
            'g.id as "gamer_id",g.rating,g.gamingExperience,g.gamerMatchedRating '+
            'FROM gamers g,accounts a '+
            'WHERE a.email = ?',
            [email]
        );
    
        connection.release();

        if(rows.length > 0){

            let gamer = new Gamer();

            gamer.account = new Account();

            gamer.account.id = rows[0].account_id;
            gamer.account.username = rows[0].username;
            gamer.account.email = rows[0].email;

            gamer.id = rows[0].gamer_id;
            gamer.rating = rows[0].rating;
            gamer.gamingExperience = rows[0].gamingExperience;
            gamer.gamerMatchedRating = rows[0].gamerMatchedRating;

            return gamer;

        }else{

            throw new Error('Error occured while fetching gamers personal infos !');
        }
    }

    async findAllByGamingExperience(min,max){

        /**
         * @type {Gamer[]} gamersList
         */
        let gamersList = [];

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.query(

            'SELECT a.username,g.id as "gamer_id",g.rating,g.gamingExperience,g.gamerMatchedRating '+
            'FROM gamers g,accounts a '+
            'WHERE g.gamingExperience BETWEEN ? AND ?',
            [min,max]
        );
    
        connection.release();

        if(rows.length > 0){

            for(let row of rows){

                let gamer = new Gamer();

                gamer.account = new Account();

                gamer.account.username = row.username;

                gamer.id = row.gamer_id;
                gamer.rating = row.rating;
                gamer.gamingExperience = row.gamingExperience;
                gamer.gamerMatchedRating = row.gamerMatchedRating;

                gamersList.push(gamer);
            }

            return gamersList;

        }else{

            throw new Error('Error occured while fetching gamers personal infos !');
        }
    }

    async findAllByGameRoles(gameRoles){

    }

    async findAllByGameLevel(gameLevel){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.query(
            
            'SELECT DISTINCT a.username,g.id as "gamer_id",g.rating,g.gamingExperience,g.gamerMatchedRating '+
            'FROM gamers g,accounts a,gamersGames gg,games gm '+
            'WHERE g.id = gg.gamer_id AND '+
            'gm.id = gg.game_id AND '+
            'g.account_id = a.id AND '+
            'gg.game_level = ?',
            [gameLevel]
        );

        connection.release();

        if(rows.length > 0){

            let gamersList = [];

            for(let row of rows){

                let gamer = new Gamer();

                gamer.account = new Account();

                gamer.account.username = row.username;

                gamer.id = row.gamer_id;
                gamer.rating = row.rating;
                gamer.gamingExperience = row.gamingExperience;
                gamer.gamerMatchedRating = row.gamerMatchedRating;

                gamersList.push(gamer);
            }

            return gamersList;

        }else{

            throw new Error('Error occured while fetching gamers personal infos by their playing game !');
        }
    }

    async findAllByGame(gameName){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.query(
            
            'SELECT DISTINCT a.username,g.id as "gamer_id",g.rating,g.gamingExperience,g.gamerMatchedRating '+
            'FROM gamers g,accounts a,gamersGames gg,games gm '+
            'WHERE g.id = gg.gamer_id AND '+
            'WHERE gm.id = gg.game_id AND '+
            'WHERE g.account_id = a.id AND '+
            'WHERE gm.name = ?',
            [gameName]
        );

        connection.release();

        if(rows.length > 0){

            let gamersList = [];

            for(let row of rows){

                let gamer = new Gamer();

                gamer.account.username = row.username;

                gamer.id = row.gamer_id;
                gamer.rating = row.rating;
                gamer.gamingExperience = row.gamingExperience;
                gamer.gamerMatchedRating = row.gamerMatchedRating;

                gamersList.push(gamer);
            }

            return gamersList;

        }else{

            throw new Error('Error occured while fetching gamers personal infos by their playing game !');
        }

    }

    async findAll(){

    }
}

module.exports = GamerDTO;