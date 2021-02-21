import {Alert, Image, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import React, {Component} from 'react';
import HiddenView from "../../Components/HiddenView";
import {UserAuthentication} from "../../firebase/UserAuthentication";
import {firebase} from "../../firebase/config";
import Edge from "../../firebase";
import {NavigationActions, StackActions} from "react-navigation";
import LoginForm from './LoginForm';

export default class LoginScreen extends Component {

    state = {
        email: {
            hide: true,
            msg: ""
        },
        password: {
            hide: true,
            msg: ""
        },
        rememberMe: false
    };

    constructor (props) {
        super(props);
        this.accInfo = {
            email: "",
            password: "",
        };
    }

    checkEmail (email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /**
     * Attempts to sign in the user. If failed, this will display an error message
     * @todo make a loading appearance appear when user clicks login so that they know they are being logged in.
     * @returns {Promise<void>}
     */
    onSignIn = async () => {

        const email = this.accInfo.email.trim();
        const pass = this.accInfo.password;
        const emailPassed = this.checkEmail(email);

        this.updateState(emailPassed, pass);

        if (!emailPassed || !pass) {
            return;
        }

        const data = await UserAuthentication.signUserIn(email, pass);
        if (data.confirmed) {
            await Edge.users.set(firebase.auth().currentUser.uid, {rememberLogin: this.state.rememberMe}, "settings");
            this.sendToHomePage();
        } else {
            Alert.alert(data.message);
        }

    };

    updateState (emailPassed, password) {
        this.setState({
            email: {
                hide: emailPassed,
                msg: "X Invalid Email"
            },
            password: {
                hide: !!password,
                msg: "X Invalid Password"
            }
        });

    }

    sendToHomePage () {
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
    componentDidMount () {
        const that = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                that.sendToHomePage();
            }
        });

    }

    createAccount () {
        const {navigation} = this.props;
        navigation.navigate("Create_Account");
    }

    onRememberMe = () => {
        this.setState({rememberMe: !this.state.rememberMe});
    };

    render () {
        //firebase.auth().signOut();
        return (
            <View style={styles.container}>
                <Image source={require("../../assets/iPhoneApp.png")} />
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