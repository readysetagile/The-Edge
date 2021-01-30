import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Alert} from 'react-native';
import styles from './styles';
import {TextInput} from "react-native";
import HiddenView from "../../Components/HiddenView";
import {UserAuthentication} from "../../firebase/UserAuthentication";
import {DB} from "../../firebase/DBUtils";
import {HomeScreen} from "../index";

export default class CreateAccountScreen extends Component{

    state = {
        username:{
            hide: true,
            msg: ""
        },
        email:{
            hide: true,
            msg: ""
        },
        password:{
            hide: true,
            msg: ""
        },
        confirmPassword:{
            hide: true,
            msg: ""
        }
    }

    accInfo = {}

    constructor(props) {
        super(props);
        this.accInfo = {
            email: "applebadsfees@gmail.com",
            username: "banfana",
            password: "coymansaw",
            verifiedPass: "coymansaw"
        }
    }

    onCreateAccount = async () => {

        let validEmail = this.checkEmail(this.accInfo.email.trim());
        let validUsername = await this.checkUsername(this.accInfo.username.trim());
        let passMatch = this.checkPass(this.accInfo.password, this.accInfo.verifiedPass);

            this.setState({
                email:{
                    hide: validEmail,
                    msg: "X Invalid Email"
                }
            })

            this.setState({
                username:{
                    hide: validUsername,
                    msg: "X Username already in use"
                }
            })

            this.setState({
                confirmPassword:{
                    hide: passMatch,
                    msg: "X Passwords do not match"
                }
            });

        if(validEmail && validUsername && passMatch){

            const msg = await UserAuthentication.createAccount(this.accInfo.email, this.accInfo.password);
            if(msg.confirmed){
                DB.addUserToDB(this.accInfo.username, this.accInfo.email);
                Alert.alert("Congratulations!", "You've logged in!")
            }else{
                Alert.alert(
                    "Invalid Credentials",
                    msg.message,
                );
            }

        }

    }

    checkEmail(email){
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    async checkUsername(name){
        return await UserAuthentication.isUnknownUsername(name.trim()) && name !== ""
    }
    checkPass(password, confirmPass){
        return password === confirmPass && password !== "" && confirmPass !== ""
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.text}>Create Account</Text>

                <View style={styles.contentContainer}>

                    <Text style={styles.inputDescription}>Display Name</Text>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputText}
                                   placeholder="Username"
                                   placeholderTextColor="white"
                                   onChangeText={text => this.accInfo.username = text}>{this.accInfo.username}</TextInput>

                    </View>
                    <HiddenView hide={this.state.username.hide} style={styles.hiddenViewErr}>
                        <Text style={styles.errorMsg}>{this.state.username.msg}</Text>
                    </HiddenView>

                    <Text style={styles.inputDescription}>Email</Text>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputText}
                                   placeholder="example@email.com"
                                   placeholderTextColor="white"
                                   onChangeText={text => this.accInfo.email = text}>{this.accInfo.email}</TextInput>
                    </View>
                    <HiddenView hide={this.state.email.hide} style={styles.hiddenViewErr}>
                        <Text style={styles.errorMsg}>{this.state.email.msg}</Text>
                    </HiddenView>
                    <Text style={styles.inputDescription}>Password</Text>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputText}
                                   placeholder="Password"
                                   secureTextEntry
                                   placeholderTextColor="white"
                                   onChangeText={text => this.accInfo.password = text}>{this.accInfo.password}</TextInput>
                    </View>
                    <HiddenView hide={this.state.password.hide}style={styles.hiddenViewErr}>
                        <Text style={styles.errorMsg}>{this.state.password.msg}</Text>
                    </HiddenView>
                    <Text style={styles.inputDescription}>Verify Password</Text>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputText}
                                   placeholder="Repeat Password"
                                   secureTextEntry
                                   onChangeText={text => this.accInfo.verifiedPass = text}
                                   placeholderTextColor="white">{this.accInfo.verifiedPass}</TextInput>
                    </View>
                    <HiddenView hide={this.state.confirmPassword.hide}style={styles.hiddenViewErr}>
                        <Text style={styles.errorMsg}>{this.state.confirmPassword.msg}</Text>
                    </HiddenView>
                </View>
                <TouchableOpacity onPress={this.onCreateAccount} style={styles.createAccountButton}>
                    <Text style={styles.createAccountText}>Create Account</Text>
                </TouchableOpacity>

            </View>
        );
    }

}
