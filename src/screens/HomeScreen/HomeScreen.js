import React, {Component} from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import { connectActionSheet } from '@expo/react-native-action-sheet'


class HomeScreen extends Component {


    state = {
        teams: []
    }

    constructor(props) {
        super(props);
    }

    getTeams(){
        const {navigation} = this.props;
        let profile = navigation.getParam("profile");
        return profile.teams;

    }

    generateTeams(teams){

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

    generateTeamBanner(team, key){

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

    createTeam(){
        console.log("create team");
    }

    joinTeam(){
        console.log("join team");
    }

    newTeam(){

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
            actionMap[buttonIndex]();
        })

    }

    render() {

        let teams = this.state.teams;
        return (
            <View style={styles.container}>
                <Text style={
                    {
                        fontWeight: 'bold',
                        fontSize: 30,
                        top: 5,
                        alignSelf: 'center'
                    }
                }>Select Team</Text>

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
                    <Text style={{
                        alignSelf: 'center',
                        color: 'gold',
                        fontSize: 30,
                        fontWeight: 'bold'
                    }}>+</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const HomeScreenApp = connectActionSheet(HomeScreen);
export default HomeScreenApp;
