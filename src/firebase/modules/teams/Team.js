import {createUUID} from "../../Util";
import {firebase} from "../../config";

const DEFAULTTEAM = require('./model');

module.exports.Team = class Team {

    #reference
    constructor(teamObject) {
        console.log(teamObject, 123);
        this.id = teamObject.id;
        this.modules = teamObject.modules;
        this.members = teamObject.members;
        this.teamCode = teamObject.teamCode;
        this.teamName = teamObject.teamName;
        this.sport = teamObject.sport;
        this.#reference = firebase.database().ref("teams/"+this.id);

    }


    addMember(profile){
        this.members.set(profile.id, profile);
        profile.addTeam(this.id);
        this.#reference.update({members: this.members})
    }

    static async createTeam(name, sport, ref){

        let obj = Object.assign({}, DEFAULTTEAM);
        obj.teamName = name;
        obj.id = createUUID();
        obj.sport = sport;
        obj.teamCode = createUUID('xxxxxx');
        obj.members.set(0, 0);
        let team = new Team(obj);
        let teamObj = {};
        teamObj[obj.id] = obj;
        await ref.update(teamObj);
        return team;

    }

}