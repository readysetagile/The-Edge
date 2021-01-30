import {Alert, AsyncStorage, Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import React from 'react';


export default function LoginScreen ({navigation}) {
    let accInfo = {
        email: null,
        password: null
    };
    return (
            <View style={styles.container}>
                <Image source={require("../../assets/iPhoneApp.png")}/>
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

                <TouchableOpacity >
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onCreateAccount}>
                    <Text style={styles.loginText}>Signup</Text>
                </TouchableOpacity>

            </View>
    );

    async function onCreateAccount () {
        navigation.navigate("Create Account")
    }

}