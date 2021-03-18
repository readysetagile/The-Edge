import {createUUID} from "../../Util";
import {firebase} from "../../config";
import {Member} from "../member";
import Edge from "../../index";

const DEFAULTTEAM = require('./model');

module.exports.Team = class Team {

    #reference
    _teamCode
    modules

    constructor(teamObject) {
        if (teamObject) {
            this.id = teamObject.id;
            this.modules = teamObject.modules;
            this.members = new Map(Object.entries(teamObject.members));
            this._teamCode = teamObject.inviteData.teamCode;
            this.teamName = teamObject.teamName;
            this.sport = teamObject.sport;
            this.inviteData = teamObject.inviteData;
            this.#reference = firebase.database().ref("teams/" + this.id);
        }

    }

    addTagToDrill(drillID, tagID){

        const drillTags = this.modules.drills.drills[drillID].tags;
        drillTags.push(tagID);
        this.#reference.child('modules/drills/drills').child(drillID).update({tags: drillTags})

    }

    removeTagFromDrill(drillID, tagID){

        let drillTags = this.modules.drills.drills[drillID].tags;
        drillTags = drillTags.filter(i => i !== tagID);
        this.#reference.child('modules/drills/drills').child(drillID).update({tags: drillTags})

    }

    removeTag(tagID){
        delete this.modules.drills.tags[tagID];
        this.#reference.child("modules/drills").update({tags: this.modules.drills.tags});

    }
    addTag(tagID, tag){
        if(tag.drills)
            delete tag.drills;
        this.modules.drills.tags[tagID] = tag;
        this.#reference.child("modules/drills").update({tags: this.modules.drills.tags});
    }

    removeDrill(drillID){
        delete this.modules.drills.drills[drillID];
        this.#reference.child("modules/drills").set({drills: this.modules.drills.drills});
    }

    setDrillTags(drillID, tags){
        const drill = this.modules.drills.drills[drillID];
        drill.tags = tags
        this.#reference.child('modules/drills/drills').update({[drillID]: tags})
    }

    addDrill(drillID, drill){
        this.modules.drills.drills[drillID] = drill;
        this.#reference.child("modules/drills/drills").update({[drillID]: drill});
    }

    /**
     * Sets this teams questions
     * @param questionInfo the questions to set this team questions to
     */
    setTeamQuestions(questionInfo) {

        if (questionInfo.type !== 'multipleChoice' && questionInfo.type !== 'checkBoxes') {
            questionInfo.multipleChoice = null;
        }
        this.#reference.child("modules").update({teamQuestions: questionInfo});

    }

    getTeamQuestions() {
        return this.modules.teamQuestions;
    }

    /**
     * Removes a member from the team
     * @param id the id of the member to remove
     */
    removeMember(id) {

        this.members.delete(id);
        this.#reference.update({members: Object.fromEntries(this.members.entries())});
    }

    /**
     * Gets a member in the current team
     * @param id the id of the member (profile id)
     * @returns {Member} the member that has been assigned this id
     */
    async getMember(id) {
        let member = this.members.get(id);
        let profile = (await Edge.users.get(member.accountID)).getProfile(id);
        return this.members.get(id) instanceof Member ? this.members.get(id) : new Member(this.members.get(id), profile, this);
    }

    /**
     * Adds a new member to this team
     * @param profile the profile of this member
     * @param filledQuestions the questions this profile filled out to join this team
     * @returns {Promise<Member>} the member that was added to this team
     */
    async addMember(profile, filledQuestions = {_: 0}) {
        let member = await Member.createMember(profile, this, this.#reference);
        member.setFormAnswers(filledQuestions);
        this.members.set(member.id, member);
        profile.addTeam(this);
        return member;
    }

    /**
     * Toggles weather or not people are allowed to join this team
     * @param value true to allow, false to prohibit joining
     */
    toggleTeamJoining(value) {
        this.inviteData.acceptNewMembers = value;
        this.#reference.child("inviteData").update({acceptNewMembers: value})
    }


    set teamCode(value) {
        this._teamCode = value;
        this.inviteData.teamCode = value;
        this.#reference.child("inviteData").update({teamCode: value})
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
        obj.inviteData.teamCode = createUUID('xxxxxx');
        let team = new Team(obj);
        let teamObj = {};
        teamObj[obj.id] = obj;
        ref.update(teamObj);
        return team;

    }

}