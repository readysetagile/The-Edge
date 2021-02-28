import {firebase} from "../../config";
import Edge from "../../index";

const DEFAULTMEMBER = require("./model");

module.exports.Member = class Member {

    constructor(memberObj) {

        this.id = memberObj.id;
        this.joinedTimestamp = memberObj.joinedTimestamp;
        this.teamAnswers = memberObj.teamAnswers;
        this.userNotes = memberObj.userNotes;
        this.permissions = memberObj.permissions;
        //this.profile = user.getProfile(this.id);
    }


    /**
     * Creates a new member object
     * @param profile the profile to make the member off of
     * @param team the team the member will be joining
     * @param reference to the firebase object
     * @returns {exports.Member} a new member object
     */
     static async createMember(profile, team, reference){
        let obj = Object.assign(DEFAULTMEMBER);
        obj.joinedTimestamp = new Date().getTime();
        obj.id = profile.profileUUID;
        obj.username = profile.username;
        obj.accountID = firebase.auth().currentUser.uid;
        let member = {};
        member[obj.id] = obj;
        reference.update({members: member}).catch(console.error);
        obj.profile = profile;
        return new Member(obj);

    }

}