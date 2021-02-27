import React, {Component} from "react";
import {Text, View} from 'react-native';
import Edge from "../../../firebase";
import {firebase} from "../../../firebase/config";
import Global from "../../../GlobalData";
import {Team} from "../../../firebase/modules/teams/Team";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";


export default class MemberPage extends Component {

    state = {
        profile: null,
        team: null
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const profile = (await Edge.users.get(firebase.auth().currentUser.uid)).getProfile(Global.profileID);
        const team = await Edge.teams.get(Global.teamID);
        this.setState({profile: profile, team: team})
    }


    render() {

        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                

                <Text>Student page</Text>
            </View>
        )

    }

}