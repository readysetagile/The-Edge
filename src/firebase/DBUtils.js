import { firebase, firestore, storage } from "./config";

module.exports.DB = class DB{

    constructor() {
        this.database = firebase.database();
    }

    static addUserToDB(username, email){

        const ref = firebase.database().ref('users');
        let obj = {};
        obj[username] = {
            email: email,
            isEmailVerified: false
        }
        ref.update(obj);
    }

}