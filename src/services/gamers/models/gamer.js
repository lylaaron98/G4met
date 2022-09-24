const Account = require('../../accounts/models/account');

class Gamer {

    #id = null;
    #accountId = null;

    /**
     * @type {Account} #account
     */
    #account = null;

    #username = null;
    #email = null;

    #rating = null;
    #gamingExperience = null;
    #gamerMatchedRating = null;

    constructor(accountId) {
            
        this.#accountId = accountId;
    }

    set id(id) { this.#id = id; }
    set accountId(accountId) { this.#accountId = accountId; }
    set rating(rating) { this.#rating = rating; }
    set gamingExperience(gamingExperience) { this.#gamingExperience = gamingExperience; }
    set gamerMatchedRating(gamerMatchedRating) { this.#gamerMatchedRating = gamerMatchedRating; }

    set username(username){ this.#username = username; }
    set email(email){ this.#email = email; }

    get id() { return this.#id; }
    get accountId() { return this.#accountId; }
    get rating() { return this.#rating; }
    get gamingExperience() { return this.#gamingExperience; }
    get gamerMatchedRating() { return this.#gamerMatchedRating; }

    get username(){ return this.#username; }
    get email(){ return this.#email; }

    get account(){ return this.#account; }
}

module.exports = Gamer;