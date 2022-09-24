
class AuthMiddlware {

    constructor(){

    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */
    redirectLogin(req,res,next){

        if(req.session && req.session.userId) return next();
        res.redirect('/signin');
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */
    redirectUserDashboard(req,res,next){

        if(req.session && req.session.userId) res.redirect('/gamers/dashboard');
        return next();
    }
}

module.exports = new AuthMiddlware();