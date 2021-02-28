import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import Edge from "../../../firebase";
import {firebase} from "../../../firebase/config";
import Global from "../../../GlobalData";
import {Team} from "../../../firebase/modules/teams/Team";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import styles from "../../LoginRoutes/CreateProfileScreen/styles";
import {DEFAULTAVATR} from "../../../firebase/modules/profiles";


export default class MemberPage extends Component {

    state = {
        profile: null,
        team: null,
        members:[]
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const profile = (await Edge.users.get(firebase.auth().currentUser.uid)).getProfile(Global.profileID);
        const team = await Edge.teams.get(Global.teamID);
        this.setState({profile: profile, team: team})
        let members = await this.generateMembers(team.members)
        this.setState({members: members});

    }

    async generateMembers(members){

        let memArr = [];
        let indx = 0;
        for(let [K, V] of members){
            let member = await this.state.team.getMember(K)
            let memBox = await this.generateMemberBox(member, indx);
            memArr.push(memBox)
            indx++;
        }
        return memArr;

    }

    async generateMemberBox(member, index){

        let profileImage = await member.profile.getProfilePicture();
        if (profileImage == null) profileImage = member.profile.avatar;
        return(
            <View key={index} style={{marginBottom: 10, borderRadius: 3, borderColor: 'lightgrey', borderWidth: 1, padding: 10}}>
                <TouchableOpacity style={{flexDirection: 'row'}}>

                        <Image style={globalStyles.avatar(50)}
                               source={{uri: profileImage}}/>
                        <Text style={{alignSelf: 'center', padding: 10, fontSize: 20, fontWeight: 'bold'}}>
                            {member.username}
                        </Text>

                </TouchableOpacity>
            </View>
        );
    }


    render() {

        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>
                <ScrollView>
                    {this.state.members}
                </ScrollView>
            </View>
        )

    }

}