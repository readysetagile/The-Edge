import {Users} from "./modules/users";

 class Edge{

    constructor() {
        this.initialize();
    }



    initDB(){
        this.users = new Users();
    }

     initialize() {
         this.initDB()
     }
 }

  export function createUUID(){
     let dt = new Date().getTime();
     const uuid = 'xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
         const r = (dt + Math.random() * 16) % 16 | 0;
         dt = Math.floor(dt / 16);
         return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
     });
     return uuid;
 }

export default new Edge();
 export {Edge}
