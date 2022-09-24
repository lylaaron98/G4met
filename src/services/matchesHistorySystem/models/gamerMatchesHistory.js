/**
 * @class
 */
class MatchHistory {

    #id = null;

    #firstGamerId = null;
    #secondGamerId = null;

    #firstGamerName = null;
    #secondGamerName = null;
    
    #createdAt = null;
    #updatedAt = null;

    constructor(firstGamerId,secondGamerId){

        this.#firstGamerId = firstGamerId;
        this.#secondGamerId = secondGamerId;
    }

    get id(){ return this.#id; }
    get firstGamerId(){ return this.#firstGamerId; }
    get secondGamerId(){ return this.#secondGamerId; }
    get createdAt(){ return this.#createdAt; }
    get updatedAt(){ return this.#updatedAt; }

    get firstGamerName(){ return this.#firstGamerName; }
    get secondGamerName(){ return this.#secondGamerName; }

    set id(value){ this.#id = value; }
    set firstGamerId(value){ this.#firstGamerId = value; }
    set secondGamerId(value){ this.#secondGamerId = value; }
    set createdAt(value){ this.#createdAt = value; }
    set updatedAt(value){ this.#updatedAt = value; }

    set firstGamerName(value){ this.#firstGamerName = value; }
    set secondGamerName(value){ this.#secondGamerName = value; }
}

module.exports = MatchHistory;