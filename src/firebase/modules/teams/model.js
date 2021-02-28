module.exports = {

    id: "",
    teamName: "",
    sport: "",
    inviteData:{
        teamCode: "",
        acceptNewMembers: true
    },
    modules: {
        teamQuestions: {
            required: true,
        },
        schedule: {},
        drills: {}
    },
    members: new Map([['_', 0]])//map of member objects {memberID => memberObject}

}