import { firebase, firestore, storage } from "./config";


module.exports.DB = class DB{

    constructor() {
        this.database = firebase.database();
    }

    async createAccount(username, email, password){

        let obj = {};
        obj[username] = {
            username: username,
            email: email,
            password: password//TODO: replace with encryption
        }
        await this.database.ref("/Users").set(obj);
        return true;
    }

    async getAccount(username){

        return await new Promise(resolve => {
            this.database.ref("/Users/"+username).once('value').then(snap => {
                console.log(snap.val(), 1);
                resolve(snap.val());
            })
        })

    }

}