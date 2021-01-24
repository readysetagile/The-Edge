import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';


export default function HomeScreen ({navigation}) {
    return (
        <View>
            <Text style={
                styles.text
            }>Welcome to the Amazing Home Screen</Text>
        </View>
    );
}