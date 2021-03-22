import {createUUID} from "../../Util";
import {firebase} from "../../../firebase/config";
const DEFAULTDRILL = require("./model");

/**
 * A class to manage a drill that has been assigned to a member
 * Not to be used for an actual creation of a drill. Use the Team methods for that
 * @type {exports.Drill}
 */
module.exports.Drill = class Drill{

    #ref;

    constructor(drillData) {

        this.dateAssigned = drillData.dateAssigned;
        this.drillName = drillData.drillName;
        this.assignedBy = drillData.assignedBy;
        this.teamID = drillData.teamID;
        this.id = drillData.id;
        this.assignedTo = drillData.assignedTo;
        this.dateDue = drillData.dateDue;
        this.#ref = firebase.database()
            .ref("teams").child(this.teamID)
            .child("members").child(this.assignedTo)
            .child("assignedDrills").child(this.id);

    }


    /**
     * Creates a new drill for a member
     * @param teamID the team id
     * @param assignedBy the profile ID that assigned this drill to the member
     * @param memberAssignedTo the Member object to assign to
     * @param drillName the name of the drill in the team to assign
     * @param dueDate the date that the drill should be completed by
     * @returns {{dateDue: number, assignedBy: string, drillName: string, teamID: string, id: string, dateAssigned: number, assignedTo: string} & {dateAssigned?: number, drillName?: string, assignedBy?: string, teamID?: string, assignedTo?: string, id?: string, dateDue?: number}}
     */
    static createDrill(teamID, assignedBy, memberAssignedTo, drillName, dueDate=-1){

        const drill = Object.assign({}, DEFAULTDRILL);
        drill.teamID = teamID;
        drill.dateAssigned = new Date().getTime();
        drill.assignedBy = assignedBy;
        drill.dateDue = dueDate;
        drill.id = createUUID("xxxx-xxxx");
        drill.assignedTo = memberAssignedTo.id;
        drill.drillName = drillName;

        return drill;

    }

}