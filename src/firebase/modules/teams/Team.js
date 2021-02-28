import {createUUID} from "../../Util";
import {firebase} from "../../config";
import {Member} from "../member";
import Edge from "../../index";

const DEFAULTTEAM = require('./model');

module.exports.Team = class Team {

    #reference

    constructor(teamObject) {
        if (teamObject) {
            this.id = teamObject.id;
            this.modules = teamObject.modules;
            this.members = new Map(Object.entries(teamObject.members));
            this.teamCode = teamObject.teamCode;
            this.teamName = teamObject.teamName;
            this.sport = teamObject.sport;
            this.#reference = firebase.database().ref("teams/" + this.id);
        }

    }

    /**
     * Gets a member in the current team
     * @param id the id of the member (profile id)
     * @returns {Member} the member that has been assigned this id
     */
    async getMember(id){
        let member = this.members.get(id);
        let profile = (await Edge.users.get(member.accountID)).getProfile(id);
        return this.members.get(id) instanceof Member ? this.members.get(id) : new Member(this.members.get(id), profile);
    }

    async addMember(profile) {
        let member = await Member.createMember(profile, this, this.#reference)
        this.members.set(member.id, member);
        profile.addTeam(this);
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
        console.log(teamObj);
        ref.update(teamObj);
        return team;

    }

}