import {Users} from "./modules/users";

export class Edge{

    constructor() {

        this.initialize();

    }

    initialize(){
        this.initDB();
    }

    initDB(){
        this.users = new Users();
        //this.teams = new
    }

    /**
     * Creates a new unique id based on the current time in milliseconds
     * @returns {string} 5 sections of 4 numbers/characters
     */
    static createUUID(){
        let dt = new Date().getTime();
        const uuid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

}