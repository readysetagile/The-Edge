import {firebase} from "../../config";
import {createUUID} from "../../index";
import {Team} from "./Team";

const DEFAULTTEAM = require("./model");

module.exports.Teams = class Teams {

    #reference;
    constructor() {
        this.#reference = firebase.database().ref("teams");
    }

    /**
     * Adds a default team to the database
     * @returns {User} returns the new user account created
     * @param name the name of the team
     */
    async create(name) {
        let obj = Object.assign({}, DEFAULTTEAM);
        obj.teamName = name;
        obj.id = createUUID();

        let team = new Team(obj);
        let teamObj = {};
        teamObj[obj.id] = obj;
        await this.#reference.update(teamObj);
        this.accounts.set(obj.id, team);
        return team;
    }

    /**
     * Gets a team by its uuid
     * @param uuid the uuid assigned to the user account
     * @returns {Promise<Team>}
     */
    async get(uuid) {
        if(this.teams == null) {
            return await new Promise(resolve => {
                this.#reference.on('value', snap => {
                    if (snap.val() != null) {
                        this.teams = new Map(Object.entries(snap.val()));
                        resolve(new Team(this.accounts.get(uuid)));
                    }
                });
            });
        }else{
            let teamObject = this.teams.get(uuid);
            if(teamObject == null) return null;
            return new Team(teamObject);
        }

    }

    /**
     * Removes the specified path
     * @param uuid the users uuid to remove from
     * @param path the path to remove. If none, this will delete the user
     * @returns {Promise<any>}
     */
    async remove(uuid, path = "") {
        path = path.replace(/\./g, "/")
        let reference = this.#reference.child(uuid);
        if (path) reference = reference.child(path);
        return await reference.remove();
    }

}