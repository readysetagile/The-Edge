import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';


export default class HomeScreen extends Component{

    render() {
        return (
            <View>
                <Text style={
                    styles.text
                }>Welcome to the Amazing Home Screen</Text>
            </View>
        );
    }
}