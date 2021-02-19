import React, {Component} from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';


export default class HomeScreen extends Component {


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

    newTeam(){



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
