import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {TextInput} from "react-native";
import HiddenView from "../../Components/HiddenView";
//const HiddenView = require("../../Components/HiddenView")
//import HiddenView from "../../Components/HiddenView.js";


export default class CreateAccountScreen extends Component{

    state = {
        username:{
            hide: true,
            msg: null
        },
        email:{
            hide: true,
            msg: null
        },
        password:{
            hide: true,
            msg: null
        },
        confirmPassword:{
            hide: true,
            msg: null
        }
    }

    accInfo = {}

    constructor(props) {
        super(props);
        this.accInfo = {
            email: null,
            username: null,
            password: null
        }
    }

    onCreateAccount = () => {

        console.log(this.checkEmail("danieldawit33@gmail.com"))

    }

    checkEmail(email){
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    checkUsername(name){

    }
    checkPass(password, confirmPass){

    }

    render() {
        //console.log(this)
        return (
            <View style={styles.container}>

                <Text style={styles.text}>Create Account</Text>

                <View style={styles.contentContainer}>

                    <Text style={styles.inputDescription}>Display Name</Text>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputText}
                                   placeholder="Username"
                                   placeholderTextColor="white"
                                   onChangeText={text => this.accInfo.username = text}/>

                    </View>
                    <HiddenView hide={this.state.username.hide}>
                        <Text style={styles.errorMsg}>{this.state.username.msg}</Text>
                    </HiddenView>

                    <Text style={styles.inputDescription}>Email</Text>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputText}
                                   placeholder="example@email.com"
                                   placeholderTextColor="white"
                                   onChangeText={text => this.accInfo.email = text}/>
                    </View>
                    <HiddenView hide={this.state.email.hide}>
                        <Text style={styles.errorMsg}>{this.state.email.msg}</Text>
                    </HiddenView>
                    <Text style={styles.inputDescription}>Password</Text>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputText}
                                   placeholder="Password"
                                   secureTextEntry
                                   placeholderTextColor="white"
                                   onChangeText={text => this.accInfo.password = text}/>
                    </View>
                    <HiddenView hide={this.state.password.hide}>
                        <Text style={styles.errorMsg}>{this.state.password.msg}</Text>
                    </HiddenView>
                    <Text style={styles.inputDescription}>Verify Password</Text>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputText}
                                   placeholder="Repeat Password"
                                   secureTextEntry
                                   placeholderTextColor="white"/>
                    </View>
                    <HiddenView hide={this.state.confirmPassword.hide}>
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
