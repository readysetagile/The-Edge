import {createUUID} from "../../Util";
import {firebase} from "../../config";

const DEFAULTTEAM = require('./model');

module.exports.Team = class Team {

    #reference

    constructor(teamObject) {
        if (teamObject) {
            this.id = teamObject.id;
            this.modules = teamObject.modules;
            this.members = teamObject.members ? teamObject.members : {};
            this.teamCode = teamObject.teamCode;
            this.teamName = teamObject.teamName;
            this.sport = teamObject.sport;
            this.#reference = firebase.database().ref("teams/" + this.id);
        }

    }


    addMember(profile) {
        console.log(profile, 'prof');
        this.members[profile.profileUUID] = profile;
        profile.addTeam(this);
        this.#reference.update({members: this.members})
    }

    static async createTeam(name, sport, ref) {

        let obj = Object.assign({}, DEFAULTTEAM);
        obj.teamName = name;
        obj.id = createUUID();
        obj.sport = sport;
        obj.teamCode = createUUID('xxxxxx');
        let team = new Team(obj);
        let teamObj = {};
        teamObj[obj.id] = obj;
        console.log(teamObj);
        await ref.update(teamObj);
        return team;

    }

}