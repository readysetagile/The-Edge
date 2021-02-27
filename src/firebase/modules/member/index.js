import {firebase} from "../../config";

const DEFAULTMEMBER = require("./model");

module.exports.Member = class Member {

    constructor(memberObj) {

        this.id = memberObj.id;
        this.joinedTimestamp = memberObj.joinedTimestamp;
        this.teamAnswers = memberObj.teamAnswers;
        this.userNotes = memberObj.userNotes;
        this.permissions = memberObj.permissions;
    }


    /**
     * Creates a new member object
     * @param profile the profile to make the member off of
     * @param team the team the member will be joining
     * @returns {exports.Member} a new member object
     */
    static createMember(profile, team){

        let obj = Object.assign(DEFAULTMEMBER);
        obj.joinedTimestamp = new Date().getTime();
        obj.id = profile.id;
        let member = {};
        member[obj.id] = obj;
        firebase.database().ref('teams/'+team.id+"/members").update(member).catch(console.error);
        obj.profile = profile;
        return new Member(obj);


    }

}