import {Users} from "./modules/users";
import {Teams} from "./modules/teams";

class Edge {

    constructor() {
        this.initialize();
    }


    initDB() {
        this.users = new Users();
        this.teams = new Teams();
    }

    initialize() {
        this.initDB();
    }

}

export default new Edge();
export {Edge};
