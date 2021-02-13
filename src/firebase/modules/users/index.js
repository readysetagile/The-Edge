const DEFAULTUSER = require("./model");
import {Edge} from "../../index"
import {firebase} from "../../config";

module.exports.Users = class Users{

    async constructor() {
        const ref = firebase.database().ref("users");
        this.reference = ref;
        this.database = await new Promise(resolve => {
            ref.on('value', snapshot => {
                resolve(snapshot);
            })
        })
        console.log("User database initialized");

    }

    async create(email, rememberLogin){

        const uuid = Edge.createUUID();
        let obj = Object.assign({}, DEFAULTUSER);
        obj.userData.ID = uuid;
        obj.userData.email = email;
        obj.userData.rememberLogin = rememberLogin;
        let userObj = {};
        userObj[uuid] = obj;
        return await this.reference.update(userObj);
    }

}