const bcrypt = require('bcrypt');

const AccountService = require('./@accounts.service.js');
const GamerService = require('../gamers/@gamers.service');
const GamerGamesService = require('../gamers/@gamerGames.service');
const GameService = require('../games/@games.service');

const Account = require('./models/account');
const Gamer = require('../gamers/models/gamer');
const GamerGamesArchive = require('../gamers/models/gamerGamesArchive');

const accountService = new AccountService();
const gamerService = new GamerService();
const gameService = new GameService();
const gamerGamesService = new GamerGamesService();

class AccountController {

    constructor(){

    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * 
     */
    async signup_get(req,res){
        res.render('auth/signup', { title: 'Join' });
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * 
     */
    async signup_post(req,res){
        
        try{

            let message = {
    
                error:false,
                message:""
            };
    
            let success = true;
    
            let account = new Account(
    
                req.body?.accountData.username,
                req.body?.accountData.email,
                await bcrypt.hash(req.body?.accountData.pwd, 10),
            );
    
            let gamesData = req.body?.gamesData;
    
            try{
    
                await accountService.save(account);
    
                let id = await accountService.findAccountIDByUsername(account.username);
    
                await gamerService.save(new Gamer(id));
    
                gamesData.games.forEach(async game => {
    
                    let gameId = await gameService.findGameIdByName(game.name);
    
                    game.roles.forEach(async role => {
    
                        let roleId = await gameService.findRoleIdByName(role);
    
                        await gamerGamesService.save(new GamerGamesArchive(id,gameId,roleId));
                    });
                });
    
            }catch(err){
    
                success = false;
                
                message.error = true;
                message.message = err.message;
            }
    
            if(success){
                
                message.message = "Welcome to G4Met ! Your account has been created successfully !";
            }
    
            res.status(200).json(message);
        
        }catch(err){
    
            res.json({
    
                error:true,
                message: err.message
            });
        }
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * 
     */
    async login_get(req,res){
        res.render('auth/login', { title: 'log in'});
    }

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns
     * 
     */
    async login_post(req, res, next){

        try{

            let loginData = req.body?.loginData;

            let account = await accountService.findAccountByUsername(loginData.username);

            if(account){
                    
                let match = await bcrypt.compare(loginData.pwd, account.password);
    
                if(match){
    
                    req.session.userId = account.id;
                    req.session.username = account.username;

                    res.status(200).json({
                                                                                
                        error:false,
                        message:"Welcome back "+account.username+" !"

                    });

                }else{
    
                    res.status(200).json({

                        error:true,
                        message:"Wrong password !"
                    });
                }
            }

        }catch(err){

            res.status(200).json({
                error:true,
                message:err.message
            });
        }
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */
    async logout_get(req,res,next){

        req.session.destroy();
        res.redirect('/');
    }
};

module.exports = AccountController;