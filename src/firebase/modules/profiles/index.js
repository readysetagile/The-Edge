const DEFAULTPROFILE = require("./model");
const DEFAULTAVATR = "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg";
import {firebase} from "../../config";

class Profile {

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
        this.isDisabled = profileObject.disabled;
        this.#reference = firebase.database().ref("users/" + this.accountUUID + "/profiles");
    }

    /**
     * Adds the default user to the database
     * @param profileUUID a uuid to assign to the profile
     * @param profileUsername a username to assign to the profile
     * @returns {Promise<any>} returns when the user has been created
     */
    async create(profileUUID, profileUsername) {

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
    update(value, path = "") {
        path = path.replace(/\./g, "/")
        let ref = this.#reference.child(this.profileUUID);
        if (path) ref = ref.child(path);
        return ref.update(value);
    }

    async delete() {

        await this.remove();

        let storage = firebase.storage();
        let ref = storage.ref(this.accountUUID + "/pfp/" + this.profileUUID);
        return await ref.delete().catch(err => {
        })

    }

    async setEnabled(enabled) {

        this.isDisabled = enabled;
        await this.update(enabled, "disabled");
        //TODO figure out what to do here to disable the account
    }

    /**
     * Convenience method to update profiles without having to make an instance of this class
     * @param accountUUID the account uuid assigned to this profile
     * @param profileUUID the profile's uuid
     * @param value the value to update
     * @param path the location of the value to place it in
     * @returns {Promise<any>} returns when the value is updated
     */
    static update(accountUUID, profileUUID, value, path = "") {
        path = path.replace(/\./g, "/")
        let ref = firebase.database().ref('users/' + accountUUID + "/profiles/" + profileUUID);
        if (path) ref = ref.child(path);
        return ref.update(value);
    }

    async getProfilePicture() {
        if (!this._avatar) {
            let storage = firebase.storage()
            let ref = storage.ref(this.accountUUID + "/pfp/" + this.profileUUID);
            return await new Promise(resolve => {
                ref.getDownloadURL().then(url => {
                    this._avatar = url;
                    resolve(url);
                }).catch(() => resolve(null))
            })
        } else return this._avatar;
    }

    /**
     * Updates a value for a user
     * @param path the parent of the value you're trying to update
     * @param value the new value to update it to. This must be an object ex. {username: "Bob"}
     * @returns {Promise<void>}
     */
    set(value, path = "") {
        path = path.replace(/\./g, "/")
        let ref = this.#reference.child(this.profileUUID);
        if (path) ref = ref.child(path);
        return ref.set(value);
    }

    /**
     * Removes the specified path
     * @param path the path to remove. If none, this will delete the profile
     * @returns {Promise<any>}
     */
    remove(path = "") {
        path = path.replace(/\./g, "/")
        let reference = this.#reference.child(this.profileUUID);
        if (path) reference = reference.child(path);
        return reference.remove();
    }

    /**
     * Creates a new user profile.
     * @param accountUUID the account to create the profile under
     * @param profileUUID the profile uuid
     * @param username the username of the profile
     * @returns {Promise<Profile>}
     */
    static async createProfile(accountUUID, profileUUID, username) {

        let profileObj = Object.assign({}, DEFAULTPROFILE);
        profileObj.id = profileUUID;
        profileObj.username = username;
        profileObj.accountUUID = accountUUID;
        let obj = {};
        obj[profileUUID] = profileObj;
        await firebase.database().ref('users/' + accountUUID + "/profiles").update(obj);
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
        if (!this._avatar)
            return DEFAULTAVATR;
        return this._avatar;
    }
}

export {DEFAULTAVATR}
export {Profile};

