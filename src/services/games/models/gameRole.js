class GameRole {

    #id = null;
    #name = null;

    constructor(name){

        this.#name = name;
    }

    get id(){ return this.#id; }
    get name(){ return this.#name; }

    set id(value){ this.#id = value; }
    set name(value){ this.#name = value; }
}

module.exports = GameRole;