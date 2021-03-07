import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import React, {Component} from 'react';
import Global from '../../../GlobalData';
import Edge from "../../../firebase";
import {firebase} from "../../../firebase/config";

export default class DashboardScreen extends Component {

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
                    <View style={[styles.buttonStyle, styles.drillsColor]}>
                        <Image
                            source={{uri: 'https://grid.gograph.com/softball-vector-clipart_gg91304766.jpg'}}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.buttonsText}>Drills</Text>
                    </View>
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