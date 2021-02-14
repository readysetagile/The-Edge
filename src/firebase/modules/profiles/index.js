const DEFAULTPROFILE = require("./model");
import {firebase} from "../../config";

class Profile{

    #reference;

    /**
     * Creates a new profile object
     * @param profileObject
     */
    constructor(profileObject) {
        this.accountUUID = profileObject.accountUUID;
        this.profileUUID = profileObject.id;
        this._username = profileObject.username;
        this._avatar = profileObject.avatar;
        this.teams = profileObject.teams;
        this.#reference = firebase.database().ref("users/"+this.accountUUID+"/profiles");
    }

    /**
     * Adds the default user to the database
     * @param profileUUID a uuid to assign to the profile
     * @param profileUsername a username to assign to the profile
     * @returns {Promise<any>} returns when the user has been created
     */
    async create(profileUUID, profileUsername){

        let obj = Object.assign({}, DEFAULTPROFILE);
        obj.id = profileUUID;
        obj.username = profileUsername;
        return await this.#reference.update({profileUUID: obj});
    }

    /**
     * Updates a value for a user
     * @param path the parent of the value you're trying to update
     * @param value the new value to update it to. This must be an object ex. {username: "Bob"}
     * @returns {Promise<void>}
     */
    async update(value, path=""){
        path = path.replace(/\./g, "/")
        let ref = this.#reference.child(this.profileUUID);
        if(path) ref = ref.child(path);
        return await ref.update(value);
    }

    /**
     * Convenience method to update profiles without having to make an instance of this class
     * @param accountUUID the account uuid assigned to this profile
     * @param profileUUID the profile's uuid
     * @param value the value to update
     * @param path the location of the value to place it in
     * @returns {Promise<any>} returns when the value is updated
     */
    static async update(accountUUID, profileUUID, value, path=""){
        path = path.replace(/\./g, "/")

        return await firebase.database().ref('users/'+accountUUID+"/profiles/"+profileUUID)
            .child(path).update(value);

    }


    /**
     * Updates a value for a user
     * @param path the parent of the value you're trying to update
     * @param value the new value to update it to. This must be an object ex. {username: "Bob"}
     * @returns {Promise<void>}
     */
    async set(value, path=""){
        path = path.replace(/\./g, "/")
        let ref = this.#reference.child(this.profileUUID);
        if(path) ref = ref.child(path);
        return await ref.set(value);
    }

    /**
     * Removes the specified path
     * @param path the path to remove. If none, this will delete the user
     * @returns {Promise<any>}
     */
    async remove(path=""){
        path = path.replace(/\./g, "/")
        let reference = this.#reference.child(this.profileUUID);
        if(path) reference = reference.child(path);
        return await reference.remove();
    }

    static async createProfile(accountUUID, profileUUID, username){

        let profileObj = Object.assign({}, DEFAULTPROFILE);
        profileObj.id = profileUUID;
        profileObj.username = username;
        profileObj.accountUUID = accountUUID;
        let obj = {};
        obj[profileUUID] = profileObj;
        await firebase.database().ref('users/'+accountUUID+"/profiles").update(obj);
        return new Profile(profileObj);

    }

    set username(value) {
        this._username = value;
        this.update({username: value}).catch(console.error);
    }

     set avatar(value) {
        this._avatar = value;
        this.update({avatar: value}).catch(console.error);
    }

    get username() {
        return this._username;
    }

    get avatar() {
        return this._avatar;
    }
}

export {Profile};

