const DEFAULTTEAM = require('./model');
const {Edge} = require("../../index");
module.exports.Team = class Team {

    constructor(teamObject) {

        this.id = teamObject.id;
        this.modules = teamObject.modules;
        this.members = teamObject.members;
        this.teamCode = teamObject.teamCode;
        this.teamName = teamObject.teamName;

    }



}