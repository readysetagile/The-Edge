const DEFAULTUSER = require("./model");
import {createUUID} from "../../index"
import {firebase} from "../../config";

module.exports.Users = class Users{

     constructor() {
        const ref = firebase.database().ref("users");
        this.reference = ref;
        (async () => {
             this.database = await new Promise(resolve => {
                 ref.on('value', snapshot => {
                     resolve(snapshot);
                 })
             })
             console.log("User database initialized");
         })();

    }

    /**
     * Adds the default user to the database
     * @param email the email of the user
     * @param rememberLogin weather to remember the users login
     * @returns {Promise<any>} resolves when the update is complete
     */
    async create(email, rememberLogin){

        const uuid = createUUID();
        let obj = Object.assign({}, DEFAULTUSER);
        obj.userData.ID = uuid;
        obj.userData.email = email;
        obj.userData.rememberLogin = rememberLogin;
        let userObj = {};
        userObj[uuid] = obj;
        return await this.reference.update(userObj);
    }

    /**
     * Gets a user by their uuid
     * @param uuid the uuid assigned to the user account
     * @returns {Promise<User>}
     */
    async get(uuid){
        let reference = this.reference.child(uuid);
        return await new Promise(resolve => {
            reference.on('value', snapshot => {
                resolve(snapshot);
            });
        });
    }

    /**
     * Updates a value for a user
     * @param uuid the user uuid to update
     * @param path the path of the value. Separate each child path with '.' or '/'
     * @param value the new value to update it to
     * @returns {Promise<void>}
     */
    async update(uuid, value, path=""){
        path = path.replaceAll(".", "/")
        let update = {};
        if(path) update[path] = value;
        else update = value;
        return await this.reference.child(uuid).child(path).update(update);
    }


    /**
     * Replaces any existing data with the value to set the path to
     * This will remove any other data not found in the path with {value}
     * @param uuid the uuid to set to
     * @param value the new value to update to
     * @param path the path where the value should be
     * @returns {Promise<void>}
     */
    async set(uuid, value, path=""){
        path = path.replaceAll(".", "/")
        let update = {};
        if(path) update[path] = value;
        else update = value;
        return await this.reference.child(uuid).child(path).set(update);
    }

    /**
     * Removes the specified path
     * @param uuid the users uuid to remove from
     * @param path the path to remove. If none, this will delete the user
     * @returns {Promise<any>}
     */
    async remove(uuid, path=""){
        path = path.replaceAll(".", "/")
        return await this.reference.child(uuid).child(path).remove();
    }

}

