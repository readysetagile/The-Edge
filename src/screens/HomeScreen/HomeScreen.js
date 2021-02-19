import React, {Component} from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {connectActionSheet} from '@expo/react-native-action-sheet'
import {Ionicons} from "@expo/vector-icons";
import ReviewForm from './ReviewForm';


class HomeScreen extends Component {


    state = {
        teams: [],
        modalOpen: false
    }

    constructor(props) {
        super(props);
    }

    getTeams() {
        const {navigation} = this.props;
        let profile = navigation.getParam("profile");
        return profile.teams;

    }

    generateTeams(teams) {

        teams = new Map();
        teams.set('a', {teamName: "Vollyball"})
        teams.set("b", {teamName: "Soccer"})
        let teamBanners = [];
        teams.forEach((i, j) => {

            let banner = this.generateTeamBanner(i, j);
            teamBanners.push(banner);

        })
        this.setState({teams: teamBanners})

    }

    generateTeamBanner(team, key) {

        return (

            <TouchableOpacity style={styles.teamBanner} key={key}>
                <Text style={styles.teamName}>{team.teamName}</Text>
            </TouchableOpacity>

        )

    }

    componentDidMount() {

        let teams = this.getTeams();
        this.generateTeams(teams);

    }

    createTeam = () => {
        console.log("create team");
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
                options, cancelButtonIndex//, destructiveButtonIndex
            },
            buttonIndex => {
                if (actionMap[buttonIndex] != null) actionMap[buttonIndex]();
            })

    }

    render() {

        let teams = this.state.teams;
        return (
            <View style={styles.container}>

                <Modal visible={this.state.modalOpen} animationType={'slide'}>
                    <View style={styles.modalContent}>
                        <Ionicons style={styles.closeCreateTeam} name={"close"} size={24}
                                  onPress={() => this.setState({modalOpen: false})}/>
                        <ReviewForm/>
                    </View>
                </Modal>

                <Text style={styles.titleText}>Select Team</Text>
                <ScrollView style={styles.teamBannersView}>
                    {teams.length ? teams : (
                        <View style={styles.teamBanner} opacity={0.5}>

                            <Text style={{
                                fontSize: 20,
                                textAlign: 'center'
                            }}>It appears you're not in any teams. Try joining or creating one!</Text>

                        </View>)}
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
