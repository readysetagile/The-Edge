import React, {Component} from "react";
import {
    Alert,
    Image,
    Keyboard,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Edge from "../../../firebase";
import {firebase} from "../../../firebase/config";
import Global from "../../../GlobalData";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import HiddenView from "../../../Components/HiddenView";
import InviteForm from "./InviteForm";
import RBSheet from "react-native-raw-bottom-sheet";
import NewButton from "../../../Components/NewButton";

export default class MemberPage extends Component {

    state = {
        profile: null,
        team: null,
        members: [],
        hiddenMembers: {},
        modalOpen: false,
        clickedMember: null
    };

    constructor (props) {
        super(props);
        Edge.teams.get(Global.teamID).then(r => {
            firebase.database().ref("teams/" + r.id + "/members").on('value', snapshot => {
                this.componentDidMount();
            });
        });
    }

    /**
     * When the component mounts, we set update the state with everything needed to show
     * each member in the list
     * @returns {Promise<void>}
     */
    async componentDidMount () {
        const profile = (await Edge.users.get(firebase.auth().currentUser.uid)).getProfile(Global.profileID);
        const team = await Edge.teams.get(Global.teamID);
        const member = await team.getMember(profile.id);
        this.setState({profile: profile, team: team, currMember: member});
        let teamMembers = team.members;
        let members = await this.generateMembers(teamMembers);
        this.setState({members: members});

    }

    /**
     * Generates all the members to be loaded on the page
     * @param members members to be shown
     * @returns {Promise<[]>} a list of member boxes
     */
    async generateMembers (members) {

        let memArr = [];
        let indx = 0;
        for (let [K, V] of members) {
            let member = await this.state.team.getMember(K);
            let memBox = await this.generateMemberBox(member, indx);
            memArr.push(memBox);
            indx++;
        }
        return memArr;

    }

    /**
     * Generates a member box where you can click on them and view their form questions
     * @param member the member to make the box for
     * @param index the index that the member is found
     * @returns {Promise<JSX.Element>}
     */
    async generateMemberBox (member, index) {

        let profileImage = await member.profile.getProfilePicture();
        if (profileImage == null) profileImage = member.profile.avatar;
        return (
            <HiddenView hide={this.state.hiddenMembers[member.id]}
                key={index} style={{
                    marginBottom: 10,
                    borderRadius: 3,
                    borderColor: 'lightgrey',
                    borderWidth: 1,
                    padding: 10,
                }}>
                <TouchableOpacity style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}
                    onPress={async () => {

                        if ((this.state.currMember?.permissions.has("isCoach"))) {
                            this.setState({clickedMember: {member: member, profileImage: profileImage}});
                            this.RBSheet.open();
                        }
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={globalStyles.avatar(50)}
                            source={{uri: profileImage}} />
                        <Text style={{alignSelf: 'center', padding: 10, fontSize: 20, fontWeight: 'bold'}}>
                            {member.username}
                        </Text>
                    </View>

                    {member.permissions.has("isCoach") ?
                        <FontAwesome5 name="crown" size={24} color="gold" style={{alignSelf: 'center'}} /> : null}

                </TouchableOpacity>

            </HiddenView>
        );
    }

    inviteMembers () {
        this.setState({modalOpen: true});
    }

    /**
     * This filters members by their name
     * @param name the name of the member
     */
    filterMembersByName (name) {

        let members = this.state.team.members;
        let hiddenMembers = this.state.hiddenMembers;
        name = name.trim();
        if (name) {
            for (let [K, V] of members) {
                hiddenMembers[K] = !V.username.toLowerCase().includes(name.toLowerCase());
            }
        } else {
            Object.keys(hiddenMembers).forEach(function (key) {
                hiddenMembers[key] = false;
            });
        }

        this.setState({hiddenMembers: hiddenMembers});
        this.componentDidMount();


    }


    /**
     * Updates the current invite code
     * @param values the new code to set the current team code to
     */
    updateInvite (values) {

        this.setState({modalOpen: false});
        this.state.team.teamCode = values["Team Code"];
        this.state.team.toggleTeamJoining(values["Enable Joining"]);

    }

    /**
     * Navigates to view question page and fills in this members answers
     */
    showMemberQuestions () {

        const {navigation} = this.props;
        this.RBSheet.close();
        navigation.navigate("SeeMemberQuestions", {
            data: this.state.team.modules.teamQuestions,
            filledInData: this.state.clickedMember.member.teamAnswers, freezeScreen: true
        });

    }

    /**
     * Removes the member that has been clicked on
     */
    removeMember () {

        Alert.alert("Are you sure you want to remove this member?", "", [
            {
                text: "Yes",
                onPress: () => {
                    this.RBSheet.close();
                    this.state.clickedMember.member.leaveTeam(this.state.team.id);
                    this.state.team.removeMember(this.state.clickedMember.member.id);
                }
            },
            {
                text: "Cancel"
            }
        ]);

    }

    render () {

        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <Modal visible={this.state.modalOpen} animationType={'slide'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={globalStyles.modalContent}>
                            <Ionicons style={globalStyles.closeModal(3)} name={"close"} size={24}
                                onPress={() => this.setState({modalOpen: false})} />
                            <InviteForm team={this.state.team} onSubmit={(values) => this.updateInvite(values)} />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={300}
                    openDuration={250}
                    customStyles={{
                        container: {
                            backgroundColor: 'darkmagenta'
                        }
                    }}>
                    <View style={globalStyles.container}>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                            <Image style={globalStyles.avatar(100)}
                                source={{uri: this.state.clickedMember?.profileImage}} />

                            <View style={{
                                backgroundColor: colors.inputBox,
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                flex: .8,
                                borderRadius: 10
                            }}>
                                <View style={{justifyContent: 'center'}}>
                                    <Ionicons name={"person-remove-outline"} style={{alignSelf: 'center'}}
                                        size={30} onPress={() => this.removeMember()} />

                                    <Text style={{textAlign: 'center'}}>Remove</Text>
                                </View>

                                <View style={{justifyContent: 'center'}}>
                                    <Ionicons name={"chatbox-outline"} size={30} style={{alignSelf: 'center'}} />
                                    <Text style={{textAlign: 'center'}}>Message</Text>
                                </View>

                            </View>

                            <Ionicons name={"ellipsis-horizontal"} size={30} />
                        </View>

                        <Text style={{
                            color: 'white',
                            fontSize: 30,
                            left: 5,
                            textAlign: 'center',
                            alignSelf: 'flex-start'
                        }}>
                            {this.state.clickedMember?.member.username}</Text>

                        <TouchableOpacity onPress={() => this.showMemberQuestions()}>
                            <View style={{
                                padding: 15, backgroundColor: colors.background,
                                marginTop: 10, borderRadius: 5, flexDirection: 'row'
                            }}>
                                <Ionicons name={"document-text"} size={20} />
                                <Text style={{alignSelf: 'center', color: 'white', fontSize: 20, left: 5}}>View Question
                                    Form</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </RBSheet>

                <View style={globalStyles.topToolBar}>

                    <Text style={{fontSize: 15, alignSelf: 'center'}}>{this.state.members.length} Members</Text>

                    <View style={globalStyles.searchToolBar}>
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
                {
                    this.state.currMember?.permissions.has("isCoach") ?
                        <NewButton onPress={() => this.inviteMembers()} />
                        : <View />
                }

            </View>
        );

    }

}