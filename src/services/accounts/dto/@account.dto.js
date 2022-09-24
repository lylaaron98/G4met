const DataBaseService = require('../../../database/@database.service');

const Account = require('../models/account');

/**
 * 
 */
class AccountDTO {

    constructor(){}

    /**
     * 
     * @param {Account} account 
     */
    async save(account){

        const connection = await DataBaseService.getInstance().connection();

        const isAlreadyTaken = await this.accountAlreadyToken(account.email,account.username);

        if(isAlreadyTaken){
                
            throw new Error('Account already taken. Please try another username or email');
    
        }else{
                    
            const [rows,fields] = await connection.execute('INSERT INTO accounts (username,email,password) VALUES (?,?,?)',[account.username,account.email,account.password]);
            
            connection.release();

            if(rows.affectedRows > 0){
    
                return true;
    
            }else{
    
                throw new Error('Error while saving the account');
            }
        }
    }

    async update(account){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.execute(

            'UPDATE accounts SET username = ?, email = ?, password = ?, role = ? WHERE id = ?',
            [account.username,account.email,account.password,account.role,account.id]
        );

        connection.release();

        if(rows.affectedRows > 0){

            return true;

        }else{
                
            throw new Error('Error while updating the account');
        }
    }

    async delete(id){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.execute('DELETE FROM accounts WHERE id = ?',[id]);

        connection.release();

        if(rows.affectedRows > 0){

            return true;

        }else{

            throw new Error('Error while deleting the account');
        }
    }

    async findByUserName(username){

        let account = new Account();

        const connection = await DataBaseService.getInstance().connection();

        const [rows, fields] = await connection.execute('SELECT * FROM accounts where username = ?',[username]);

        connection.release();

        if(rows.length > 0){

            account.id = rows[0].id;
            account.username = rows[0].username;
            account.email = rows[0].email;
            account.password = rows[0].password;
            account.role = rows[0].role;

            return account;

        }else{
                
            return null;
        }
    }

    async findByEmail(email){

        let account = new Account();

        const connection = await DataBaseService.getInstance().connection();

        const [rows, fields] = await connection.execute('SELECT * FROM accounts WHERE email = ?', [email]);

        connection.release();

        if(rows.length > 0){
            
            account.id = rows[0].id;
            account.username = rows[0].username;
            account.email = rows[0].email;
            account.password = rows[0].password;
            account.role = rows[0].role;

            return account;
    
        }else{

            return null;
        }
    }

    async accountAlreadyToken(email,username){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.execute('SELECT * FROM accounts WHERE email = ? OR username = ?',[email,username]);

        connection.release();

        if(rows.length > 0){

            return true;

        }else{

            return false;
        }
    }

    /**
     * 
     * @param {string} username 
     * @returns {number} accountID
     */
    async findAccountIDByUsername(username){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.execute('SELECT id FROM accounts WHERE username = ?',[username]);

        connection.release();

        if(rows.length > 0){

            return rows[0].id;

        }else{

            return null;
        }
    }

    async findAccountByUsername(username){
    
        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.execute('SELECT * FROM accounts WHERE username = ?',[username]);

        connection.release();

        if(rows.length > 0){

            let account = new Account();

            account.id = rows[0].id;
            account.username = rows[0].username;
            account.email = rows[0].email;
            account.password = rows[0].password;
            account.role = rows[0].role;

            return account;

        }else{

             throw new Error('Error occured while user try to login : no account existed with this user name, try to create one first !');
        }
    }

    async findAll(){

        /**
         * @type {Account[]}
         */
        let accountsList = [];

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.execute('SELECT * FROM accounts');

        connection.release();

        if(rows.length > 0){

            for(let row of rows){

                let account = new Account();

                account.id = row.id;
                account.username = row.username;
                account.email = row.email;
                account.password = row.password;
                account.role = row.role;

                accountsList.push(account);
            }

            return accountsList;

        }else{

            return null;
        }
    }
}

module.exports = AccountDTO;