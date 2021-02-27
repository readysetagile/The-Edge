module.exports = {

    id: "",
    teamCode: "",
    teamName: "",
    sport: "",
    modules: {
        teamQuestions: {
            required: true,
        },
        schedule: {},
        drills: {}
    },
    members: new Map([['_', 0]])//map of member objects {memberID => memberObject}

}