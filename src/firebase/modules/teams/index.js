import {firebase} from "../../config";
import {Team} from "./Team";

const DEFAULTTEAM = require("./model");

module.exports.Teams = class Teams {

    #reference;
    teams;

    constructor() {
        this.#reference = firebase.database().ref("teams");
    }

    /**
     * Adds a default team to the database
     * @param name the name of the team
     * @param sport the sport the team does
     * @returns {Team} returns the new team created
     */
    async create(name, sport) {
        let team = await Team.createTeam(name, sport, this.#reference);
        if (this.teams == null) {
            this.teams = new Map();
        }
        this.teams.set(team.id, team);
        return team;
    }

    async getAllTeams() {

        if (this.teams == null) {

            return await new Promise(resolve => {
                this.#reference.on('value', snap => {
                    let val = snap.val();
                    if (val != null) {
                        this.teams = new Map(Object.entries(val));
                        resolve(this.teams);
                    }
                });
            });

        } else return this.teams;

    }

    /**
     * Gets a team by its uuid
     * @param uuid the uuid assigned to the user account
     * @returns {Promise<Team>}
     */
    async get(uuid) {
        if (this.teams == null) {
            return await new Promise(resolve => {
                this.#reference.on('value', snap => {
                    let val = snap.val();
                    if (val != null) {
                        this.teams = new Map(Object.entries(val));
                        resolve(new Team(this.teams.get(uuid)));
                    }
                });
            });
        } else {
            let teamObject = this.teams.get(uuid);
            if (teamObject == null) return null;
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