import {firebase} from "./config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from "react-native";

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
    static addUserToDB(username, email, rememberUser){

        const ref = firebase.database().ref('users');
        let obj = {};
        obj[username] = {
            email: email,
            isEmailVerified: false,
            rememberLogin: rememberUser
        }
        ref.update(obj);
    }

    /**
     * Returns the data for a user
     * @param username the username of the user to get data from
     * @returns {Promise<object>} an object of the data stored in the users database
     */
    static async getUserData(username){
        const ref = firebase.database().ref("users/"+username);
        return await new Promise(resolve => {
            ref.on('value', snapshot => {
                resolve(snapshot);
            })
        })

    }

    static async updateUserData(refPath, data){
        const ref = firebase.database().ref(refPath);
        await ref.update(data);
    }

    /**
     * Sets the persistent login for this device
     * @param firebaseCredentials the credentials given from firebase after a user first logs in
     * @returns {Promise<boolean>} if this was successful or not
     */
    static async setPersistentLogin(firebaseCredentials) {

        try {
            let token = JSON.stringify(firebaseCredentials);
            if(token != null)
            AsyncStorage.setItem("@UserData", token);
            else AsyncStorage.removeItem("@UserData");
            return true;
        }catch(e){
            console.error(e);
            Alert.alert("Something went wrong");
            return false;
        }

    }

    /**
     * Gets the credentials from a user login
     * @returns {Promise<object>} the credentials from a user login
     */
    static async getPersistentLogin(){

        try{
            return await new Promise(async resolve => {
                let userData = await AsyncStorage.getItem("@UserData");
                resolve(JSON.parse(userData));
            });

        }catch (e) {
            console.error(e);
        }

    }

}