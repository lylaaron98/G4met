/**
 * 
 */
class Account {

    #id = null;

    #username = null;
    #email = null;
    #password = null;

    #role = null;

    constructor(username,email,password){

        this.#username = username;
        this.#email = email;
        this.#password = password;
    }

    set id(id){ this.#id = id; }
    set username(username){ this.#username = username; }
    set email(email){ this.#email = email; }
    set role(role){ this.#role = role; }
    set password(password){ this.#password = password; }

    get id(){ return this.#id; }
    get username(){ return this.#username; }
    get email(){ return this.#email; }
    get role(){ return this.#role; }
    get password(){ return this.#password; }

}

module.exports = Account;