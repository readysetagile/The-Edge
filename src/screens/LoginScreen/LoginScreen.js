import {Alert, AsyncStorage, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import React from 'react';


export default function LoginScreen ({navigation}) {
    let accInfo = {
        email: null,
        password: null
    };

    return (
            <View style={styles.container}>
                <Text style={styles.logo}>The Edge</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        onChangeText={txt => accInfo.email = txt} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry
                        onChangeText={txt => accInfo.password = txt} />
                </View>

                <TouchableOpacity onPress={onForgotPassword}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onLogIn} style={styles.loginButton}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onCreateAccount}>
                    <Text style={styles.loginText}>Signup</Text>
                </TouchableOpacity>

            </View>
    );

    async function onLogIn () {

        const data = await getAccountInfo();
        if (data.email === accInfo.email && data.pass === accInfo.password) {
            Alert.alert("Logged in sucessfully!");
            navigation.navigate("Home");
        } else {
            Alert.alert("Could not find this account. Please try again");
        }

    }
    async function onCreateAccount () {
        try {

            if (accInfo.email != null && accInfo.password != null) {

                const info = await getAccountInfo();
                if (info.email != null && accInfo.email === info.email) {
                    Alert.alert("Could not create an account as you already have an account under this email");
                    return;
                }

                await AsyncStorage.setItem("@User:email", accInfo.email);
                await AsyncStorage.setItem("@User:password", accInfo.password);
                Alert.alert("Account Created!");
            } else {
                Alert.alert("Please input your email and password");
            }
        } catch (e) {
            console.error(e);
        }

    }

    async function getAccountInfo () {
        try {
            const email = await AsyncStorage.getItem("@User:email");
            const pass = await AsyncStorage.getItem("@User:password");
            return {email: email, pass: pass};
        } catch (e) {
            console.error(e);
        }
    }

    function onForgotPassword () {
        Alert.alert("Sadly, you can't forget your password right now");
    }

}