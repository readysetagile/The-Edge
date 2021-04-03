import {firebase} from "../../config";
import {Profile} from "../profiles";
import {Drill} from "../Drills";

const DEFAULTMEMBER = require("./model");

module.exports.Member = class Member {

    _profile;
    #team;
    #ref;
    #_permissions
    _assignedDrills

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
        this._assignedDrills = memberObj.assignedDrills;
        this.#ref = firebase.database().ref('teams/' + this.#team.id + "/members/" + this.id);
    }

    addAssignedDrill(drillObj){
        const drills = this._assignedDrills;
        drills[drillObj.id] = drillObj;
        this.#ref.child("assignedDrills").update(drills);
    }

    /**
     * Gets a drill from this member
     * @param drillID the id of the drill
     * @returns {Drill}
     */
    getDrill(drillID){
        return new Drill(this._assignedDrills[drillID]);
    }

    /**
     * Adds a new permission to the user
     * @param name the name of the permission
     * @param value the value of the permission
     */
    addPermission(name, value) {
        this.#_permissions.set(name, value);
        this.#ref.update({permissions: Object.fromEntries(this.#_permissions.entries())});
    }

    /**
     * removes a permission from the user
     * @param name the permission to remove
     */
    removePermission(name) {
        this.#_permissions.delete(name);
        this.#ref.update({permissions: this.#_permissions});
    }

    /**
     * Updates the members answers to the form
     * @param answers
     */
    setFormAnswers(answers) {

        this.teamAnswers = answers;
        this.#ref.update({teamAnswers: answers});

    }

    /**
     * Convenience method to make the profile leave this team
     * @param teamId the id of the team to leave
     */
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

    /**
     * @returns {Profile} a profile object of this members profile
     */
    get profile() {
        if(this._profile)
            return new Profile(this._profile);

    }


    get assignedDrills() {
        return this._assignedDrills;
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