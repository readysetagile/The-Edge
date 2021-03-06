const DEFAULTPROFILE = require("./model");
const DEFAULTAVATR = "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg";//TODO: change this to something original
import {firebase} from "../../config";
import Edge from '../../index'

class Profile {

    #reference;
    #parentPin;
    _user;

    /**
     * Creates a new profile object
     * @param profileObject
     */
    constructor(profileObject) {
        if(profileObject) {
            this.accountUUID = profileObject.accountUUID;
            this.profileUUID = profileObject?.id || profileObject.profileUUID;
            this._username = profileObject.username;
            this._avatar = profileObject.avatar;
            this._teams = profileObject.teams ? new Map(Object.entries(profileObject.teams)) : new Map();
            this._isParent = profileObject.isParent;
            this.#parentPin = profileObject.parentPin;
            this.#reference = firebase.database().ref("users/" + this.accountUUID + "/profiles");
        }
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
        path = path.replace(/\./g, "/");
        let ref = this.#reference.child(this.profileUUID);
        if (path) ref = ref.child(path);
        return ref.update(value);
    }

    /**
     * Deletes this profile and removes their profile picture if any
     */
    async delete() {

        await this.remove();

        let storage = firebase.storage();
        let ref = storage.ref(this.accountUUID + "/pfp/" + this.profileUUID);
        await ref.delete().catch(console.error);

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
        path = path.replace(/\./g, "/");
        let ref = firebase.database().ref('users/' + accountUUID + "/profiles/" + profileUUID);
        if (path) ref = ref.child(path);
        return ref.update(value);
    }

    /**
     * Adds a new team id to signify that this profile is apart of a team
     * @param team the team to add
     */
    addTeam(team) {
        this._teams.set(team.id, 0);
        let obj = {};
        obj[team.id] = 0;//TODO figure out how to use arrays with firebase
        this.#reference.child(this.profileUUID + '/teams').update(obj);
    }

    /**
     * Removes a team from the profile to signify they are not in this team anymore
     * @param teamId the teamid to remove
     */
    removeTeam(teamId) {
        this._teams.delete(teamId);
        this.#reference.child(this.profileUUID).child("teams").child(teamId).remove();
    }

    /**
     * This gets the profile's profile picture
     * @returns {Promise<String>} the file of the profile picture
     */
    async getProfilePicture() {
        if (!this._avatar) {
            let storage = firebase.storage();
            let ref = storage.ref(this.accountUUID + "/pfp/" + this.profileUUID);
            return await new Promise(resolve => {
                ref.getDownloadURL().then(url => {
                    this._avatar = url;
                    resolve(url);
                }).catch(() => resolve(null));
            });
        } else return this._avatar;
    }

    /**
     * @returns {String|null} the pin for the parent profile if this is a parent profile
     */
    getParentPin() {
        if (this.isParent) {
            return this.#parentPin;
        }
        return null;
    }

    /**
     * updates the current profile pin if it's a parent profile
     * @param pin the pin to set
     */
    setParentPin(pin) {

        this.#parentPin = pin;
        this.update({parentPin: pin}).catch(console.error);

    }

    /**
     * Updates a value for a user
     * @param path the parent of the value you're trying to update
     * @param value the new value to update it to. This must be an object ex. {username: "Bob"}
     * @returns {Promise<void>}
     */
    set(value, path = "") {
        path = path.replace(/\./g, "/");
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
        path = path.replace(/\./g, "/");
        let reference = this.#reference.child(this.profileUUID);
        if (path) reference = reference.child(path);
        return reference.remove();
    }

    async getUser() {

        if (!this.user) {
            let user = await Edge.users.get(this.accountUUID);
            this.user = user;
        }
        return this.user;

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


    set isParent(value) {
        this._isParent = value;
        this.update({isParent: value}).catch(console.error);
    }


    get isParent() {
        return this._isParent;
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


    get teams() {
        if(this._teams)
            return Array.from(this._teams.keys()).filter(i => i !== '_');
    }
}

export {DEFAULTAVATR};
export {Profile};

