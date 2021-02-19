module.exports = {

    id: "",
    teamCode: "",
    teamName: "",
    modules: {
        teamQuestions: {
            required: true,
        },
        schedule: {},
        drills: {}
    },
    members: new Map()//map of member objects {memberID => memberObject}

}