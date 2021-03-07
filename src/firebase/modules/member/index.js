import {firebase} from "../../config";
import {Profile} from "../profiles";

const DEFAULTMEMBER = require("./model");

module.exports.Member = class Member {

    profile;
    #team;
    #ref;
    #_permissions

    constructor(memberObj, profile, team) {

        this.id = memberObj.id;
        this.joinedTimestamp = memberObj.joinedTimestamp;
        this.teamAnswers = memberObj.teamAnswers;
        this.userNotes = memberObj.userNotes;
        this.username = memberObj.username;
        this.#_permissions = new Map(Object.entries(memberObj.permissions));
        this._profile = profile;
        this.#team = team;
        this.accountID = memberObj.accountID;
        this.#ref = firebase.database().ref('teams/' + this.#team.id + "/members/" + this.id);
    }

    addPermission(name, value) {
        this.#_permissions.set(name, value);
        this.#ref.update({permissions: Object.fromEntries(this.#_permissions.entries())});
    }

    removePermission(name) {
        this.#_permissions.delete(name);
        this.#ref.update({permissions: this.#_permissions});
    }

    setFormAnswers(answers) {

        this.teamAnswers = answers;
        this.#ref.update({teamAnswers: answers});

    }

    leaveTeam(teamId) {

        this.profile.removeTeam(teamId);

    }

    /**
     * Gets a map of all permissions this member has
     * @returns {Map<String, any>} a string - any map that shows set permissions
     */
    get permissions() {
        return this.#_permissions;
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