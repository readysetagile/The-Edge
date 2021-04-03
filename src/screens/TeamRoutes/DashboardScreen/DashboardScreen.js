import {Image, Text, TouchableOpacity, View, Alert} from 'react-native';
import styles from './styles';
import React, {Component} from 'react';
import Global from '../../../GlobalData';
import Edge from "../../../firebase";
import {firebase} from "../../../firebase/config";
import GlobalData from '../../../GlobalData'
import {globalStyles} from "../../GlobalStyles";
import {NavigationActions, StackActions} from "react-navigation";
import {Profile} from "../../../firebase/modules/profiles";
//import {navigateToHome} from "../../../../routes/TeamDrawer";
export default class DashboardScreen extends Component {

    state = {
        profile: null,
        team: null,
        alerts:{
            drillAlertSize: 0
        }
    }

    constructor(props) {
        super(props);

    }

    async componentDidMount() {
        const profile = (await Edge.users.get(firebase.auth().currentUser.uid)).getProfile(Global.profileID);
        const team = await Edge.teams.get(Global.teamID);
        this.setState({profile: profile, team: team});

        this.enableEvents();

    }

    enableEvents(){

        firebase.database().ref("teams/"+GlobalData.teamID+"/members").on('child_removed', res => {

            const member = res.val();

            if(member.id === GlobalData.profileID && GlobalData.teamID === this.state.team.id){

                Alert.alert("You've been kicked!", "You've been removed from " + this.state.team.teamName);

                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Login'})],
                });
                this.props.navigation.dispatch(resetAction);

                this.props.navigation.navigate("HomeScreen", {profile: this.state.profile})

            }

        })

        firebase.database().ref("teams/"+GlobalData.teamID+"/members/"+GlobalData.profileID+"/assignedDrills")
            .on('value', snap => {
                if(snap?.val() != null) {
                    const alertSize = this.state.alerts;
                    alertSize.drillAlertSize = Object.keys(snap.val()).length - 1;
                    this.setState({alerts: alertSize});
                }
            })

    }

    render() {

        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>COACHING DASHBOARD</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Members")}>
                    <View style={[styles.buttonStyle, styles.coachingColor]}>
                        <Image
                            source={{uri: 'https://grid.gograph.com/softball-vector-clipart_gg91304766.jpg'}}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.buttonsText}>STUDENTS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonStyle, styles.drillsColor]} onPress={() => navigation.navigate("Drills")}>
                        <Image
                            source={{uri: 'https://grid.gograph.com/softball-vector-clipart_gg91304766.jpg'}}
                            style={styles.imageStyle}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.buttonsText}>Drills</Text>
                        </View>

                        {this.state.alerts.drillAlertSize ? <Text style={globalStyles.notification(true, 20)}>{this.state.alerts.drillAlertSize}</Text> : null}

                    </TouchableOpacity>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Questions")}>
                    <View style={[styles.buttonStyle, styles.graphsColor]}>
                        <Image
                            source={{uri: 'https://grid.gograph.com/softball-vector-clipart_gg91304766.jpg'}}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.buttonsText}>QUESTIONS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.buttonStyle, styles.challengesColor]}>
                        <Image
                            source={{uri: 'https://grid.gograph.com/softball-vector-clipart_gg91304766.jpg'}}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.buttonsText}>STUDENTS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.buttonStyle, styles.scheduleColor]}>
                        <Image
                            source={{uri: 'https://grid.gograph.com/softball-vector-clipart_gg91304766.jpg'}}
                            style={{height: 100, width: 100}}
                        />
                        <Text style={styles.buttonsText}>STUDENTS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.buttonStyle, styles.workoutsColor]}>
                        <Image
                            source={{uri: 'https://grid.gograph.com/softball-vector-clipart_gg91304766.jpg'}}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.buttonsText}>STUDENTS</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}