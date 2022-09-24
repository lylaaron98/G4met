const MatchesHistoryService = require('../matchesHistorySystem/@matchesHistory.service');
const GamerService = require('../gamers/@gamers.service');
const MatchHistory = require('./models/gamerMatchesHistory');

const matchesHistoryService = new MatchesHistoryService();
const gamerService = new GamerService();

class MatchesHistoryController {

    constructor(){}

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @description This method is used to get all the matches history of the user
     */
    async gamer_matches_get(req,res,next){

        const { userId,username } = req.session;

        const matchesHistory = await matchesHistoryService.findMatchesHistoryByGamerId(userId);
            
        res.render('protected/matchesHistory/gamer-matches', { 
                
            title: 'My Matches',
            username: username,
            userId:userId,
            matches: matchesHistory
        });
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @description This method is used to get all the suggested matches for the user
     */
    async gamer_matches_suggestions_get(req,res,next){

        const { userId,username } = req.session;

        const gamers = await matchesHistoryService.findSuggestedGamers(userId);

        res.render('protected/matchesHistory/gamer-suggested-matches', { 
            
            title: 'Suggested Matches',
            username: username,
            gamers: gamers
        });
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @description This method is used to create a new match history for the user
     */
    async gamer_matches_create_post(req,res,next){

        const { userId } = req.session;

        try{

            let firstGamerId = req.body?.senderId;
            let requestId = req.body?.requestId;

            let matchHistory = new MatchHistory(firstGamerId,userId);

            await matchesHistoryService.match(matchHistory);

            await gamerService.dislike(requestId);

            res.status(200).json({

                error: false,
                message: "The request successfully approved, try to view your new matches !"
            });

        }catch(error){

            res.status(200).json({

                error: true,
                message: error
            });
        }
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @description This method is used to delete a match history for the user
     */
    async gamer_matches_delete_post(req,res,next){

        try{

            let matchHistoryId = req.body?.matchId;

            await matchesHistoryService.unMatch(matchHistoryId);

            res.status(200).json({

                error: false,
                message: "The gamer is successfully unmatched from you matches !"
            });

        }catch(error){

            res.status(200).json({

                error: true,
                message: error
            });
        }
    }
}

module.exports = MatchesHistoryController;