import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import React, {Component} from 'react';
import {UserAuthentication} from "../../firebase/UserAuthentication";
import {firebase} from "../../firebase/config";
import Edge from "../../firebase";
import {NavigationActions, StackActions} from "react-navigation";
import LoginForm from './LoginForm';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.accInfo = {
            email: "",
            password: "",
        };
    }

    /**
     * Attempts to sign in the user. If failed, this will display an error message
     * @todo make a loading appearance appear when user clicks login so that they know they are being logged in.
     * @returns {Promise<void>}
     */
    onSignIn = async (values) => {

        const email = values.Email
        const pass = values.Password

        const data = await UserAuthentication.signUserIn(email, pass);
        if (data.confirmed) {
            await Edge.users.set(firebase.auth().currentUser.uid, {rememberLogin: values.rememberMe}, "settings");
            this.sendToHomePage();
        } else {
            Alert.alert(data.message);
        }

    };

    sendToHomePage() {
        const {navigation} = this.props;

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Profiles'})],
        });
        navigation.dispatch(resetAction);
    }

    /**
     * Before the page fully loads, this will check if the user is logged in according to firebase and if they are
     * it will send them to the home (profile) page
     * @returns {null}
     */
    componentDidMount() {
        const that = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                that.sendToHomePage();
            }
        });

    }

    createAccount() {
        const {navigation} = this.props;
        navigation.navigate("Create_Account");
    }

    render() {
        //firebase.auth().signOut();
        return (
            <View style={styles.container}>
                <Image source={require("../../assets/iPhoneApp.png")}/>
                <Text style={styles.logo}>The Edge</Text>

                <View style={{width: '80%'}}>
                    <LoginForm login={this.onSignIn}/>
                </View>

                <TouchableOpacity onPress={() => {
                    this.createAccount();
                }}>
                    <Text style={styles.loginText}>Signup</Text>
                </TouchableOpacity>

            </View>
        );
    }

}