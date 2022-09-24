const DataBaseService = require('../../../database/@database.service');

const RequestHistory = require('../models/gamerRequestsHistory')

class GamerRequestsHistoryDTO {

    constructor(){

    }

    /**
     * 
     * @param {RequestHistory} gamerRequestHistory 
     */
    async save(gamerRequestHistory){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.query(

            "INSERT INTO gamerRequestsHistory(sender_id,receiver_id) VALUES(?,?)",
            [
                gamerRequestHistory.senderId,
                gamerRequestHistory.receiverId
            ]
        );

        connection.release();

        if(rows.affectedRows > 0){

            return true;
        
        }else{

            throw new Error("Error occured while sending the request, try again later.");
        }
    }

    /**
     * 
     * @param {number} gamerRequestHistoryId 
     * @returns 
     */
    async delete(gamerRequestHistoryId){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.execute(

            "DELETE FROM gamerRequestsHistory WHERE id = ?",
            [gamerRequestHistoryId]
        );

        connection.release();

        if(rows.affectedRows > 0){

            return true;
        
        }else{

            throw new Error("Error occured while canceling the request, try again later.");
        }
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async findAllSentByGamerId(gamerId){

        /**
         * @type {RequestHistory[]} requestsHistory
         */
        let requestsHistory = [];

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.execute(
            
            "SELECT grh.id,grh.receiver_id,a.username as 'receiver_name' "+
            "FROM accounts a,gamerRequestsHistory grh,gamers g "+
            "WHERE a.id = g.account_id AND "+
            "grh.receiver_id = g.id AND "+
            "grh.sender_id = ? ",
            [gamerId]
        );

        connection.release();

        if(rows.length >= 0){

            for(let row of rows){

                let request = new RequestHistory();

                request.id = row.id;
                request.receiverId = row.receiver_id;
                request.receiverName = row.receiver_name;

                requestsHistory.push(request);
            }

            return requestsHistory;

        }else{

            throw new Error("Error occured while fetching your sent requests, try again later.");
        }
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async findAllReceivedByGamerId(gamerId){

        /**
         * @type {RequestHistory[]} requestsHistory
         */
        let requestsHistory = [];

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.execute(
            "SELECT grh.id,grh.sender_id,a.username as 'sender_name' "+
            "FROM accounts a,gamerRequestsHistory grh,gamers g "+
            "WHERE a.id = g.account_id AND "+
            "grh.sender_id = g.id AND "+
            "grh.receiver_id = ? ",
            [gamerId]
        );

        connection.release();

        if(rows.length >= 0){

            for(let row of rows){

                let request = new RequestHistory();

                request.id = row.id;
                request.senderId = row.sender_id;
                request.senderName = row.sender_name;

                requestsHistory.push(request);
            }

            return requestsHistory;

        }else{

            throw new Error("Error occured while fetching your received requests, try again later.");
        }
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns 
     */
    async deleteAllApprovedByGamerId(gamerId){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.execute(

            "DELETE FROM gamerRequestsHistory WHERE status = 'approved' AND (sender_id = ? OR receiver_id = ?)",
            [gamerId,gamerId]
        );

        connection.release();

        if(rows.affectedRows > 0){

            return true;
        
        }else{

            throw new Error("Error occured while deleteing approved requests, try again later.");
        }
    }

    /**
     * 
     * @param {number} gamerRequestHistoryId 
     * @param {string} status 
     * @returns 
     */
    async updateStatus(gamerRequestHistoryId,status){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.execute(

            "UPDATE gamerRequestsHistory SET status = ? WHERE id = ?",
            [status,gamerRequestHistoryId]
        );

        connection.release();

        if(rows.affectedRows > 0){

            return true;
        
        }else{

            throw new Error("Error occured while updating the request status, try again later.");
        }
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns {number}
     */
    async countAllSentByGamerId(gamerId){

        const connection = await DataBaseService.getInstance().connection();

        const [rows,] = await connection.execute(

            "SELECT COUNT(*) as 'count' FROM gamerRequestsHistory WHERE sender_id = ?",
            [gamerId]
        );

        connection.release();

        if(rows.length > 0){

            return rows[0].count;
        
        }else{

            throw new Error("Error occured while counting your sent requests, try again later.");
        }
    }

    /**
     * 
     * @param {number} gamerId 
     * @returns {number}
     */
    async countAllReceivedByGamerId(gamerId){
            
        const connection = await DataBaseService.getInstance().connection();
    
        const [rows,] = await connection.execute(
    
            "SELECT COUNT(*) as 'count' FROM gamerRequestsHistory WHERE receiver_id = ?",
            [gamerId]
        );
    
        connection.release();
    
        if(rows.length > 0){
    
            return rows[0].count;
            
        }else{
    
            throw new Error("Error occured while counting your received requests, try again later.");
        }
    }
}

module.exports = GamerRequestsHistoryDTO;