const Game = require("../../games/models/game");
const GameRole = require('../../games/models/gameRole');

class GamerGamesArchive {

    #id = null;
    #gamerId = null;
    #gameId = null;
    #gameRoleId = null;

    #roles = null;
    #games = null;

    #gameLevel = null;
    #gameExperience = null;

    #gameName = null;
    #gameDescription = null;
    #gameGenre = null;

    #gameRoleName = null;

    constructor(gamerId,gameId,gameRoleId){

        this.#gamerId = gamerId;
        this.#gameId = gameId;
        this.#gameRoleId = gameRoleId;
    }

    get id(){ return this.#id; }
    get gamerId(){ return this.#gamerId; }
    get gameId(){ return this.#gameId; }
    get gameRoleId(){ return this.#gameRoleId; }

    get gameLevel(){ return this.#gameLevel; }
    get gameExperience(){ return this.#gameExperience; }

    get gameRoleName(){ return this.#gameRoleName; }
    get gameName(){ return this.#gameName; }
    get gameGenre(){ return this.#gameGenre; }
    get gameDescription(){ return this.#gameDescription; }

    set id(value){ this.#id = value; }
    set gamerId(value){ this.#gamerId = value; }
    set gameId(value){ this.#gameId = value; }
    set gameRoleId(value){ this.#gameRoleId = value; }

    set gameLevel(value){ this.#gameLevel = value; }
    set gameExperience(value){ this.#gameExperience = value; }

    set gameRoleName(value){ this.#gameRoleName = value; }
    set gameName(value){ this.#gameName = value; }
    set gameGenre(value){ this.#gameGenre = value; }
    set gameDescription(value){ this.#gameDescription = value; }

    get games(){ return this.#games; }
    get roles(){ return this.#roles; }
    
    set games(value){ this.#games = value; }
    set roles(value){ this.#roles = value; }
}

module.exports = GamerGamesArchive;