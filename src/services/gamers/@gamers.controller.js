const GamerService = require('./@gamers.service');
const GamerGamesService = require('./@gamerGames.service');
const MatchesHistorySevice = require('../matchesHistorySystem/@matchesHistory.service')

const RequestHistory = require('./models/gamerRequestsHistory');

const gamerService = new GamerService();
const gamerGamesService = new GamerGamesService();
const matchesHistorySevice = new MatchesHistorySevice();

class GamerController {

    constructor(){}

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * 
     */
    async gamer_dashboard_get(req,res,next){

        const { userId,username } = req.session;

        // const numberOfMatches = await matchesHistorySevice.countMatchesByGamerId(userId);

        res.render('protected/dashboard', { 
            
            title: 'Gamer Dashboard',
            username: username
            // numberOfMatches:numberOfMatches
        });
    }
    
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * 
     */
    async gamer_profile_get(req,res,next){

        const { userId,username } = req.session;

        const gamer = await gamerService.findByUserName(username);

        const gamerGamesArchives = await gamerGamesService.findAllByGamerId(userId);

        const numberOfMatches = await matchesHistorySevice.countMatchesByGamerId(userId);

        const gamesData = [];

        for(let gamerGamesArchive of gamerGamesArchives){

            if(!gamesData.some(g => g.name === gamerGamesArchive.gameName)){

                let game = {};
                game.roles = [];
                    
                game.name = gamerGamesArchive.gameName;
                game.genre = gamerGamesArchive.gameGenre;
    
                for(let gamerGamesArchive of gamerGamesArchives){

                    if(game.name === gamerGamesArchive.gameName){

                        game.roles.push(gamerGamesArchive.gameRoleName);
                    }
                }
    
                game.gameExperience = gamerGamesArchive.gameExperience;
                game.gameLevel = gamerGamesArchive.gameLevel;
    
                gamesData.push(game);
            }
        }

        res.render('protected/gamers/gamer-profile', {

            title: 'Profile',
            username: username,
            gamer: gamer,
            gamesData: gamesData,
            numberOfMatches:numberOfMatches
        });
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */
    async gamer_profile_view_get(req,res,next){

        const { username } = req.session;

        const gamerName = req.params?.username;

        const gamer = await gamerService.findByUserName(gamerName);

        const gamerGamesArchives = await gamerGamesService.findAllByGamerId(gamer.id);

        const numberOfMatches = await matchesHistorySevice.countMatchesByGamerId(gamer.id);

        const gamesData = [];

        for(let gamerGamesArchive of gamerGamesArchives){

            if(!gamesData.some(g => g.name === gamerGamesArchive.gameName)){

                let game = {};
                game.roles = [];
                    
                game.name = gamerGamesArchive.gameName;
                game.genre = gamerGamesArchive.gameGenre;
    
                for(let gamerGamesArchive of gamerGamesArchives){

                    if(game.name === gamerGamesArchive.gameName){

                        game.roles.push(gamerGamesArchive.gameRoleName);
                    }
                }
    
                game.gameExperience = gamerGamesArchive.gameExperience;
                game.gameLevel = gamerGamesArchive.gameLevel;
    
                gamesData.push(game);
            }
        }

        res.render('protected/gamers/gamer-profile', {

            title: 'Profile | '+gamerName,
            username: username,
            gamer: gamer,
            gamesData: gamesData,
            numberOfMatches:numberOfMatches
        });
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * 
     */
    async gamer_profile_edit_get(req,res,next){

        const { username } = req.session;
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * 
     */
    async gamer_profile_edit_post(req,res,next){
        
        const { username } = req.session;
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * 
     */
    async gamer_requests_pending_get(req,res,next){

        const { userId,username } = req.session;

        try{

            const requests = await gamerService.findAllReceivedByGamerId(userId);
            
            res.render('protected/gamers/gamer-pending-requests', { 
                
                title: 'Pending Requests',
                username: username,
                requests: requests
            });

        }catch(error){

            res.status(200).json({
                error:true,
                message:error
            });
        }
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * 
     */
    async gamer_requests_sent_get(req,res,next){

        const { userId,username } = req.session;

        try{

            const requests = await gamerService.findAllSentByGamerId(userId);
    
            res.render('protected/gamers/gamer-sent-requests', {
                 
                title: 'Sent Requests',
                username: username,
                requests: requests
            });
            
        }catch(error){

            res.status(200).json({
                error:true,
                message:error
            });
        }
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * 
     */
    async gamer_requests_create_post(req,res,next){

        const { userId } = req.session;

        try{
            
            let receiverId = req.body?.receiverId;

            await gamerService.like(new RequestHistory(userId,receiverId));

            res.status(200).json({
                error:false,
                message:"Your match request successfully sent."
            });

        }catch(error){

            res.status(200).json({
                error:true,
                message:error
            });
        }
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * 
     */
    async gamer_requests_delete_post(req,res,next){

        try{
            
            let gamerRequestHistoryId = req.body?.requestId;

            await gamerService.dislike(gamerRequestHistoryId);

            res.status(200).json({
                error:false,
                message:"Your match request succefully canceled."
            });

        }catch(error){

            res.status(200).json({
                error:true,
                message:error
            });
        }
    }
};

module.exports = GamerController;