import {Profile} from "../profiles";
import {firebase} from "../../config";

module.exports.User = class User{

    userData;
    settings;
    #_profiles;
    #reference;
    constructor(userObject) {
        this.userData = userObject.userData;
        this.settings = userObject.settings;
        this.#_profiles = new Map(Object.entries(userObject.profiles)
            .map(i => [i[0], new Profile(i[1])]));
        this.#reference = firebase.database().ref('users/'+this.userData.id);

    }


    async addProfile(profileUUID, username){
        let profile = await Profile.createProfile(this.userData.id, profileUUID, username)
        this.profiles.set(profileUUID, profile);
        return profile;
    }

    /**
     * Updates the database to the value input
     * @param objectToUpdate the object in the database to update
     */
    update(objectToUpdate){
        this.#reference.update(objectToUpdate);
    }

    get profiles() {
        return this.#_profiles;
    }
}
