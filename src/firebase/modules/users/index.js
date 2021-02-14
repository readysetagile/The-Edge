import {Profile} from "../profiles";
import {firebase} from "../../config";
import {User} from "./User";
const DEFAULTUSER = require("./model");

module.exports.Users = class Users{


    #reference;
     constructor() {
         this.#reference = firebase.database().ref("users");
             this.#reference.on('value', snap => {
                 if(snap.val() != null)
                 this.accounts = new Map(Object.entries(snap.val()));
             })
    }

    /**
     * Adds the default user to the database
     * @param email the email of the user
     * @param rememberLogin weather to remember the users login
     * @param uuid
     * @returns {User} returns the new user account created
     */
    async create(email, rememberLogin, uuid){
        let obj = Object.assign({}, DEFAULTUSER);
        obj.userData.id = uuid;
        obj.userData.email = email;
        obj.settings.rememberLogin = rememberLogin;

        let user = new User(obj);
        let userObj = {};
        userObj[uuid] = obj;
        await this.#reference.update(userObj);
        this.accounts.set(uuid, user);
        return user;
    }

    /**
     * Gets a user by their uuid
     * @param uuid the uuid assigned to the user account
     * @returns {Promise<User>}
     */
     get(uuid){
        return new User(this.accounts.get(uuid));
    }

    /**
     * Gets a profile
     * @param uuid the account uuid the profile is under
     * @param profileUUID the uuid of the profile
     * @returns {Promise<Profile|null>}
     */
    async getProfile(uuid, profileUUID){

        let account = await this.get(uuid);
        let profile = account.profiles[profileUUID]
        if(profile)
            return new Profile(profile);
        else return null;
    }

    /**
     * Updates a value for a user
     * @param uuid the user uuid to update
     * @param path the parent of the value you're trying to update
     * @param value the new value to update it to. This must be an object ex. {username: "Bob"}
     * @returns {Promise<void>}
     */
    async update(uuid, value, path=""){
        path = path.replace(/\./g, "/")
        return await this.#reference.child(uuid).child(path).update(value);
    }


    /**
     * Replaces any existing data with the value to set the path to
     * This will remove any other data not found in the path with {value}
     * @param uuid the uuid to set to
     * @param value the new value to update to. This must be an object ex. {username: "bob"}
     * @param path the parent of the value you're trying to set
     * @returns {Promise<void>}
     */
    async set(uuid, value, path=""){
        path = path.replace(/\./g, "/")
        return await this.#reference.child(uuid).child(path).set(value);
    }

    /**
     * Removes the specified path
     * @param uuid the users uuid to remove from
     * @param path the path to remove. If none, this will delete the user
     * @returns {Promise<any>}
     */
    async remove(uuid, path=""){
        path = path.replace(/\./g, "/")
        let reference = this.#reference.child(uuid);
        if(path) reference = reference.child(path);
        return await reference.remove();
    }

}

