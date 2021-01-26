import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {TextInput} from "react-native";


export default function CreateAccountScreen ({navigation}) {
    return (
        <View style={styles.container}>

            <Text style={styles.text}>Create Account</Text>

            <View style={styles.contentContainer}>

                <Text style={styles.inputDescription}>Display Name</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                    placeholder="Username"
                    placeholderTextColor="white"/>
                </View>

                <Text style={styles.inputDescription}>Email</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                    placeholder="example@email.com"
                    placeholderTextColor="white"/>
                </View>

                <Text style={styles.inputDescription}>Password</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor="white"/>
                </View>

                <Text style={styles.inputDescription}>Verify Password</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                    placeholder="Repeat Password"
                    secureTextEntry
                    placeholderTextColor="white"/>
                </View>

            </View>

        </View>
    );
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