import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {firebase} from "../../firebase/config";
import Edge from '../../firebase/index';


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
    }

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
