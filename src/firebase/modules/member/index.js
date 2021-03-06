import {firebase} from "../../config";
import {Profile} from "../profiles";

const DEFAULTMEMBER = require("./model");

module.exports.Member = class Member {

    profile;
    #team;

    constructor(memberObj, profile, team) {

        this.id = memberObj.id;
        this.joinedTimestamp = memberObj.joinedTimestamp;
        this.teamAnswers = memberObj.teamAnswers;
        this.userNotes = memberObj.userNotes;
        this.username = memberObj.username;
        this.permissions = memberObj.permissions;
        this._profile = profile;
        this.#team = team;
    }


    setFormAnswers(answers) {

        this.teamAnswers = answers;
        firebase.database().ref('teams/' + this.#team.id + "/members/" + this.id).update({teamAnswers: answers});

    }

    get profile() {
        return new Profile(this._profile);
    }

    /**
     * Creates a new member object
     * @param profile the profile to make the member off of
     * @param team the team the member will be joining
     * @param reference to the firebase object
     * @returns {exports.Member} a new member object
     */
    static async createMember(profile, team, reference) {
        let obj = Object.assign(DEFAULTMEMBER);
        obj.joinedTimestamp = new Date().getTime();
        obj.id = profile.profileUUID;
        obj.username = profile.username;
        obj.accountID = firebase.auth().currentUser.uid;
        let member = {};
        member[obj.id] = obj;
        reference.child("members").update(member).catch(console.error);
        obj.profile = profile;
        return new Member(obj, profile, team);

    }

}