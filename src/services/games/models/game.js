/**
 * 
 */
class Game {

    #id = null;
    #name = null;
    #description = null;

    #numberOfPlayers = null;
    #genre = null;

    constructor(){

    }

    get id(){ return this.#id; }
    get name(){ return this.#name; }
    get description(){ return this.#description; }
    get numberOfPlayers(){ return this.#numberOfPlayers; }
    get genre(){ return this.#genre; }

    set id(id){ this.#id = id; }
    set name(name){ this.#name = name; }
    set description(description){ this.#description = description; }
    set numberOfPlayers(numberOfPlayers){ this.#numberOfPlayers = numberOfPlayers; }
    set genre(genre){ this.#genre = genre; }
}

module.exports = Game;