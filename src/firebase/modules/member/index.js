import Edge from '../../index';
import {createUUID} from "../../Util";
import {firebase} from "../../config";

const DEFAULTMEMBER = require("./model");
module.exports.Member = class Member {

    constructor(memberObj) {

        this.joinedTimestamp = memberObj.joinedTimestamp;
        this.id = memberObj.id;
        this.profile = Edge.users.getProfile(memberObj.accountUUID, memberObj.id);
        this.team = Edge.teams.get(memberObj.teamID);
        this.permissions = memberObj.permissions;
        this.teamAnswers = memberObj.teamAnswers;
        this.userNotes = memberObj.userNotes;
        this.ref = memberObj.ref;

    }


    /**
     * Creates a new member based to the designated team
     * @param teamID the teamId to add the member to
     * @param accountID the account the member comes from
     * @returns {Promise<Member>}
     */
    static async create(teamID, accountID){

        const memberObj = Object.assign({}, DEFAULTMEMBER);
        memberObj.id = createUUID();
        memberObj.joinedTimestamp = new Date().getTime();
        memberObj.accountUUID = accountID;
        memberObj.teamID = teamID;
        let obj = {};
        obj[memberObj.id] = memberObj;
        const ref = firebase.database().ref("teams/"+teamID+"/members");
        await ref.update(obj);
        memberObj.ref = ref.child(memberObj.id);

        return new Member(memberObj);
    }

}