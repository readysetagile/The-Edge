import {firebase} from "../../../firebase/config";
import {createUUID} from '../../Util';
const DEFAULTEVENT = require("./model");

module.exports.Event = class Event{

    #ref;

    constructor(eventObj) {

        if(eventObj) {
            this.id = eventObj.id;
            this.startTime = eventObj.startTime;
            this.endTime = eventObj.endTime;
            this.title = eventObj.title;
            this.body = eventObj.body;
            this.memberID = eventObj.memberID;
            this.teamID = eventObj.teamID;
            this.#ref = firebase.database()
                .ref("teams").child(this.teamID)
                .child("members").child(this.memberID)
                .child("calendarEvents").child(this.id);
        }

    }

    save(){
        this.#ref.update(this);
    }

    static createEvent(eventObj){

        const event = Object.assign({}, DEFAULTEVENT);
        event.id = createUUID('xxx-xxx-xxx');
        event.startTime = eventObj.startTime;
        event.endTime = eventObj.endTime;
        event.title = eventObj.title;
        event.teamID = eventObj.teamID;
        event.memberID = eventObj.memberID;
        event.body.location = eventObj.location;
        event.body.summary = eventObj.summary;

        return new Event(event);

    }

}