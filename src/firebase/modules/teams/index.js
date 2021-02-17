const DEFAULTTEAM = require('./model');
const {Edge} = require("../../index");
module.exports.Teams = class Teams {

    constructor(firebase) {
        let reference = firebase.database().ref("teams");
        (async () => {
            this.database = await new Promise(resolve => {
                reference.on('value', snapshot => {
                    resolve(snapshot);
                })
            })
        })();
    }

    async create() {

        let team = Object.assign({}, DEFAULTTEAM);
        team.id = Edge.createUUID();

    }

}