import {Alert, Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import React from 'react';
import {Component} from "react";
import HiddenView from "../../Components/HiddenView";
import {UserAuthentication} from "../../firebase/UserAuthentication";

export default class LoginScreen extends Component{

    state = {
        email:{
            hide: true,
            msg: ""
        },
        password:{
            hide: true,
            msg: ""
        }
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

    onSignIn = async () => {

        const email = this.accInfo.email.trim();
        const pass = this.accInfo.password;


        const emailPassed = this.checkEmail(email);
            this.setState({
                email:{
                    hide: emailPassed,
                    msg: "X Invalid Email"
                }
            })

            this.setState({
                password:{
                    hide: !!pass.length,
                    msg: "X Invalid Password"
                }
            })

        if(!emailPassed || !pass.length){
            return;
        }

        const data = await UserAuthentication.signUserIn(email, pass);
        if(data.confirmed){
            Alert.alert("Congratulations!", "You've sign in");
        }else{
            Alert.alert(data.message);
        }

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

                 <TouchableOpacity>
                     <Text style={styles.forgot}>Forgot Password?</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.loginButton} onPress={this.onSignIn}>
                     <Text style={styles.loginText}>LOGIN</Text>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={() => {navigation.navigate("Create Account")}}>
                     <Text style={styles.loginText}>Signup</Text>
                 </TouchableOpacity>

             </View>
         );
     }

}