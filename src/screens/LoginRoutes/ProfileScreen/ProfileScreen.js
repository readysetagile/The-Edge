import React, {Component} from 'react';
import {Alert, Image, Keyboard, Modal, ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import styles from './styles';
import Edge from "../../../firebase";
import {firebase} from "../../../firebase/config";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import Colors from '../../styles';
import {Ionicons} from "@expo/vector-icons";
import InputParentPin from "./ParentPinForm";


export default class ProfileScreen extends Component {

    state = {
        accounts: [],
        modal: {
            show: false,
            profile: null,
            type: '',
        }
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

    constructor(props) {
        super(props);
    }

    async getProfiles() {
        let user = await Edge.users.get(firebase.auth().currentUser.uid);
        if (user == null) return null;
        return user.profiles;
    }

    alertEdit(profile, txt) {

        Alert.alert(txt + " " + profile.username, `Are you sure you want to ${txt.toLowerCase()} this account? This process cannot be undone`, [
            {
                text: "Yes",
                onPress: () => {
                    if (profile.isParent) {
                        this.setState({modal: {show: true, profile: profile, type: "delete"}})
                    } else this.deleteProfile(profile)
                }
            },
            {
                text: "Cancel",
            }
        ]);

    }

    deleteProfile(profile) {

        if (!profile.isParent) {
            profile.delete();
            this.setState(this.state.accounts);
        }

    }

    toggleParent(profile) {
        if (!profile.isParent) {
            this.setState({modal: {show: true, profile: profile, type: 'create'}});
        } else {
            this.setState({modal: {show: true, profile: profile, type: 'enter'}})
        }
    }

    async generateProfileImage(profile, index) {
        let profileImage = await profile.getProfilePicture();
        if (profileImage == null) profileImage = profile.avatar;
        return (
            <View key={index} profile={profile} style={styles.item}>

                <Menu>
                    <MenuTrigger triggerOnLongPress={true} onAlternativeAction={() => this.enterProfile(profile)}>
                        <Image style={styles.profilePicture} source={{uri: profileImage}}/>
                        <Text style={{
                            ...styles.text,
                            color: (profile.isParent ? 'gold' : 'black')
                        }}>{profile.username}</Text>
                    </MenuTrigger>
                    <MenuOptions customStyles={this.menuStyles}>
                        <MenuOption onSelect={() => this.toggleParent(profile)}>
                            <Text style={{color: 'maroon'}}>{(profile.isParent ? "Unmark" : "Mark")} as Parent</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => this.alertEdit(profile, "Delete")}>
                            <Text style={{color: 'red'}}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>

                </Menu>
            </View>
        );
    }

    enterProfile(profile) {

        if (profile.isParent) {
            return this.setState({modal: {show: true, profile: profile, type: 'enter'}})
        }
        const {navigation} = this.props;
        navigation.navigate("HomeScreen", {profile: profile});
    }


    parentProfileAction(values) {

        const profile = this.state.modal.profile;
        const type = this.state.modal.type;
        this.setState({modal: {show: false, profile: null, type: ""}});
        switch (type) {
            case "delete":
                this.deleteParentProfile(profile)
                break;
            case "create":
                this.updateParentProfileDisplay(profile, values);
                break;
            case "enter":
                this.enterParentAccount(profile);
                break;
        }

    }

    deleteParentProfile(profile) {
        profile.delete();
    }

    enterParentAccount(profile) {
        const {navigation} = this.props;
        navigation.navigate("HomeScreen", {profile: profile});
    }

    updateParentProfileDisplay(profile, values) {
        profile.isParent = !profile.isParent;
        profile.setParentPin(values.Pin);
        this.componentDidMount();
    }

     componentDidMount() {
        try {
             new Promise(async resolve => {
                let profiles = await this.getProfiles();
                if (profiles != null && profiles.length > 0) {
                    let accArr = profiles.filter(i => i != null);
                    let prom = await Promise.all(accArr.map(async (i, j) => {
                        return await this.generateProfileImage(i, j);
                    }));

                    resolve(prom);
                } else resolve([]);
            }).then(r => {
                this.setState({accounts: r});
            });

        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const types = {
            create: 'Create a 4 digit pin',
            enter: 'Enter your 4 digit pin',
            delete: "Enter your 4 digit pin",
        }

        return (
            <View style={styles.background}>

                <Modal visible={this.state.modal.show} animationType={'slide'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{flex: 1}}>
                            <Ionicons style={{left: 20, top: 40, zIndex: 3}} name={"close"} size={24}
                                      onPress={() => this.setState({modal: {show: false}})}/>

                            <InputParentPin profile={this.state.modal.profile}
                                            onSubmit={(values) => this.parentProfileAction(values)}
                                            text={types[this.state.modal.type]}/>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

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