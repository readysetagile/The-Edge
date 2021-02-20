import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Edge from "../../firebase";
import {firebase} from "../../firebase/config";
import {NavigationActions, StackActions} from "react-navigation";

export default class ProfileScreen extends Component {

    state = {
        accounts: []
    }

    constructor(props) {
        super(props);

    }

    async getProfiles() {
        let user = await Edge.users.get(firebase.auth().currentUser.uid);
        if (user == null) return null
        return user.profiles;
    }

    editProfile(profile) {
        console.log(profile)
    }

    async generateProfileImage(profile, index) {
        let profileImage = await profile.getProfilePicture();
        if (profileImage == null) profileImage = profile.avatar;
        return (
            <View key={index} profile={profile} style={styles.item}>

                <TouchableOpacity onPress={() => this.enterProfile(profile)}
                                  onLongPress={() => this.editProfile(profile)}
                                  delayLongPress={500}>
                    <Image style={styles.profilePicture}
                           source={{uri: profileImage}}/>
                    <Text style={styles.text}>{profile.username}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    enterProfile(profile) {

        const {navigation} = this.props;

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'HomeScreen', params: {profile: profile}})],

        });
        navigation.dispatch(resetAction);
    }

    async componentDidMount() {
        try {
            let profiles = await this.getProfiles();
            if (profiles != null) {
                await new Promise(async resolve => {
                    let accArr = await Array.from(profiles.values()).filter(i => i != null);
                    let prom = await Promise.all(accArr.map(async (i, j) => {
                        return this.generateProfileImage(i, j);
                    }));

                    resolve(prom)
                }).then(r => {
                    this.setState({accounts: r});
                });
            }
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <View style={styles.background}>
                <Text style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    padding: 5
                }}>
                    Who is using this account?
                </Text>

                <ScrollView>
                    <View style={styles.profileContainer}>
                        {this.state.accounts}
                    </View>
                </ScrollView>

            </View>
        );
    }
}