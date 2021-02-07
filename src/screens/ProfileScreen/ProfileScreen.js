import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

export default class ProfileScreen extends Component{

    render(){
        return (
            <View>
                <Text style={styles.text}>
                    Who is using this account?
                </Text>
            </View>
        );
    }
}