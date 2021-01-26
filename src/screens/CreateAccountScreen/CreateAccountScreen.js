import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView, ScrollView, TextInput} from "react-native";


export default function CreateAccountScreen ({navigation}) {
    return (
        <View style={styles.view}>
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
        </View>
    );
}