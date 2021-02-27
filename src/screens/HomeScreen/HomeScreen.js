import React, {Component} from 'react';
import {Keyboard, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import styles from './styles';
import {connectActionSheet} from '@expo/react-native-action-sheet'
import {Ionicons} from "@expo/vector-icons";
import TeamCreateForm from './TeamCreateForm';
import Edge from "../../firebase";


class HomeScreen extends Component {


    state = {
        teams: [],
        modalOpen: false
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

        return (
            <TouchableOpacity style={styles.teamBanner} key={key} onPress={() => this.enterTeam()}>
                <Text style={styles.teamName}>{team.teamName}</Text>
            </TouchableOpacity>
        )

    }

     componentDidMount() {

        this.getTeams().then(teams => {
            this.generateTeams(teams);
        })
    }

    enterTeam() {

        const {navigation} = this.props;
        navigation.navigate("Dashboard");

    }

    createTeam = () => {
        this.setState({modalOpen: true})
    }

    joinTeam = () => {
        console.log("join team");
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

        let team = await Edge.teams.create(teamInfo.teamName, teamInfo.sport);
        let profile = this.props.navigation.getParam('profile');
        team.addMember(profile);
        let teams = this.state.teams;
        teams.push(this.generateTeamBanner(team, teams.length));
        this.setState({modalOpen: false});
        await this.setState({teams: [...teams]});
    }

    render() {

        return (
            <View style={styles.container}>

                <Modal visible={this.state.modalOpen} animationType={'slide'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalContent}>
                            <Ionicons style={styles.closeCreateTeam} name={"close"} size={24}
                                      onPress={() => this.setState({modalOpen: false})}/>
                            <TeamCreateForm addTeam={this.addTeam}/>
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

                <TouchableOpacity style={styles.newTeamButton} onPress={() => this.newTeam()}>
                    <Ionicons name={'add'} size={35} style={{alignSelf: 'center', color: 'gold'}}/>
                </TouchableOpacity>

            </View>
        );
    }
}

const HomeScreenApp = connectActionSheet(HomeScreen);
export default HomeScreenApp;
