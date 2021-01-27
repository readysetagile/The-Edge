import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {TextInput} from "react-native";
import {useState} from 'react';


export default function CreateAccountScreen ({navigation}) {
    const accInfo = {
        email: null,
        username: null,
        password: null
    }
    return (
        <View style={styles.container}>

            <Text style={styles.text}>Create Account</Text>

            <View style={styles.contentContainer}>

                <Text style={styles.inputDescription}>Display Name</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                    placeholder="Username"
                    placeholderTextColor="white"
                    onChangeText={text => accInfo.username = text}/>
                </View>

                <Text style={styles.inputDescription}>Email</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                    placeholder="example@email.com"
                    placeholderTextColor="white"
                    onChangeText={text => accInfo.email = text}/>
                </View>

                <Text style={styles.inputDescription}>Password</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor="white"
                    onChangeText={text => accInfo.password = text}/>
                </View>

                <Text style={styles.inputDescription}>Verify Password</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                    placeholder="Repeat Password"
                    secureTextEntry
                    placeholderTextColor="white"/>
                </View>

            </View>
            <TouchableOpacity onPress={onCreateAccount} style={styles.createAccountButton}>
                <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>

        </View>
    );

    function onCreateAccount(){
        if(Object.values(accInfo).some(i => i == null)){

            console.log(true);

        }
    }

}


/*
<ScrollView>
                <Text style={styles.text}>
                    Create Account
                </Text>


                <View style={styles.descriptionView}>

                    <Text style={styles.categoryText}>Display Name: </Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Username"
                            placeholderTextColor="#003f5c"
                        />
                    </View>
                    <Text style={styles.categoryText}>Email: </Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="example@email.com"
                            placeholderTextColor={"#003f5c"}/>
                    </View>
                </View>

            </ScrollView>
 */