
class RequestHistory {

    #id = null;
    #senderId = null;
    #receiverId = null;

    #status = null;

    #receiverName = null;
    #sendderName = null;

    #createdAt = null;
    #updatedAt = null;

    constructor(senderId,receiverId){

        this.#senderId = senderId;
        this.#receiverId = receiverId;
    }

    get id(){ return this.#id; }

    get senderId(){ return this.#senderId; }
    get receiverId(){ return this.#receiverId; }
    get status(){ return this.#status; }
    get createdAt(){ return this.#createdAt; }
    get updatedAt(){ return this.#updatedAt; }

    get receiverName(){ return this.#receiverName; }
    get senderName(){ return this.#sendderName; }
    
    set id(value){ this.#id = value; }

    set senderId(value){ this.#senderId = value; }
    set receiverId(value){ this.#receiverId = value; }
    set status(value){ this.#status = value; }
    set createdAt(value){ this.#createdAt = value; }
    set updatedAt(value){ this.#updatedAt = value; }

    set receiverName(value){ this.#receiverName = value; }
    set senderName(value){ this.#sendderName = value; }
}

module.exports = RequestHistory;