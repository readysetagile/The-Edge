import React, {Component} from 'react';
import {Alert, Image, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import Edge from "../../firebase";
import {firebase} from "../../firebase/config";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import Colors from '../styles';
import {NavigationActions, StackActions} from "react-navigation";

export default class ProfileScreen extends Component {

    state = {
        accounts: []
    };

    menuStyles = {
        optionsContainer: {
            backgroundColor: Colors.inputBox,
            padding: 5,
        },
        optionsWrapper: {
            backgroundColor: Colors.mainButton,
        },
        optionWrapper: {
            backgroundColor: Colors.titleText,
            margin: 5,
        },
        optionTouchable: {
            underlayColor: 'white',
            activeOpacity: 70,
        },

    };

    constructor (props) {
        super(props);
    }

    async getProfiles () {
        let user = await Edge.users.get(firebase.auth().currentUser.uid);
        if (user == null) return null;
        return user.profiles;
    }

    alertEdit (profile, txt) {

        Alert.alert(txt + " " + profile.username, `Are you sure you want to ${ txt.toLowerCase() } this account? This process cannot be undone`, [
            {
                text: "Yes",
                onPress: () => this.deleteProfile(profile)
            },
            {
                text: "Cancel",
            }
        ]);

    }

    deleteProfile (profile, index) {

        profile.delete();
        this.state.accounts.splice(index, 1);
        this.setState(this.state.accounts);

    }

    async generateProfileImage (profile, index) {
        let profileImage = await profile.getProfilePicture();
        if (profileImage == null) profileImage = profile.avatar;
        return (
            <View key={index} profile={profile} style={styles.item}>

                <Menu>
                    <MenuTrigger triggerOnLongPress={true} onAlternativeAction={() => this.enterProfile(profile)}>
                            <Image style={styles.profilePicture} source={{uri: profileImage}} />
                            <Text style={styles.text}>{profile.username}</Text>
                    </MenuTrigger>
                    <MenuOptions customStyles={this.menuStyles}>
                        <MenuOption onSelect={() => this.alertEdit(profile, "Delete")}>
                            <Text style={{color: 'red'}}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>

                </Menu>
            </View>
        );
    }

    enterProfile (profile) {

        const {navigation} = this.props;

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'HomeScreen', params: {profile: profile}})],

        });
        navigation.dispatch(resetAction);
    }

    async componentDidMount () {
        try {
            let profiles = await this.getProfiles();
            if (profiles != null) {
                await new Promise(async resolve => {
                    let accArr = await Array.from(profiles.values()).filter(i => i != null);
                    let prom = await Promise.all(accArr.map(async (i, j) => {
                        return this.generateProfileImage(i, j);
                    }));

                    resolve(prom);
                }).then(r => {
                    this.setState({accounts: r});
                });
            }
        } catch (err) {
            console.error(err);
        }
    }

    render () {

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