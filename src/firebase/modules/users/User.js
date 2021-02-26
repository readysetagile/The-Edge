import {Profile} from "../profiles";
import {firebase} from "../../config";

module.exports.User = class User {

    userData;
    settings;
    #_profiles;
    #reference;

    constructor(userObject) {
        this.userData = userObject.userData;
        this.settings = userObject.settings;
        this.#_profiles = userObject.profiles ? new Map(Object.entries(userObject.profiles)
            .filter(i => i[0] !== "_")) : new Map();
        this.#reference = firebase.database().ref('users/' + this.userData.id);

    }


    async addProfile(profileUUID, username) {
        let profile = await Profile.createProfile(this.userData.id, profileUUID, username)
        this.#_profiles.set(profileUUID, profile);
        return profile;
    }

    async removeProfile(profileUUID) {
        this.#_profiles.remove(profileUUID);
        this.#reference.update({profiles: this.#_profiles});
    }

    getProfile(profileUUID){
        return this.#_profiles.get(profileUUID);
    }

    /**
     * Updates the database to the value input
     * @param objectToUpdate the object in the database to update
     */
    update(objectToUpdate) {
        this.#reference.update(objectToUpdate);
    }

    get profiles() {
        return Array.from(this.#_profiles, ([key, value]) => new Profile(value));
    }
}
