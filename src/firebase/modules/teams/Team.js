import {createUUID} from "../../Util";
import {firebase} from "../../config";

const DEFAULTTEAM = require('./model');

module.exports.Team = class Team {

    #reference

    constructor(teamObject) {
        if (teamObject) {
            this.id = teamObject.id;
            this.modules = teamObject.modules;
            this.members = teamObject.members ? new Map(Object.entries(teamObject.members)) : new Map();
            this.teamCode = teamObject.teamCode;
            this.teamName = teamObject.teamName;
            this.sport = teamObject.sport;
            this.#reference = firebase.database().ref("teams/" + this.id);
        }

    }


    addMember(profile) {
        this.members.set(profile.id, profile);
        profile.addTeam(this);
        this.#reference.update({members: this.members})
    }

    /**
     * Creates a new team
     * @param name the name of the team
     * @param sport the sport the team plays
     * @param ref the reference object to the team
     * @returns {exports.Team}
     */
    static createTeam(name, sport, ref) {

        let obj = Object.assign({}, DEFAULTTEAM);
        obj.teamName = name;
        obj.id = createUUID();
        obj.sport = sport;
        obj.teamCode = createUUID('xxxxxx');
        let team = new Team(obj);
        let teamObj = {};
        teamObj[obj.id] = obj;
        ref.update(teamObj);
        return team;

    }

}