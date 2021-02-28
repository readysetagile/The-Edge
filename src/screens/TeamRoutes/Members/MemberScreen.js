import React, {Component, useState} from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard, Modal
} from 'react-native';
import Edge from "../../../firebase";
import {firebase} from "../../../firebase/config";
import Global from "../../../GlobalData";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import {Ionicons} from "@expo/vector-icons";
import HiddenView from "../../../Components/HiddenView";
import styles from "../../LoginRoutes/HomeScreen/styles";
import TeamCreateForm from "../../LoginRoutes/HomeScreen/TeamCreateForm";
import InviteForm from "./InviteForm";


export default class MemberPage extends Component {

    state = {
        profile: null,
        team: null,
        members:[],
        hiddenMembers:{},
        modalOpen: false
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const profile = (await Edge.users.get(firebase.auth().currentUser.uid)).getProfile(Global.profileID);
        const team = await Edge.teams.get(Global.teamID);
        this.setState({profile: profile, team: team})
        let teamMebers = team.members;
        let members = await this.generateMembers(teamMebers)
        this.setState({members: members})

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
            <HiddenView hide={this.state.hiddenMembers[member.id]}
                        key={index} style={{marginBottom: 10, borderRadius: 3, borderColor: 'lightgrey', borderWidth: 1, padding: 10}}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                        <Image style={globalStyles.avatar(50)}
                               source={{uri: profileImage}}/>
                        <Text style={{alignSelf: 'center', padding: 10, fontSize: 20, fontWeight: 'bold'}}>
                            {member.username}
                        </Text>

                </TouchableOpacity>
            </HiddenView>
        );
    }

    inviteMembers(){
        this.setState({modalOpen: true})
    }

    filterMembersByName(name){

        let members = this.state.team.members;
        let hiddenMembers = this.state.hiddenMembers;
        if(name) {
            for (let [K, V] of members) {
                if (!V.username.toLowerCase().includes(name.toLowerCase())) {
                    hiddenMembers[K] = true;
                }else hiddenMembers[K] = false;
            }
        }else{
            Object.keys(hiddenMembers).forEach(function(key){ hiddenMembers[key] = false });
        }

        this.setState({hiddenMembers: hiddenMembers});
        this.componentDidMount()


    }


    updateInvite(values){

    }

    render() {

        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>


                <Modal visible={this.state.modalOpen} animationType={'slide'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={globalStyles.modalContent}>
                            <Ionicons style={globalStyles.closeModal(3)} name={"close"} size={24}
                                      onPress={() => this.setState({modalOpen: false})}/>
                            <InviteForm team={this.state.team} onSubmit={(values) => this.updateInvite(values)}/>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <View style={{backgroundColor: colors.inputBox, marginBottom: 20, padding: 15,
                    flexDirection: 'row', justifyContent: 'space-between', borderRadius: 10}}>

                    <Text style={{fontSize: 15, alignSelf: 'center'}}>{this.state.members.length} Members</Text>

                    <View style={{width: '30%', borderRadius: 5, borderWidth: 2, borderColor: 'gray', padding: 5}}>
                        <TextInput
                                   placeholderTextColor={'#003f5c'}
                                   placeholder='Search 🔎'
                                   onChangeText={(val) => this.filterMembersByName(val)}>
                        </TextInput>
                    </View>

                </View>

                <ScrollView>
                    {this.state.members}
                </ScrollView>

                <TouchableOpacity style={globalStyles.newButton} onPress={() => this.inviteMembers()}>
                    <Ionicons name={'add'} size={35} style={{alignSelf: 'center', color: 'gold'}}/>
                </TouchableOpacity>

            </View>
        )

    }

}