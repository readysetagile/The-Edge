import React, {Component} from 'react';
import {Keyboard, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import styles from './styles';
import {connectActionSheet} from '@expo/react-native-action-sheet'
import {Ionicons} from "@expo/vector-icons";
import TeamCreateForm from './TeamCreateForm';
import TeamJoinForm from './TeamJoinForm';

import Edge from "../../../firebase";
import {NavigationActions, StackActions} from "react-navigation";
import Global from '../../../GlobalData';
import {globalStyles} from "../../GlobalStyles";
import NewButton from "../../../Components/NewButton";

class HomeScreen extends Component {


    state = {
        teams: [],
        modalOpen: false,
        joinModalOpen: false
    }

    constructor(props) {
        super(props);
    }

    async getTeams() {
        const {navigation} = this.props;
        let profile = navigation.getParam("profile")
        let profileTeams = profile.teams;
        return await Promise.all(profileTeams.map(async i => await Edge.teams.get(i)));

    }

    generateTeams(teams) {
        let teamBanners = [];
        teams.forEach((i, j) => {

            let banner = this.generateTeamBanner(i, j);
            teamBanners.push(banner);

        })
        this.setState({teams: teamBanners})

    }

    generateTeamBanner(team, key) {

        if (team)
            return (
                <TouchableOpacity style={styles.teamBanner} key={key} onPress={() => this.enterTeam(team)}>
                    <Text style={styles.teamName}>{team.teamName}</Text>
                </TouchableOpacity>
            )
        else return <View/>

    }

    componentDidMount() {

        this.getTeams().then(teams => {
            this.generateTeams(teams);
        })
    }

    /**
     * Navigates the user to the team they clicked on
     * @param team the Team Object of the team
     */
    enterTeam(team) {

        const {navigation} = this.props;

        Global.profileID = navigation.getParam('profile').profileUUID
        Global.teamID = team.id;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'Dashboard'
            })],
        });
        navigation.dispatch(resetAction);
    }

    createTeam = () => {
        this.setState({modalOpen: true})
    }

    joinTeam = () => {
        this.setState({joinModalOpen: true})
    }

    joinTeamFully = async (teamCode, formValues = {_: 0}) => {

        this.setState({modalOpen: false})
        let team = null;
        for (let [K, V] of Edge.teams.teams) {
            if (V.inviteData.teamCode === teamCode) {
                team = await Edge.teams.get(V.id);
                break;
            }
        }
        if (team != null) {
            let profile = this.props.navigation.getParam('profile');

            team.addMember(profile, formValues);
            let teams = this.state.teams;
            teams.push(this.generateTeamBanner(team, teams.length));
            await this.setState({teams: [...teams]})
            this.enterTeam(team);
        }

    }

    newTeam() {

        const options = ['Create Team', 'Join Team', 'Cancel'];
        const cancelButtonIndex = 2;
        const actionMap = {
            0: this.createTeam,
            1: this.joinTeam,
        }
        this.props.showActionSheetWithOptions({
                options, cancelButtonIndex
            },
            buttonIndex => {
                if (actionMap[buttonIndex] != null) actionMap[buttonIndex]();
            })

    }

    addTeam = async (teamInfo) => {

        let team = await Edge.teams.create(teamInfo["team name"], teamInfo.sport);
        let profile = this.props.navigation.getParam('profile');
        let member = await team.addMember(profile);
        member.addPermission("isCoach", true);
        let teams = this.state.teams;
        teams.push(this.generateTeamBanner(team, teams.length));
        this.setState({modalOpen: false, teams: [...teams]});

    }

    render() {

        return (
            <View style={styles.container}>

                <Modal visible={this.state.modalOpen} animationType={'slide'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalContent}>
                            <Ionicons style={globalStyles.closeModal()} name={"close"} size={24}
                                      onPress={() => this.setState({modalOpen: false})}/>
                            <TeamCreateForm addTeam={this.addTeam}/>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <Modal visible={this.state.joinModalOpen} animationType={'slide'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalContent}>
                            <Ionicons style={globalStyles.closeModal()} name={"close"} size={24}
                                      onPress={() => this.setState({joinModalOpen: false})}/>
                            <TeamJoinForm onSubmit={this.joinTeamFully}/>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <Text style={styles.titleText}>Select Team</Text>
                <ScrollView style={styles.teamBannersView}>
                    {this.state.teams.length ? this.state.teams : (
                        <View style={styles.teamBanner} opacity={0.5}>

                            <Text style={{
                                fontSize: 20,
                                textAlign: 'center'
                            }}>It appears you're not in any teams. Try joining or creating one!</Text>

                        </View>
                    )}
                </ScrollView>

                <NewButton onPress={() => this.newTeam()}/>

            </View>
        );
    }
}

const HomeScreenApp = connectActionSheet(HomeScreen);
export default HomeScreenApp;
