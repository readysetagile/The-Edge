import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    getTeams(){
        const {navigation} = this.props;
        let profile = navigation.getParam("profile");
        let teams = profile.getTeams();
        

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
