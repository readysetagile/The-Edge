import {Alert, Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import React from 'react';
import {Component} from "react";
import HiddenView from "../../Components/HiddenView";
import {UserAuthentication} from "../../firebase/UserAuthentication";
import {firebase} from "../../firebase/config";
import {Switch} from "react-native";
import {DB} from "../../firebase/DBUtils";

export default class LoginScreen extends Component{

    state = {
        email:{
            hide: true,
            msg: ""
        },
        password:{
            hide: true,
            msg: ""
        },
        rememberMe: false
    }

    constructor(props) {
        super(props);
        this.accInfo = {
            email: "",
            password: "",
        }
    }
    checkEmail(email){
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

        if(!emailPassed || !pass){
            return;
        }

        const data = await UserAuthentication.signUserIn(email, pass);
        if(data.confirmed){
            await DB.updateUserData("users/" + firebase.auth().currentUser.displayName, {rememberLogin: this.state.rememberMe});
            this.sendToHomePage();
        }else{
            Alert.alert(data.message);
        }

    }

    updateState(emailPassed, password){
        this.setState({
            email:{
                hide: emailPassed,
                msg: "X Invalid Email"
            }
        })

        this.setState({
            password:{
                hide: !!password,
                msg: "X Invalid Password"
            }
        })
    }

    sendToHomePage() {
        const {navigation} = this.props;
        navigation.reset({
            index: 0,
            routes: [{name: "Home"}]
        })
    }


    /**
     * Before the page fully loads, this will check if the user is logged in according to firebase and if they are
     * it will send them to the home (profile) page
     * @returns {null}
     */
    componentDidMount() {
        const that = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                that.sendToHomePage();
            }
        });


    }

    onRememberMe = () => {
        this.setState({rememberMe: !this.state.rememberMe})
    }

    render() {
        const {navigation} = this.props;
            return (
                <View style={styles.container}>
                    <Image source={require("../../assets/iPhoneApp.png")}/>
                    <Text style={styles.logo}>The Edge</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Email"
                            placeholderTextColor="#003f5c"
                            onChangeText={txt => this.accInfo.email = txt}>{this.accInfo.email}</TextInput>
                    </View>
                    <HiddenView hide={this.state.email.hide} style={styles.hiddenViewErr}>
                        <Text style={styles.errorMsg}>{this.state.email.msg}</Text>
                    </HiddenView>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Password"
                            placeholderTextColor="#003f5c"
                            secureTextEntry
                            onChangeText={txt => this.accInfo.password = txt}>{this.accInfo.password}</TextInput>
                    </View>
                    <HiddenView hide={this.state.password.hide} style={styles.hiddenViewErr}>
                        <Text style={styles.errorMsg}>{this.state.password.msg}</Text>
                    </HiddenView>

                    <View style={styles.rememberMeView}>
                        <Text style={{
                            fontSize: 20,
                            color: 'white',
                            padding: 10,
                            alignSelf: 'center',
                            textAlign: 'right'
                        }}>Remember Me?</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={this.state.rememberMe ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.onRememberMe}
                            value={this.state.rememberMe}
                            style={{
                                alignSelf: 'center'
                            }}
                        />
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={this.onSignIn}>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Create Account")
                    }}>
                        <Text style={styles.loginText}>Signup</Text>
                    </TouchableOpacity>

                </View>
            );
        }

}