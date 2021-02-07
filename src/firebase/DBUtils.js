import { firebase, firestore, storage } from "./config";

module.exports.DB = class DB{

    constructor() {
        this.database = firebase.database();
    }

    /**
     * Adds a user to the database with their username and email
     * @param username the username of the user
     * @param email the email of the user
     * @precondition the user does not already exist in the database
     */
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