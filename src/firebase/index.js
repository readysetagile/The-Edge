import {Users} from "./modules/users";
import {Teams} from "./modules/teams";
 class Edge{

    constructor() {
        this.initialize();
    }


    initDB(){
        this.users = new Users();
        this.teams = new Teams();
    }

     initialize() {
         this.initDB();
     }

 }

/**
 * Creates a new unique ID
 * @param string [xxxx-xxxx-xxxx-xxxx] replaces any 'x' found in this string with a random character. Otherwise returns a uniuqe string
 * @returns {string} a randomly generated unique ID
 */
  export function createUUID(string){
     let dt = new Date().getTime();
     const uuid = (string == null ? 'xxxx-xxxx-xxxx-xxxx' : string).replace(/[xy]/g, function (c) {
         const r = (dt + Math.random() * 16) % 16 | 0;
         dt = Math.floor(dt / 16);
         return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
     });
     return uuid;
 }

export default new Edge();
 export {Edge}
